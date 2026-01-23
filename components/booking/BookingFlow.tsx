"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AvailabilityCalendar from "@/components/booking/AvailabilityCalendar";
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

const getHostLabel = (username?: string) => {
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
  const [eventType, setEventType] = useState<MeetingTypeConfig | null>(
    baseConfig ?? null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [eventTypeError, setEventTypeError] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
  );

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

  const handleBookingSuccess = (booking: unknown) => {
    const params = new URLSearchParams({
      eventType: eventType?.title ?? "",
      start: selectedSlot ?? "",
      host: getHostLabel(eventType?.hostUsername),
      duration: String(eventType?.durationMinutes ?? ""),
      timeZone,
    });

    const bookingUid = extractBookingUid(booking);
    if (bookingUid) {
      params.set("bookingUid", bookingUid);
    }

    router.push(`/book/confirmation?${params.toString()}`);
    console.log("Booking confirmed", booking);
  };

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
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-red-400">
            {eventType.durationMinutes} minute meeting
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {eventType.title}
          </h1>
          <p className="mt-3 text-base text-gray-400">
            {eventType.description}
          </p>
        </div>

        <AvailabilityCalendar
          eventTypeSlug={eventType.calEventTypeSlug}
          hostUsername={eventType.hostUsername}
          timeZone={timeZone}
          onTimeZoneChange={setTimeZone}
          onSlotSelect={setSelectedSlot}
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
          <p>
            Not the right meeting? Explore other scheduling options below.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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

      <div className="space-y-6">
        {selectedSlot ? (
          <BookingForm
            eventType={eventType}
            selectedSlot={selectedSlot}
            timeZone={timeZone}
            onSuccess={handleBookingSuccess}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
            Choose a time slot to continue.
          </div>
        )}
      </div>
    </div>
  );
}
