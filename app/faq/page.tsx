import type { Metadata } from "next";
import Link from "next/link";
import FaqChat from "@/components/faq/FaqChat";

export const metadata: Metadata = {
  title: "FAQ - Smarter Revolution",
  description:
    "Get instant answers about our AI video and automation services",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ - Smarter Revolution",
    description:
      "Get instant answers about our AI video and automation services",
    url: "/faq",
    siteName: "Smarter Revolution",
    type: "website",
    images: [
      {
        url: "/images/pages/faq/hero-21x9.png",
        width: 1920,
        height: 823,
        alt: "FAQ - Smarter Revolution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Smarter Revolution",
    description:
      "Get instant answers about our AI video and automation services",
    images: ["/images/pages/faq/hero-21x9.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Got Questions? <span className="text-red-600">Let&apos;s Chat</span>
          </h1>
          <p className="text-xl text-gray-300">
            Our AI assistant knows everything about our services. Just ask!
          </p>
        </div>

        {/* Chat Component */}
        <div className="mb-8">
          <FaqChat />
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Prefer to talk to a human?{" "}
            <Link
              href="/contact"
              className="text-red-600 hover:text-red-500 transition-colors underline"
            >
              Book a call
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

