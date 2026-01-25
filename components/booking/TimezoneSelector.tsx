"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TimezoneSelectorProps = {
  timeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
};

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

export default function TimezoneSelector({
  timeZone,
  onTimeZoneChange,
}: TimezoneSelectorProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allTimeZones = useMemo(() => {
    if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
      return (Intl as typeof Intl & { supportedValuesOf: (type: string) => string[] })
        .supportedValuesOf("timeZone");
    }
    return POPULAR_TIMEZONES;
  }, []);

  const filteredTimeZones = useMemo(() => {
    const searchLower = search.toLowerCase();
    if (!searchLower) {
      const popular = POPULAR_TIMEZONES.filter((tz) => allTimeZones.includes(tz));
      const others = allTimeZones.filter((tz) => !POPULAR_TIMEZONES.includes(tz));
      return { popular, others };
    }
    const filtered = allTimeZones.filter((tz) => {
      const label = getTimezoneLabel(tz);
      return (
        tz.toLowerCase().includes(searchLower) ||
        label.city.toLowerCase().includes(searchLower) ||
        label.offset.toLowerCase().includes(searchLower)
      );
    });
    return { popular: [], others: filtered };
  }, [allTimeZones, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (tz: string) => {
    onTimeZoneChange(tz);
    setDropdownOpen(false);
    setSearch("");
  };

  const currentLabel = getTimezoneLabel(timeZone);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Your timezone
      </label>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-left text-sm text-white transition hover:border-white/20 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/60"
      >
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-medium">{currentLabel.city}</div>
            <div className="text-xs text-gray-400">{currentLabel.offset}</div>
          </div>
        </div>
        <svg className={`h-5 w-5 text-gray-400 transition ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-hidden rounded-lg border border-white/10 bg-gray-900 shadow-xl">
          <div className="border-b border-white/10 p-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search timezone..."
                className="w-full rounded-md border border-white/10 bg-black/40 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-red-500/60 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

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
                      onClick={() => handleSelect(tz)}
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
                      onClick={() => handleSelect(tz)}
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
                No timezones found for &ldquo;{search}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
