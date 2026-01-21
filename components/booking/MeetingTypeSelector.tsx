"use client";

import Link from "next/link";
import { meetingTypes } from "@/lib/calBookingConfig";

export default function MeetingTypeSelector() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {meetingTypes.map((type) => (
        <Link
          key={type.slug}
          href={`/book/${type.slug}`}
          className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-red-500/60 hover:bg-white/10"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white group-hover:text-red-400">
              {type.title}
            </h3>
            <span className="text-sm text-gray-400">
              {type.durationMinutes} min
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-400">{type.description}</p>
          <div className="mt-6 inline-flex items-center text-sm font-semibold text-red-400">
            Select meeting
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
