"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formatDateTime = (iso?: string, timeZone?: string) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
};

const formatCalendarDate = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

const buildCalendarLinks = ({
  title,
  start,
  durationMinutes,
  description,
}: {
  title: string;
  start: Date;
  durationMinutes: number;
  description: string;
}) => {
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const startUtc = formatCalendarDate(start);
  const endUtc = formatCalendarDate(end);

  const baseDetails = encodeURIComponent(description);
  const baseTitle = encodeURIComponent(title);

  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${baseTitle}&dates=${startUtc}/${endUtc}&details=${baseDetails}`;
  const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${baseTitle}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${baseDetails}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Smarter Revolution//Cal Booking//EN",
    "BEGIN:VEVENT",
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\\n");

  const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return { google, outlook, icsUrl };
};

export default function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const eventType = searchParams?.get("eventType") ?? "Your meeting";
  const host = searchParams?.get("host") ?? "Smarter Revolution";
  const timeZone = searchParams?.get("timeZone") ?? undefined;
  const bookingUid = searchParams?.get("bookingUid") ?? "";
  const durationMinutes = Number(searchParams?.get("duration") ?? 30);
  const startIso = searchParams?.get("start") ?? "";
  const formatted = formatDateTime(startIso, timeZone);
  const startDate = startIso ? new Date(startIso) : null;
  const description = `Meeting: ${eventType}\\nWith: ${host}`;
  const calendarLinks =
    startDate && !Number.isNaN(startDate.getTime())
      ? buildCalendarLinks({
          title: eventType,
          start: startDate,
          durationMinutes: Number.isNaN(durationMinutes)
            ? 30
            : durationMinutes,
          description,
        })
      : null;
  const rescheduleUrl = bookingUid
    ? `https://cal.com/reschedule/${bookingUid}`
    : "";
  const cancelUrl = bookingUid ? `https://cal.com/cancel/${bookingUid}` : "";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-red-400">
        Booking confirmed
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">You&apos;re all set</h1>
      <p className="mt-4 text-base text-gray-400">
        We&apos;ve sent a confirmation email with meeting details and rescheduling
        options.
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-6 text-left">
        <p className="text-sm text-gray-400">Meeting</p>
        <p className="mt-1 text-lg font-semibold text-white">{eventType}</p>
        {formatted ? (
          <p className="mt-2 text-sm text-gray-400">
            {formatted}
            {timeZone ? ` (${timeZone})` : ""}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-gray-400">With {host}</p>
      </div>

      {calendarLinks ? (
        <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-6 text-left">
          <p className="text-sm text-gray-400">Add to calendar</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={calendarLinks.google}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
            >
              Google Calendar
            </a>
            <a
              href={calendarLinks.outlook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
            >
              Outlook
            </a>
            <a
              href={calendarLinks.icsUrl}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
            >
              Download iCal
            </a>
          </div>
        </div>
      ) : null}

      {bookingUid ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={rescheduleUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
          >
            Reschedule
          </a>
          <a
            href={cancelUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
          >
            Cancel
          </a>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
        >
          Back to home
        </Link>
        <Link
          href="/book"
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Book another meeting
        </Link>
      </div>
    </div>
  );
}
