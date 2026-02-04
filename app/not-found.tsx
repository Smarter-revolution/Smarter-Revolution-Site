import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-red-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-base text-gray-400">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full border border-red-500/60 bg-red-500/10 px-6 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400 hover:bg-red-500/20"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
