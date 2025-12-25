import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smarter Revolution | The AI Architects",
  description:
    "Smarter Revolution helps mid-market companies transform through AI. Team empowerment, cinematic content, automation, and AI search dominance. Start your revolution today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <div className="flex min-h-screen flex-col bg-black">
          <Navbar />
          <main className="flex-1 bg-black">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
