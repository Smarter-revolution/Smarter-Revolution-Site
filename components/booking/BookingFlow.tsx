"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DateCalendar from "@/components/booking/DateCalendar";
import TimezoneSelector from "@/components/booking/TimezoneSelector";
import TimeSlots from "@/components/booking/TimeSlots";
import BookingForm from "@/components/booking/BookingForm";
import {
  getMeetingType,
  meetingTypes,
  MeetingTypeConfig,
} from "@/lib/calBookingConfig";

type BookingFlowProps = {
  eventTypeSlug: string;
};

const resolveEventTypeId = (
  data: unknown,
  slug: string
): number | undefined => {
  const eventTypes = Array.isArray((data as { eventTypes?: unknown }).eventTypes)
    ? (data as { eventTypes: Array<{ slug?: string; id?: number }> }).eventTypes
    : Array.isArray(data)
      ? (data as Array<{ slug?: string; id?: number }>)
      : [];

  return eventTypes.find((eventType) => eventType.slug === slug)?.id;
};

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";
  const trimmed = slug.split("?")[0];
  const segments = trimmed.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
};

const getHostLabel = (username?: string, usernames?: string[]) => {
  // Combined meeting with multiple hosts
  if (usernames && usernames.length > 1) {
    const labels = usernames.map((u) => {
      if (u.toLowerCase().includes("wolf")) return "Wolf";
      if (u.toLowerCase().includes("mark")) return "Mark";
      return u;
    });
    return labels.join(" & ");
  }
  // Single host
  if (!username) return "Smarter Revolution";
  if (username.toLowerCase().includes("wolf")) return "Wolf";
  if (username.toLowerCase().includes("mark")) return "Mark";
  return username;
};

const extractBookingUid = (booking: unknown) => {
  const record = booking as
    | { uid?: string; bookingUid?: string; booking?: { uid?: string } }
    | undefined;
  return record?.booking?.uid ?? record?.uid ?? record?.bookingUid ?? "";
};

export default function BookingFlow({ eventTypeSlug }: BookingFlowProps) {
  const params = useParams();
  const routeSlug = Array.isArray(params?.eventTypeSlug)
    ? params?.eventTypeSlug[0]
    : (params?.eventTypeSlug as string | undefined);
  const resolvedSlug = normalizeSlug(routeSlug || eventTypeSlug);
  const router = useRouter();
  const baseConfig = getMeetingType(resolvedSlug);

  // Event type state
  const [eventType, setEventType] = useState<MeetingTypeConfig | null>(
    baseConfig ?? null
  );
  const [eventTypeError, setEventTypeError] = useState<string | null>(null);

  // Lifted state - date selection controlled at this level
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

  const relatedMeetingTypes = useMemo(
    () => meetingTypes.filter((type) => type.slug !== resolvedSlug),
    [resolvedSlug]
  );

  useEffect(() => {
    if (!baseConfig) {
      setEventTypeError("Meeting type not found.");
      return;
    }

    if (baseConfig.eventTypeId) {
      setEventType(baseConfig);
      return;
    }

    const loadEventTypeId = async () => {
      try {
        const response = await fetch("/api/cal/event-types");
        const data = await response.json();
        const resolvedId = resolveEventTypeId(data, baseConfig.calEventTypeSlug);

        if (!resolvedId) {
          return;
        }

        setEventType({ ...baseConfig, eventTypeId: resolvedId });
      } catch (error) {
        console.error("Failed to load event types", error);
      }
    };

    loadEventTypeId();
  }, [baseConfig]);

  // Stable callback for date selection - prevents scroll reset
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    // Clear selected slot when date changes
    setSelectedSlot(null);
  }, []);

  // Stable callback for available dates update
  const handleAvailableDatesChange = useCallback((dates: Set<string>) => {
    setAvailableDates(dates);
  }, []);

  const handleBookingSuccess = useCallback((booking: unknown) => {
    const searchParams = new URLSearchParams({
      eventType: eventType?.title ?? "",
      start: selectedSlot ?? "",
      host: getHostLabel(eventType?.hostUsername, eventType?.hostUsernames),
      duration: String(eventType?.durationMinutes ?? ""),
      timeZone,
    });

    const bookingUid = extractBookingUid(booking);
    if (bookingUid) {
      searchParams.set("bookingUid", bookingUid);
    }

    router.push(`/book/confirmation?${searchParams.toString()}`);
  }, [eventType, selectedSlot, timeZone, router]);

  if (eventTypeError) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
        {eventTypeError}
      </div>
    );
  }

  if (!eventType) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
        Loading meeting type...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Meeting info header */}
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.2em] text-red-400">
          {eventType.durationMinutes} minute meeting
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          {eventType.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-400 lg:mx-0">
          {eventType.description}
        </p>
      </div>

      {/*
        PERSISTENT LAYOUT CONTAINER
        - All components are always mounted (no conditional rendering of containers)
        - Only visibility/display changes, preserving scroll position
        - State changes update child props without remounting
      */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* LEFT SIDE: Calendar Selection Panel (always visible) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-6">
            {/* Timezone Selector */}
            <TimezoneSelector
              timeZone={timeZone}
              onTimeZoneChange={setTimeZone}
            />

            {/* Date Calendar */}
            <DateCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              availableDates={availableDates}
            />
          </div>
        </div>

        {/* RIGHT SIDE: Time Slots + Booking Form (persistent container) */}
        <div className="flex flex-col gap-6">
          {/* Time Slots - always rendered, subscribes to selectedDate */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <TimeSlots
              eventTypeSlug={eventType.calEventTypeSlug}
              hostUsername={eventType.hostUsername}
              hostUsernames={eventType.hostUsernames}
              hostEventConfigs={eventType.hostEventConfigs}
              selectedDate={selectedDate}
              timeZone={timeZone}
              onSlotSelect={setSelectedSlot}
              onAvailableDatesChange={handleAvailableDatesChange}
            />
          </div>

          {/* Booking Form - uses CSS visibility instead of conditional mount */}
          <div
            className={`transition-all duration-300 ${
              selectedSlot
                ? "opacity-100"
                : "pointer-events-none h-0 overflow-hidden opacity-0"
            }`}
            aria-hidden={!selectedSlot}
          >
            {/* Form is always rendered but hidden when no slot selected */}
            <BookingForm
              eventType={eventType}
              selectedSlot={selectedSlot ?? ""}
              timeZone={timeZone}
              onSuccess={handleBookingSuccess}
            />
          </div>

          {/* Placeholder when no slot selected */}
          <div
            className={`transition-all duration-300 ${
              selectedSlot
                ? "pointer-events-none h-0 overflow-hidden opacity-0"
                : "opacity-100"
            }`}
            aria-hidden={!!selectedSlot}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-gray-400">
              <svg className="mx-auto mb-3 h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Select a time slot above to continue with booking.
            </div>
          </div>
        </div>
      </div>

      {/* Related meeting types */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
        <p>
          Not the right meeting? Explore other scheduling options below.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relatedMeetingTypes.map((type) => (
            <a
              key={type.slug}
              href={`/book/${type.slug}`}
              className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 transition hover:border-red-500/60 hover:bg-red-500/10"
            >
              {type.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
