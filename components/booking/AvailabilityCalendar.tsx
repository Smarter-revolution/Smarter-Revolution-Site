"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

// Popular timezones to show at the top
const POPULAR_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Asia/Karachi",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const getTimezoneLabel = (tz: string) => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(now);
    const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    const city = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
    return { city, offset, full: `${city} (${offset})` };
  } catch {
    return { city: tz, offset: "", full: tz };
  }
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function AvailabilityCalendar({
  eventTypeSlug,
  hostUsername,
  timeZone,
  onTimeZoneChange,
  onSlotSelect,
}: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const [slots, setSlots] = useState<SlotByDate>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Timezone dropdown state
  const [tzDropdownOpen, setTzDropdownOpen] = useState(false);
  const [tzSearch, setTzSearch] = useState("");
  const tzDropdownRef = useRef<HTMLDivElement>(null);

  const allTimeZones = useMemo(() => {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      return (Intl as typeof Intl & { supportedValuesOf: (type: string) => string[] })
        .supportedValuesOf("timeZone");
    }
    return POPULAR_TIMEZONES;
  }, []);

  const filteredTimeZones = useMemo(() => {
    const search = tzSearch.toLowerCase();
    if (!search) {
      // Show popular first, then all others
      const popular = POPULAR_TIMEZONES.filter((tz) => allTimeZones.includes(tz));
      const others = allTimeZones.filter((tz) => !POPULAR_TIMEZONES.includes(tz));
      return { popular, others };
    }
    const filtered = allTimeZones.filter((tz) => {
      const label = getTimezoneLabel(tz);
      return (
        tz.toLowerCase().includes(search) ||
        label.city.toLowerCase().includes(search) ||
        label.offset.toLowerCase().includes(search)
      );
    });
    return { popular: [], others: filtered };
  }, [allTimeZones, tzSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tzDropdownRef.current && !tzDropdownRef.current.contains(e.target as Node)) {
        setTzDropdownOpen(false);
        setTzSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  const currentTzLabel = getTimezoneLabel(timeZone);

  // Calendar calculations
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(viewMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setViewMonth(newMonth);
  };

  const selectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    if (newDate >= today) {
      setSelectedDate(newDate);
    }
  };

  const handleSelectTimezone = (tz: string) => {
    onTimeZoneChange(tz);
    setTzDropdownOpen(false);
    setTzSearch("");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* Two-column layout: Calendar (left) + Time slots (right) */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
        {/* LEFT COLUMN: Timezone + Calendar */}
        <div className="space-y-6">
          {/* Timezone Selector */}
          <div className="relative" ref={tzDropdownRef}>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Your timezone
            </label>
            <button
              type="button"
              onClick={() => setTzDropdownOpen(!tzDropdownOpen)}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-white transition hover:border-white/20 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/60"
            >
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-medium">{currentTzLabel.city}</div>
                  <div className="text-xs text-gray-400">{currentTzLabel.offset}</div>
                </div>
              </div>
              <svg className={`h-5 w-5 text-gray-400 transition ${tzDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {tzDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-hidden rounded-lg border border-white/10 bg-gray-900 shadow-xl">
                {/* Search input */}
                <div className="border-b border-white/10 p-3">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={tzSearch}
                      onChange={(e) => setTzSearch(e.target.value)}
                      placeholder="Search timezone..."
                      className="w-full rounded-md border border-white/10 bg-black/40 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-red-500/60 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Timezone list */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredTimeZones.popular.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-gray-800/90 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 backdrop-blur">
                        Popular
                      </div>
                      {filteredTimeZones.popular.map((tz) => {
                        const label = getTimezoneLabel(tz);
                        return (
                          <button
                            key={tz}
                            type="button"
                            onClick={() => handleSelectTimezone(tz)}
                            className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                              tz === timeZone ? "bg-red-500/10 text-red-400" : "text-white"
                            }`}
                          >
                            <span>{label.city}</span>
                            <span className="text-xs text-gray-500">{label.offset}</span>
                          </button>
                        );
                      })}
                    </>
                  )}

                  {filteredTimeZones.others.length > 0 && (
                    <>
                      {filteredTimeZones.popular.length > 0 && (
                        <div className="sticky top-0 bg-gray-800/90 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 backdrop-blur">
                          All Timezones
                        </div>
                      )}
                      {filteredTimeZones.others.map((tz) => {
                        const label = getTimezoneLabel(tz);
                        return (
                          <button
                            key={tz}
                            type="button"
                            onClick={() => handleSelectTimezone(tz)}
                            className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                              tz === timeZone ? "bg-red-500/10 text-red-400" : "text-white"
                            }`}
                          >
                            <span>{label.city}</span>
                            <span className="text-xs text-gray-500">{label.offset}</span>
                          </button>
                        );
                      })}
                    </>
                  )}

                  {filteredTimeZones.popular.length === 0 && filteredTimeZones.others.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-gray-400">
                      No timezones found for &ldquo;{tzSearch}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Select a date
            </label>

            {/* Month navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Previous month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className="text-lg font-semibold text-white">
                {monthNames[month]} {year}
              </h4>
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Next month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day names */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);
                const dateKey = formatDateKey(date);
                const isToday = date.getTime() === today.getTime();
                const isSelected = dateKey === selectedKey;
                const isPast = date < today;
                const hasSlots = slots[dateKey] && slots[dateKey].length > 0;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDay(day)}
                    disabled={isPast}
                    className={`relative aspect-square rounded-lg text-sm font-medium transition ${
                      isPast
                        ? "cursor-not-allowed text-gray-600"
                        : isSelected
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                        : isToday
                        ? "border border-red-500/50 text-white hover:bg-white/5"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {day}
                    {hasSlots && !isPast && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Time slots */}
        <div className="flex flex-col lg:border-l lg:border-white/10 lg:pl-8">
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
      </div>
    </div>
  );
}
