import { NextRequest, NextResponse } from "next/server";
import { getCalApiKey } from "@/lib/cal-auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimit = checkRateLimit(request, RATE_LIMITS.booking);
  if (!rateLimit.success) {
    return rateLimit.error;
  }

  const { searchParams } = new URL(request.url);
  const teamSlug =
    searchParams.get("teamSlug") ?? process.env.CAL_TEAM_SLUG ?? "";
  const username = searchParams.get("username") ?? "";

  // SECURITY: Use secure exact-match API key selection
  const apiKey = getCalApiKey(username || undefined);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Calendar service not configured" },
      { status: 500 }
    );
  }

  const url = new URL("/v1/event-types", CAL_API_BASE);
  url.searchParams.set("apiKey", apiKey);
  if (teamSlug) {
    url.searchParams.set("teamSlug", teamSlug);
  }
  if (username) {
    url.searchParams.set("username", username);
  }

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(
      "[Event Types API] Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Failed to fetch event types" },
      { status: 500 }
    );
  }
}
