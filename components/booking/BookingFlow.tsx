"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function BookingFlow({ eventTypeSlug }: BookingFlowProps) {
  const router = useRouter();
  const baseConfig = getMeetingType(eventTypeSlug);
  const [eventType, setEventType] = useState<MeetingTypeConfig | null>(
    baseConfig ?? null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [eventTypeError, setEventTypeError] = useState<string | null>(null);

  const relatedMeetingTypes = useMemo(
    () => meetingTypes.filter((type) => type.slug !== eventTypeSlug),
    [eventTypeSlug]
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
        const resolvedId = resolveEventTypeId(data, eventTypeSlug);

        if (!resolvedId) {
          return;
        }

        setEventType({ ...baseConfig, eventTypeId: resolvedId });
      } catch (error) {
        console.error("Failed to load event types", error);
      }
    };

    loadEventTypeId();
  }, [baseConfig, eventTypeSlug]);

  const handleBookingSuccess = (booking: unknown) => {
    const params = new URLSearchParams({
      eventType: eventType?.title ?? "",
      start: selectedSlot ?? "",
    });

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
          eventTypeSlug={eventType.slug}
          hostUsername={eventType.hostUsername}
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
