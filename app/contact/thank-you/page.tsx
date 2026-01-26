"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name") ?? "there";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
        <svg
          className="h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-red-400">
        Message received
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">
        Thank you, {name.split(" ")[0]}!
      </h1>
      <p className="mt-4 text-base text-gray-400">
        We&apos;ve received your message and will get back to you within 24
        hours. Keep an eye on your inbox.
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-6 text-left">
        <p className="text-sm text-gray-400">What happens next?</p>
        <ul className="mt-3 space-y-2 text-sm text-white">
          <li className="flex items-start gap-2">
            <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-400">
              1
            </span>
            Our team will review your message
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-400">
              2
            </span>
            We&apos;ll match you with the right specialist
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-400">
              3
            </span>
            You&apos;ll receive a personalized response
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500/60 hover:bg-red-500/10"
        >
          Back to home
        </a>
        <a
          href="/book"
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Schedule a call
        </a>
      </div>
    </div>
  );
}

export default function ContactThankYouPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-red-400">
                Message received
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white">
                Thank you!
              </h1>
              <p className="mt-4 text-base text-gray-400">Loading...</p>
            </div>
          }
        >
          <ThankYouContent />
        </Suspense>
      </div>
    </div>
  );
}
