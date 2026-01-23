import { NextRequest, NextResponse } from "next/server";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

export async function GET(request: NextRequest) {
  const apiKey = process.env.CAL_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "CAL_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const eventTypeSlug = searchParams.get("eventTypeSlug");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const timeZone = searchParams.get("timeZone");
  const username = searchParams.get("username");

  if (!eventTypeSlug || !startTime || !endTime || !timeZone) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  const url = new URL("/v1/slots", CAL_API_BASE);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("eventTypeSlug", eventTypeSlug);
  url.searchParams.set("startTime", startTime);
  url.searchParams.set("endTime", endTime);
  url.searchParams.set("timeZone", timeZone);
  if (username) {
    url.searchParams.set("usernameList", username);
  }

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch slots",
      },
      { status: 500 }
    );
  }
}
