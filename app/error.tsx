"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Client-only logging to avoid extra services
    console.error("[App Error Boundary]", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-red-400">
        Something went wrong
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
        We hit a snag on this page.
      </h1>
      <p className="mt-3 text-base text-gray-400">
        Try again or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-red-500/60 bg-red-500/10 px-6 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400 hover:bg-red-500/20"
        >
          Retry
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          Back to home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 text-xs text-gray-600">Error ID: {error.digest}</p>
      ) : null}
    </div>
  );
}
