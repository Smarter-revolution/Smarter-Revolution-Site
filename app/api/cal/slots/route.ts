import { NextRequest, NextResponse } from "next/server";
import { getCalApiKey } from "@/lib/cal-auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const CAL_API_BASE = process.env.CAL_API_BASE_URL ?? "https://api.cal.com";

type SlotByDate = Record<string, string[]>;

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

  const normalizedArrays = slotArrays.map((arr) =>
    arr.map((slot) => roundToInterval(slot, 15))
  );

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
  // SECURITY: Uses secure exact-match API key selection
  const apiKey = getCalApiKey(username);
  if (!apiKey) {
    return { username, slots: [], error: "Calendar service not configured" };
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
        error: data?.error || data?.message || "Failed to fetch availability",
      };
    }

    const normalizedSlots = normalizeToArray(data);
    return { username, slots: normalizedSlots };
  } catch (error) {
    console.error("[Slots API] Error:", error instanceof Error ? error.message : "Unknown error");
    return {
      username,
      slots: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Parse per-user event type slugs from format: "user1:slug1,user2:slug2"
const parseUserEventSlugs = (eventTypeSlugs: string): Map<string, string> => {
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
  // Apply rate limiting
  const rateLimit = checkRateLimit(request, RATE_LIMITS.booking);
  if (!rateLimit.success) {
    return rateLimit.error;
  }

  const { searchParams } = new URL(request.url);
  const eventTypeSlug = searchParams.get("eventTypeSlug");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const timeZone = searchParams.get("timeZone");
  const username = searchParams.get("username");
  const usernames = searchParams.get("usernames");
  const eventTypeSlugs = searchParams.get("eventTypeSlugs");

  if (!startTime || !endTime || !timeZone) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  const userEventSlugs = eventTypeSlugs
    ? parseUserEventSlugs(eventTypeSlugs)
    : new Map<string, string>();

  const usernameList = usernames
    ? usernames.split(",").map((u) => u.trim()).filter(Boolean)
    : username
      ? [username]
      : [];

  if (usernameList.length === 0) {
    usernameList.push("wolfkrammel");
  }

  const getEventSlugForUser = (user: string): string | null => {
    if (userEventSlugs.has(user)) {
      return userEventSlugs.get(user)!;
    }
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
  const missingSlugUsers = usernameList.filter((u) => !getEventSlugForUser(u));
  if (missingSlugUsers.length > 0) {
    return NextResponse.json(
      { error: "Missing eventTypeSlug for some users" },
      { status: 400 }
    );
  }

  const results = await Promise.all(
    usernameList.map((user) => {
      const slug = getEventSlugForUser(user)!;
      return fetchSlotsForUser(user, slug, startTime, endTime, timeZone);
    })
  );

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    return NextResponse.json({
      slots: {},
      warning: "Could not fetch availability for all participants",
    });
  }

  const successfulResults = results.filter((r) => !r.error);
  const slotArrays = successfulResults.map((r) => r.slots);
  const intersectedSlots = intersectSlots(slotArrays);

  return NextResponse.json({
    slots: groupByDate(intersectedSlots),
    _meta: {
      combined: true,
      participants: usernameList,
      mutualSlots: intersectedSlots.length,
    },
  });
}
