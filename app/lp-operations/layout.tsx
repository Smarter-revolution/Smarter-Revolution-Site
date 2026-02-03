import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Infrastructure That Works | Smarter Revolution",
  description:
    "AI-powered training videos your team will actually watch, retain, and apply. Complete visibility. No more chasing. No more guessing.",
};

export default function LandingPageOperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}
