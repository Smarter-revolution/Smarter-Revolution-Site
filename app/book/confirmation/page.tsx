type ConfirmationPageProps = {
  searchParams?: {
    eventType?: string;
    start?: string;
  };
};

const formatDateTime = (iso?: string) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function BookingConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const eventType = searchParams?.eventType ?? "Your meeting";
  const formatted = formatDateTime(searchParams?.start ?? "");

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            Booking confirmed
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            You&apos;re all set
          </h1>
          <p className="mt-4 text-base text-gray-400">
            We&apos;ve sent a confirmation email with meeting details and
            rescheduling options.
          </p>

          <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-6 text-left">
            <p className="text-sm text-gray-400">Meeting</p>
            <p className="mt-1 text-lg font-semibold text-white">{eventType}</p>
            {formatted ? (
              <p className="mt-2 text-sm text-gray-400">{formatted}</p>
            ) : null}
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
              Book another meeting
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
