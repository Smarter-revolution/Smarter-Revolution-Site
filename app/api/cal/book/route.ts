import { NextRequest, NextResponse } from "next/server";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

type BookingPayload = {
  eventTypeId?: number;
  eventTypeSlug?: string;
  start: string;
  responses: Record<string, string | string[]>;
  timeZone: string;
  language?: string;
  username?: string;
  teamSlug?: string;
};

const resolveEventTypeId = async (
  apiKey: string,
  eventTypeSlug: string,
  teamSlug?: string,
  username?: string
) => {
  const url = new URL("/v1/event-types", CAL_API_BASE);
  if (teamSlug) {
    url.searchParams.set("teamSlug", teamSlug);
  }
  if (username) {
    url.searchParams.set("username", username);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  const data = await response.json();
  const eventTypes = Array.isArray(data?.eventTypes)
    ? data.eventTypes
    : Array.isArray(data)
      ? data
      : [];

  const match = eventTypes.find(
    (eventType: { slug?: string }) => eventType.slug === eventTypeSlug
  );

  return match?.id as number | undefined;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "CAL_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as BookingPayload;

    if (!body.start || !body.responses || !body.timeZone) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
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

    const calResponse = await fetch(`${CAL_API_BASE}/v1/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventTypeId,
        start: body.start,
        responses: body.responses,
        timeZone: body.timeZone,
        language: body.language ?? "en",
      }),
    });

    const booking = await calResponse.json();

    if (!calResponse.ok) {
      return NextResponse.json(booking, { status: calResponse.status });
    }

    const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking,
          responses: body.responses,
          eventTypeSlug: body.eventTypeSlug,
        }),
      });
    }

    return NextResponse.json(booking, { status: 200 });
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
