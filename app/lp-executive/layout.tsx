import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scale Your Video Content | Smarter Revolution",
  description:
    "What if every product, every process, every sales pitch had a professional video? AI-powered production compresses months into days.",
};

export default function LandingPageExecutiveLayout({
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
