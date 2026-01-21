import MeetingTypeSelector from "@/components/booking/MeetingTypeSelector";

export default function BookLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            Schedule a conversation
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Choose the meeting that fits your goals
          </h1>
          <p className="mt-4 text-base text-gray-400">
            Pick a meeting type below to see availability and book a time.
          </p>
        </div>

        <MeetingTypeSelector />
      </div>
    </div>
  );
}
