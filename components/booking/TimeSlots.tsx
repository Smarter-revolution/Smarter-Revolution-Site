"use client";

import { useEffect, useState, useCallback } from "react";

type TimeSlotsProps = {
  eventTypeSlug: string;
  hostUsername?: string;
  selectedDate: Date;
  timeZone: string;
  onSlotSelect: (isoDateTime: string) => void;
  onAvailableDatesChange?: (dates: Set<string>) => void;
};

type SlotByDate = Record<string, string[]>;

const formatDateKey = (date: Date) => date.toISOString().split("T")[0];

const toIsoStartOfDay = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
};

const toIsoEndOfDay = (date: Date) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end.toISOString();
};

const normalizeSlots = (data: unknown): SlotByDate => {
  const slots: SlotByDate = {};
  const rawSlots =
    typeof data === "object" && data && "slots" in data
      ? (data as { slots?: unknown }).slots
      : data;

  if (!rawSlots) {
    return slots;
  }

  if (Array.isArray(rawSlots)) {
    rawSlots.forEach((slot) => {
      if (typeof slot === "string") {
        const dateKey = formatDateKey(new Date(slot));
        slots[dateKey] = slots[dateKey] ?? [];
        slots[dateKey].push(slot);
      }
    });
    return slots;
  }

  if (typeof rawSlots === "object") {
    Object.entries(rawSlots as Record<string, unknown>).forEach(
      ([dateKey, slotList]) => {
        if (!Array.isArray(slotList)) {
          return;
        }

        slotList.forEach((slot) => {
          if (typeof slot === "string") {
            slots[dateKey] = slots[dateKey] ?? [];
            slots[dateKey].push(slot);
            return;
          }

          if (typeof slot === "object" && slot) {
            const slotRecord = slot as Record<string, string | undefined>;
            const iso =
              slotRecord.utc ??
              slotRecord.start ??
              slotRecord.dateTime ??
              slotRecord.time;

            if (!iso) {
              return;
            }

            const slotIso =
              iso.length <= 5 && dateKey ? `${dateKey}T${iso}` : iso;
            const normalizedKey = formatDateKey(new Date(slotIso));
            slots[normalizedKey] = slots[normalizedKey] ?? [];
            slots[normalizedKey].push(slotIso);
          }
        });
      }
    );
  }

  return slots;
};

export default function TimeSlots({
  eventTypeSlug,
  hostUsername,
  selectedDate,
  timeZone,
  onSlotSelect,
  onAvailableDatesChange,
}: TimeSlotsProps) {
  const [slots, setSlots] = useState<SlotByDate>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSlots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const startTime = toIsoStartOfDay(selectedDate);
      const end = new Date(selectedDate);
      end.setDate(end.getDate() + 14);
      const endTime = toIsoEndOfDay(end);

      const params = new URLSearchParams({
        eventTypeSlug,
        startTime,
        endTime,
        timeZone,
      });

      if (hostUsername) {
        params.set("username", hostUsername);
      }

      const response = await fetch(`/api/cal/slots?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to load availability");
      }

      const normalizedSlots = normalizeSlots(data);
      setSlots(normalizedSlots);

      // Notify parent of available dates for calendar indicators
      if (onAvailableDatesChange) {
        const availableDates = new Set(
          Object.entries(normalizedSlots)
            .filter(([, slotList]) => slotList.length > 0)
            .map(([dateKey]) => dateKey)
        );
        onAvailableDatesChange(availableDates);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load slots");
    } finally {
      setLoading(false);
    }
  }, [eventTypeSlug, hostUsername, selectedDate, timeZone, onAvailableDatesChange]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const selectedKey = formatDateKey(selectedDate);
  const selectedSlots = slots[selectedKey] ?? [];

  return (
    <div className="flex h-full flex-col">
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Available times for{" "}
        <span className="text-white">
          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </span>
      </label>

      {/* Scrollable time slots container with fixed height */}
      <div className="min-h-[280px] flex-1 lg:max-h-[400px] lg:overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-black/20 px-4 py-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading availability...
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        ) : selectedSlots.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-black/20 px-4 py-8 text-center">
            <svg className="mb-2 h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-400">No availability for this date.</p>
            <p className="mt-1 text-xs text-gray-500">Try selecting another day.</p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {selectedSlots.map((slot) => {
              const slotDate = new Date(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSlotSelect(slotDate.toISOString())}
                  className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-white transition hover:border-red-500/60 hover:bg-red-500/10"
                >
                  <span className="relative z-10">
                    {slotDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform group-hover:translate-x-full" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
