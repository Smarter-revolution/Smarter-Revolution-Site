import { NextRequest, NextResponse } from "next/server";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

const getApiKeyForUser = (username?: string): string | undefined => {
  // Mark's events use Mark's API key
  if (username?.toLowerCase().includes("mark")) {
    return process.env.CAL_API_KEY_MARK?.trim();
  }
  // Default to Wolf's API key
  return process.env.CAL_API_KEY?.trim();
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamSlug =
    searchParams.get("teamSlug") ?? process.env.CAL_TEAM_SLUG ?? "";
  const username = searchParams.get("username") ?? "";

  const apiKey = getApiKeyForUser(username);
  if (!apiKey) {
    return NextResponse.json(
      { error: "CAL_API_KEY is not configured" },
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
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch event types",
      },
      { status: 500 }
    );
  }
}
