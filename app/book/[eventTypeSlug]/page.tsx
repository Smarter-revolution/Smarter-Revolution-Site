import BookingFlow from "@/components/booking/BookingFlow";

type BookingPageProps = {
  params: {
    eventTypeSlug: string;
  };
};

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <BookingFlow eventTypeSlug={params.eventTypeSlug} />
      </div>
    </div>
  );
}
