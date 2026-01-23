import { Suspense } from "react";
import BookingConfirmationContent from "@/components/booking/BookingConfirmationContent";

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-red-400">
                Booking confirmed
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white">
                You&apos;re all set
              </h1>
              <p className="mt-4 text-base text-gray-400">
                Loading your booking details...
              </p>
            </div>
          }
        >
          <BookingConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
