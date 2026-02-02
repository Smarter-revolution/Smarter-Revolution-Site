import { NextRequest, NextResponse } from "next/server";
import {
  syncContactToActiveCampaign,
  splitName,
  type ActiveCampaignContact,
} from "@/lib/activecampaign";
import { getCalApiKey, isValidCalUser } from "@/lib/cal-auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

type BookingPayload = {
  eventTypeId?: number;
  eventTypeSlug?: string;
  start: string;
  responses: Record<string, string | string[]>;
  timeZone: string;
  language?: string;
  username?: string;
  hostUsernames?: string[];
  teamSlug?: string;
};

interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate booking payload
 */
function validateBookingPayload(body: BookingPayload): ValidationResult {
  if (!body.start || !body.responses || !body.timeZone) {
    return { valid: false, error: "Missing required booking fields" };
  }

  if (body.hostUsernames) {
    const invalidHosts = body.hostUsernames.filter((h) => !isValidCalUser(h));
    if (invalidHosts.length > 0) {
      return { valid: false, error: "Invalid host usernames specified" };
    }
  }

  return { valid: true };
}

/**
 * Resolve event type ID from slug
 */
async function resolveEventTypeId(
  apiKey: string,
  eventTypeSlug: string,
  teamSlug?: string,
  username?: string
): Promise<number | undefined> {
  const url = new URL("/v1/event-types", CAL_API_BASE);
  url.searchParams.set("apiKey", apiKey);
  if (teamSlug) url.searchParams.set("teamSlug", teamSlug);
  if (username) url.searchParams.set("username", username);

  const response = await fetch(url.toString(), { cache: "no-store" });
  const data = await response.json();

  let eventTypes: Array<{ slug?: string; id?: number }> = [];
  if (Array.isArray(data?.eventTypes)) {
    eventTypes = data.eventTypes;
  } else if (Array.isArray(data)) {
    eventTypes = data;
  }

  const match = eventTypes.find(
    (eventType: { slug?: string }) => eventType.slug === eventTypeSlug
  );

  return match?.id;
}

/**
 * Extract company field from responses
 */
function extractCompany(responses: Record<string, string | string[]>): string | undefined {
  return (responses.company || responses.organization) as string | undefined;
}

/**
 * Extract message field from responses
 */
function extractMessage(responses: Record<string, string | string[]>): string | undefined {
  return (
    responses.conversation_focus ||
    responses.project_driver ||
    responses.current_issue ||
    responses.challenge
  ) as string | undefined;
}

/**
 * Determine ActiveCampaign tags based on hosts (using exact username matching)
 */
function getActiveCampaignTags(username?: string, hostUsernames?: string[]): string[] {
  const tags: string[] = ["booking"];

  if (hostUsernames && hostUsernames.length > 1) {
    tags.push("booking-combined");
    hostUsernames.forEach((host) => {
      const normalizedHost = host.toLowerCase();
      if (normalizedHost === "wolfkrammel") tags.push("booking-wolf");
      if (normalizedHost === "mark314") tags.push("booking-mark");
    });
    return tags;
  }

  const normalizedUsername = username?.toLowerCase();
  if (normalizedUsername === "mark314") {
    tags.push("coffee-mark");
  } else {
    tags.push("booking-wolf");
  }
  return tags;
}

/**
 * Sync booking responses to ActiveCampaign
 */
async function syncBookingToActiveCampaign(
  responses: Record<string, string | string[]>,
  username?: string,
  hostUsernames?: string[]
): Promise<{ success: boolean; error?: string; contactId?: string }> {
  try {
    const name = responses.name as string;
    const email = responses.email as string;

    if (!name || !email) {
      return { success: false, error: "Missing name or email" };
    }

    const { firstName, lastName } = splitName(name);
    const contact: ActiveCampaignContact = {
      email,
      firstName,
      lastName,
      company: extractCompany(responses),
      message: extractMessage(responses),
      tags: getActiveCampaignTags(username, hostUsernames),
    };

    return await syncContactToActiveCampaign(contact);
  } catch (error) {
    console.error("[Booking] ActiveCampaign sync error:", error instanceof Error ? error.message : "Unknown");
    return { success: false, error: "Sync failed" };
  }
}

/**
 * Send booking data to webhook
 */
async function sendToWebhook(
  webhookUrl: string,
  booking: unknown,
  body: BookingPayload,
  acSuccess: boolean,
  secondaryHosts: string[]
): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking,
        responses: body.responses,
        eventTypeSlug: body.eventTypeSlug,
        activeCampaignResult: { success: acSuccess },
        combinedMeeting: body.hostUsernames && body.hostUsernames.length > 1,
        primaryHost: body.username,
        secondaryHosts,
        allHosts: body.hostUsernames,
      }),
    });
  } catch (err) {
    console.error("[Booking] Webhook error:", err instanceof Error ? err.message : "Unknown");
  }
}

/**
 * Create booking via Cal.com API
 */
async function createCalBooking(
  apiKey: string,
  eventTypeId: number,
  body: BookingPayload,
  secondaryHosts: string[]
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  const bookingUrl = new URL("/v1/bookings", CAL_API_BASE);
  bookingUrl.searchParams.set("apiKey", apiKey);

  const isCombinedMeeting = body.hostUsernames && body.hostUsernames.length > 1;

  const calPayload = {
    eventTypeId,
    start: body.start,
    responses: body.responses,
    timeZone: body.timeZone,
    language: body.language ?? "en",
    metadata: isCombinedMeeting ? {
      combinedMeeting: "true",
      allHosts: body.hostUsernames?.join(",") ?? "",
      secondaryHosts: secondaryHosts.join(","),
    } : {},
  };

  const response = await fetch(bookingUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(calPayload),
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = checkRateLimit(request, RATE_LIMITS.booking);
    if (!rateLimit.success) return rateLimit.error;

    const body = (await request.json()) as BookingPayload;

    // Validate input
    const validation = validateBookingPayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Get API key securely
    const apiKey = getCalApiKey(body.username);
    if (!apiKey) {
      return NextResponse.json({ error: "Calendar service not configured" }, { status: 500 });
    }

    // Resolve event type ID
    let eventTypeId = body.eventTypeId;
    if (!eventTypeId && body.eventTypeSlug) {
      eventTypeId = await resolveEventTypeId(
        apiKey,
        body.eventTypeSlug,
        body.teamSlug ?? process.env.CAL_TEAM_SLUG,
        body.username
      );
    }

    if (!eventTypeId) {
      return NextResponse.json({ error: "Unable to resolve event type ID" }, { status: 400 });
    }

    // Calculate secondary hosts
    const isCombinedMeeting = body.hostUsernames && body.hostUsernames.length > 1;
    const secondaryHosts = isCombinedMeeting
      ? body.hostUsernames!.filter((h) => h !== body.username)
      : [];

    // Create booking
    const calResult = await createCalBooking(apiKey, eventTypeId, body, secondaryHosts);
    if (!calResult.ok) {
      console.error("[Booking] Cal.com booking failed:", calResult.status);
      return NextResponse.json(
        { error: calResult.data?.message || calResult.data?.error || "Booking failed" },
        { status: calResult.status }
      );
    }

    // Sync to ActiveCampaign
    const acResult = await syncBookingToActiveCampaign(body.responses, body.username, body.hostUsernames);

    // Send to webhook if configured
    const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      await sendToWebhook(webhookUrl, calResult.data, body, acResult.success, secondaryHosts);
    }

    // Return success response
    return NextResponse.json({
      ...calResult.data,
      _integrations: {
        activeCampaign: acResult.success ? "synced" : "failed",
        activeCampaignContactId: acResult.contactId,
      },
      _combinedMeeting: isCombinedMeeting ? {
        enabled: true,
        primaryHost: body.username,
        secondaryHosts,
        allHosts: body.hostUsernames,
      } : undefined,
    }, { status: 200 });

  } catch (error) {
    console.error("[Booking] Error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
