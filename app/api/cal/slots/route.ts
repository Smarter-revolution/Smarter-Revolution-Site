import { NextRequest, NextResponse } from "next/server";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

type SlotByDate = Record<string, string[]>;

const getApiKeyForUser = (username?: string): string | undefined => {
  // Mark's events use Mark's API key
  if (username?.toLowerCase().includes("mark")) {
    return process.env.CAL_API_KEY_MARK?.trim();
  }
  // Default to Wolf's API key
  return process.env.CAL_API_KEY?.trim();
};

// Normalize Cal.com slot response to a flat array of ISO strings
const normalizeToArray = (data: unknown): string[] => {
  const slots: string[] = [];
  const rawSlots =
    typeof data === "object" && data && "slots" in data
      ? (data as { slots?: unknown }).slots
      : data;

  if (!rawSlots) return slots;

  if (Array.isArray(rawSlots)) {
    rawSlots.forEach((slot) => {
      if (typeof slot === "string") {
        slots.push(slot);
      }
    });
    return slots;
  }

  if (typeof rawSlots === "object") {
    Object.entries(rawSlots as Record<string, unknown>).forEach(
      ([dateKey, slotList]) => {
        if (!Array.isArray(slotList)) return;

        slotList.forEach((slot) => {
          if (typeof slot === "string") {
            slots.push(slot);
            return;
          }

          if (typeof slot === "object" && slot) {
            const slotRecord = slot as Record<string, string | undefined>;
            const iso =
              slotRecord.utc ??
              slotRecord.start ??
              slotRecord.dateTime ??
              slotRecord.time;

            if (!iso) return;

            const slotIso =
              iso.length <= 5 && dateKey ? `${dateKey}T${iso}` : iso;
            slots.push(slotIso);
          }
        });
      }
    );
  }

  return slots;
};

// Convert flat array of ISO strings to SlotByDate format
const groupByDate = (slots: string[]): SlotByDate => {
  const grouped: SlotByDate = {};
  slots.forEach((slot) => {
    const dateKey = slot.split("T")[0];
    grouped[dateKey] = grouped[dateKey] ?? [];
    grouped[dateKey].push(slot);
  });
  // Sort slots within each date
  Object.keys(grouped).forEach((dateKey) => {
    grouped[dateKey].sort();
  });
  return grouped;
};

// Round time to nearest interval (for fuzzy matching)
const roundToInterval = (isoString: string, intervalMinutes: number): string => {
  const date = new Date(isoString);
  const minutes = date.getMinutes();
  const rounded = Math.round(minutes / intervalMinutes) * intervalMinutes;
  date.setMinutes(rounded, 0, 0);
  return date.toISOString();
};

// Find intersection of multiple slot arrays
const intersectSlots = (slotArrays: string[][]): string[] => {
  if (slotArrays.length === 0) return [];
  if (slotArrays.length === 1) return slotArrays[0];

  // Normalize all slots to 15-minute intervals for comparison
  const normalizedArrays = slotArrays.map((arr) =>
    arr.map((slot) => roundToInterval(slot, 15))
  );

  // Find slots that appear in ALL arrays
  const [first, ...rest] = normalizedArrays;
  const intersection = first.filter((slot) =>
    rest.every((arr) => arr.includes(slot))
  );

  return intersection;
};

// Fetch slots for a single user
const fetchSlotsForUser = async (
  username: string,
  eventTypeSlug: string,
  startTime: string,
  endTime: string,
  timeZone: string
): Promise<{ username: string; slots: string[]; error?: string }> => {
  const apiKey = getApiKeyForUser(username);
  if (!apiKey) {
    return { username, slots: [], error: `No API key for ${username}` };
  }

  const url = new URL("/v1/slots", CAL_API_BASE);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("eventTypeSlug", eventTypeSlug);
  url.searchParams.set("startTime", startTime);
  url.searchParams.set("endTime", endTime);
  url.searchParams.set("timeZone", timeZone);
  url.searchParams.set("usernameList", username);

  try {
    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      return {
        username,
        slots: [],
        error: data?.error || `Failed to fetch slots for ${username}`,
      };
    }

    return { username, slots: normalizeToArray(data) };
  } catch (error) {
    return {
      username,
      slots: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Parse per-user event type slugs from format: "user1:slug1,user2:slug2"
const parseUserEventSlugs = (
  eventTypeSlugs: string
): Map<string, string> => {
  const map = new Map<string, string>();
  eventTypeSlugs.split(",").forEach((entry) => {
    const [user, slug] = entry.split(":").map((s) => s.trim());
    if (user && slug) {
      map.set(user, slug);
    }
  });
  return map;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventTypeSlug = searchParams.get("eventTypeSlug");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const timeZone = searchParams.get("timeZone");
  const username = searchParams.get("username");
  const usernames = searchParams.get("usernames"); // Comma-separated for combined
  // Per-user event type slugs: "wolfkrammel:discovery-call-wolf,mark314:discovery-call-45min"
  const eventTypeSlugs = searchParams.get("eventTypeSlugs");

  if (!startTime || !endTime || !timeZone) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  // Parse per-user event slugs if provided
  const userEventSlugs = eventTypeSlugs
    ? parseUserEventSlugs(eventTypeSlugs)
    : new Map<string, string>();

  // Determine if this is a combined availability request
  const usernameList = usernames
    ? usernames.split(",").map((u) => u.trim()).filter(Boolean)
    : username
      ? [username]
      : [];

  // If no usernames specified, use default (Wolf)
  if (usernameList.length === 0) {
    usernameList.push("wolfkrammel");
  }

  // Helper to get event slug for a user
  const getEventSlugForUser = (user: string): string | null => {
    // First check per-user slugs
    if (userEventSlugs.has(user)) {
      return userEventSlugs.get(user)!;
    }
    // Fall back to single eventTypeSlug
    return eventTypeSlug;
  };

  // Single user - simple fetch
  if (usernameList.length === 1) {
    const slug = getEventSlugForUser(usernameList[0]);
    if (!slug) {
      return NextResponse.json(
        { error: "Missing eventTypeSlug for user" },
        { status: 400 }
      );
    }

    const result = await fetchSlotsForUser(
      usernameList[0],
      slug,
      startTime,
      endTime,
      timeZone
    );

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ slots: groupByDate(result.slots) });
  }

  // Multiple users - fetch in parallel and intersect
  console.log(`[Slots API] Combined availability request for: ${usernameList.join(", ")}`);

  // Validate all users have event slugs
  const missingSlugUsers = usernameList.filter((u) => !getEventSlugForUser(u));
  if (missingSlugUsers.length > 0) {
    return NextResponse.json(
      { error: `Missing eventTypeSlug for users: ${missingSlugUsers.join(", ")}` },
      { status: 400 }
    );
  }

  const results = await Promise.all(
    usernameList.map((user) => {
      const slug = getEventSlugForUser(user)!;
      console.log(`[Slots API] Fetching slots for ${user} with slug: ${slug}`);
      return fetchSlotsForUser(user, slug, startTime, endTime, timeZone);
    })
  );

  // Check for errors
  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    console.warn("[Slots API] Some calendars failed:", errors);
    // Continue with available results rather than failing entirely
  }

  // Get successful results
  const successfulResults = results.filter((r) => !r.error && r.slots.length > 0);

  if (successfulResults.length === 0) {
    return NextResponse.json({
      slots: {},
      warning: "No availability found from any calendar",
    });
  }

  // If we don't have all calendars, we can't reliably show combined availability
  if (successfulResults.length < usernameList.length) {
    console.warn(
      `[Slots API] Only ${successfulResults.length}/${usernameList.length} calendars returned slots`
    );
    return NextResponse.json({
      slots: {},
      warning: `Could not fetch availability for all participants`,
      details: errors.map((e) => ({ user: e.username, error: e.error })),
    });
  }

  // Calculate intersection
  const slotArrays = successfulResults.map((r) => r.slots);
  const intersectedSlots = intersectSlots(slotArrays);

  console.log(
    `[Slots API] Combined availability: ${intersectedSlots.length} mutual slots found`
  );

  return NextResponse.json({
    slots: groupByDate(intersectedSlots),
    _meta: {
      combined: true,
      participants: usernameList,
      slotsPerUser: results.map((r) => ({
        username: r.username,
        count: r.slots.length,
        error: r.error,
      })),
      mutualSlots: intersectedSlots.length,
    },
  });
}
