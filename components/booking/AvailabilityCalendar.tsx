"use client";

import { useEffect, useMemo, useState } from "react";

type SlotByDate = Record<string, string[]>;

type AvailabilityCalendarProps = {
  eventTypeSlug: string;
  hostUsername?: string;
  timeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
  onSlotSelect: (isoDateTime: string) => void;
};

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

export default function AvailabilityCalendar({
  eventTypeSlug,
  hostUsername,
  timeZone,
  onTimeZoneChange,
  onSlotSelect,
}: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [slots, setSlots] = useState<SlotByDate>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeZones = useMemo(() => {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      return (Intl as typeof Intl & { supportedValuesOf: (type: string) => string[] })
        .supportedValuesOf("timeZone");
    }
    return [timeZone];
  }, [timeZone]);

  useEffect(() => {
    const loadSlots = async () => {
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

        setSlots(normalizeSlots(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load slots");
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
  }, [eventTypeSlug, hostUsername, selectedDate, timeZone]);

  const selectedKey = formatDateKey(selectedDate);
  const selectedSlots = slots[selectedKey] ?? [];

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Select a date</h3>
          <p className="text-sm text-gray-400">Timezone: {timeZone}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={timeZone}
            onChange={(event) => onTimeZoneChange(event.target.value)}
            className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            aria-label="Select time zone"
          >
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedKey}
            onChange={(event) => setSelectedDate(new Date(event.target.value))}
            className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Loading availability...</div>
      ) : error ? (
        <div className="text-sm text-red-400">{error}</div>
      ) : selectedSlots.length === 0 ? (
        <div className="text-sm text-gray-400">
          No availability for this date. Try another day.
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {selectedSlots.map((slot) => {
            const slotDate = new Date(slot);
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSlotSelect(slotDate.toISOString())}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white transition hover:border-red-500/60 hover:bg-red-500/10"
              >
                {slotDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
