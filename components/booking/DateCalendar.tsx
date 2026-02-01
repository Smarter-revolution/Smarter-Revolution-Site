"use client";

import { useMemo } from "react";

type DateCalendarProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availableDates?: Set<string>;
};

// Use local date components to format the date key (not UTC)
// This ensures dates match the user's local timezone, not UTC
const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function DateCalendar({
  selectedDate,
  onDateSelect,
  availableDates,
}: DateCalendarProps) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const viewMonth = useMemo(() => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  }, [selectedDate]);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const selectedKey = formatDateKey(selectedDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(viewMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    // Select first day of new month (or today if navigating to current month)
    const firstOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
    if (firstOfMonth < today) {
      onDateSelect(today);
    } else {
      onDateSelect(firstOfMonth);
    }
  };

  const selectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    if (newDate >= today) {
      onDateSelect(newDate);
    }
  };

  return (
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
          const hasSlots = availableDates?.has(dateKey) ?? false;

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
  );
}
