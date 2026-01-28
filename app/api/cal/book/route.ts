import { NextRequest, NextResponse } from "next/server";
import {
  syncContactToActiveCampaign,
  splitName,
  type ActiveCampaignContact,
} from "@/lib/activecampaign";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

// Helper to log with timestamp for Vercel function logs
const log = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  if (data !== undefined) {
    console.log(`[${timestamp}] [BookingAPI] ${message}`, JSON.stringify(data, null, 2));
  } else {
    console.log(`[${timestamp}] [BookingAPI] ${message}`);
  }
};

type BookingPayload = {
  eventTypeId?: number;
  eventTypeSlug?: string;
  start: string;
  responses: Record<string, string | string[]>;
  timeZone: string;
  language?: string;
  username?: string;
  hostUsernames?: string[]; // For combined meetings with multiple hosts
  teamSlug?: string;
};

const getApiKeyForUser = (username?: string): string | undefined => {
  if (username?.toLowerCase().includes("mark")) {
    return process.env.CAL_API_KEY_MARK?.trim();
  }
  return process.env.CAL_API_KEY?.trim();
};

const resolveEventTypeId = async (
  apiKey: string,
  eventTypeSlug: string,
  teamSlug?: string,
  username?: string
) => {
  const url = new URL("/v1/event-types", CAL_API_BASE);
  url.searchParams.set("apiKey", apiKey);
  if (teamSlug) {
    url.searchParams.set("teamSlug", teamSlug);
  }
  if (username) {
    url.searchParams.set("username", username);
  }

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  const data = await response.json();

  console.log("Cal.com event-types response:", JSON.stringify(data, null, 2));

  const eventTypes = Array.isArray(data?.eventTypes)
    ? data.eventTypes
    : Array.isArray(data)
      ? data
      : [];

  console.log(`Looking for slug "${eventTypeSlug}" among ${eventTypes.length} event types:`,
    eventTypes.map((et: { slug?: string; id?: number }) => ({ slug: et.slug, id: et.id }))
  );

  const match = eventTypes.find(
    (eventType: { slug?: string }) => eventType.slug === eventTypeSlug
  );

  console.log("Match found:", match ? { slug: match.slug, id: match.id } : "none");

  return match?.id as number | undefined;
};

// Extract company field from responses (different forms use different field names)
const extractCompany = (responses: Record<string, string | string[]>): string | undefined => {
  return (responses.company || responses.organization) as string | undefined;
};

// Extract message field from responses (different forms use different field names)
const extractMessage = (responses: Record<string, string | string[]>): string | undefined => {
  return (
    responses.conversation_focus ||
    responses.project_driver ||
    responses.current_issue ||
    responses.challenge
  ) as string | undefined;
};

// Determine ActiveCampaign tags based on hosts
const getActiveCampaignTags = (username?: string, hostUsernames?: string[]): string[] => {
  const tags: string[] = ["booking"];

  // Combined meeting with multiple hosts
  if (hostUsernames && hostUsernames.length > 1) {
    tags.push("booking-combined");
    hostUsernames.forEach((host) => {
      if (host.toLowerCase().includes("wolf")) tags.push("booking-wolf");
      if (host.toLowerCase().includes("mark")) tags.push("booking-mark");
    });
    return tags;
  }

  // Single host
  if (username?.toLowerCase().includes("mark")) {
    tags.push("coffee-mark");
  } else {
    tags.push("booking-wolf");
  }
  return tags;
};

// Sync booking responses to ActiveCampaign (async, but never throws - errors are logged)
// IMPORTANT: This function MUST be awaited in serverless environments (Vercel)
// to ensure the sync completes before the function terminates
const syncBookingToActiveCampaign = async (
  responses: Record<string, string | string[]>,
  username?: string,
  hostUsernames?: string[]
): Promise<{ success: boolean; error?: string; contactId?: string }> => {
  try {
    const name = responses.name as string;
    const email = responses.email as string;

    if (!name || !email) {
      log("Skipping ActiveCampaign sync: missing name or email", { name: !!name, email: !!email, responses });
      return { success: false, error: "Missing name or email in booking responses" };
    }

    const { firstName, lastName } = splitName(name);
    const company = extractCompany(responses);
    const message = extractMessage(responses);
    const tags = getActiveCampaignTags(username, hostUsernames);

    log("Syncing booking to ActiveCampaign", {
      email,
      firstName,
      lastName,
      company,
      message: message?.substring(0, 100), // Truncate for logs
      tags,
    });

    const contact: ActiveCampaignContact = {
      email,
      firstName,
      lastName,
      company,
      message,
      tags,
    };

    const result = await syncContactToActiveCampaign(contact);

    if (result.success) {
      log(`ActiveCampaign sync successful`, { email, tags, contactId: result.contactId });
    } else {
      log(`ActiveCampaign sync failed`, { email, error: result.error });
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    log("ActiveCampaign sync error (non-fatal)", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingPayload;

    if (!body.start || !body.responses || !body.timeZone) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const apiKey = getApiKeyForUser(body.username);
    if (!apiKey) {
      return NextResponse.json(
        { error: "CAL_API_KEY is not configured" },
        { status: 500 }
      );
    }

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
      return NextResponse.json(
        { error: "Unable to resolve event type ID" },
        { status: 400 }
      );
    }

    const bookingUrl = new URL("/v1/bookings", CAL_API_BASE);
    bookingUrl.searchParams.set("apiKey", apiKey);

    // Check if this is a combined meeting with multiple hosts
    const isCombinedMeeting = body.hostUsernames && body.hostUsernames.length > 1;
    const secondaryHosts = isCombinedMeeting
      ? body.hostUsernames!.filter((h) => h !== body.username)
      : [];

    const calPayload = {
      eventTypeId,
      start: body.start,
      responses: body.responses,
      timeZone: body.timeZone,
      language: body.language ?? "en",
      metadata: {
        // Cal.com requires metadata values to be strings
        ...(isCombinedMeeting && {
          combinedMeeting: "true",
          allHosts: body.hostUsernames?.join(",") ?? "",
          secondaryHosts: secondaryHosts.join(","),
        }),
      },
    };

    console.log("Sending to Cal.com:", JSON.stringify(calPayload, null, 2));

    const calResponse = await fetch(bookingUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calPayload),
    });

    const booking = await calResponse.json();

    console.log("Cal.com booking response:", {
      status: calResponse.status,
      ok: calResponse.ok,
      eventTypeId,
      booking: JSON.stringify(booking, null, 2),
    });

    if (!calResponse.ok) {
      log("Cal.com booking failed", { status: calResponse.status, booking });
      return NextResponse.json(
        { error: booking?.message || booking?.error || "Booking failed", details: booking },
        { status: calResponse.status }
      );
    }

    log("Cal.com booking successful", {
      bookingId: booking?.id,
      email: body.responses?.email,
      combinedMeeting: isCombinedMeeting,
      hosts: isCombinedMeeting ? body.hostUsernames : [body.username],
    });

    // Sync to ActiveCampaign - MUST await in serverless environment
    // This is non-blocking for the user (errors don't fail booking) but we must
    // wait for completion before returning response to prevent Vercel from
    // terminating the function before the sync completes
    const acResult = await syncBookingToActiveCampaign(
      body.responses,
      body.username,
      body.hostUsernames
    );

    // Send to n8n webhook if configured (also await to ensure completion)
    // For combined meetings, this webhook can trigger notifications to secondary hosts
    const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking,
            responses: body.responses,
            eventTypeSlug: body.eventTypeSlug,
            activeCampaignResult: acResult,
            // Combined meeting info for automation
            combinedMeeting: isCombinedMeeting,
            primaryHost: body.username,
            secondaryHosts: secondaryHosts,
            allHosts: body.hostUsernames,
          }),
        });
        log("n8n webhook sent successfully", { combinedMeeting: isCombinedMeeting });
      } catch (err) {
        log("n8n webhook error (non-fatal)", { error: err instanceof Error ? err.message : "Unknown" });
      }
    }

    // Return booking success - include AC result for debugging but don't fail if AC failed
    return NextResponse.json(
      {
        ...booking,
        _integrations: {
          activeCampaign: acResult.success ? "synced" : "failed",
          activeCampaignContactId: acResult.contactId,
        },
        _combinedMeeting: isCombinedMeeting
          ? {
              enabled: true,
              primaryHost: body.username,
              secondaryHosts,
              allHosts: body.hostUsernames,
              note: "Secondary hosts should be notified via webhook automation or manual calendar invite",
            }
          : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create booking",
      },
      { status: 500 }
    );
  }
}
