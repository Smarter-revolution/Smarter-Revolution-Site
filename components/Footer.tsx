'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
          style={{ top: `${(i + 1) * 12}%` }}
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/5 to-transparent"
          style={{ left: `${(i + 1) * 8}%` }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute w-1 h-1 rounded-full bg-red-500/40"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
          }}
        />
      ))}
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="inline-block">
      <h3 className="text-2xl font-bold">
        <span className="text-white">Smarter </span>
        <span className="text-red-500">Revolution</span>
      </h3>
    </Link>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider relative inline-block">
      {children}
      <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-gradient-to-r from-red-500 to-transparent" />
    </h4>
  );
}

function ContactInfo({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400"
    >
      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
        {icon}
      </span>
      {children}
    </a>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-red-500/25 z-50"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Video Production", href: "/video-production" },
      { name: "Web Development", href: "/web-development" },
      { name: "Guided Knowledge Hub", href: "/guided-knowledge-hub" },
    ],
    solutions: [
      { name: "Training & Onboarding", href: "/solutions/training-onboarding" },
      { name: "Sales & Partner Enablement", href: "/solutions/sales-enablement" },
      { name: "Customer Education", href: "/solutions/customer-education" },
      { name: "Compliance & Documentation", href: "/solutions/compliance-documentation" },
      { name: "Website Modernization", href: "/solutions/website-modernization" },
      { name: "Custom Portals", href: "/solutions/custom-portals" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
      { name: "Team", href: "/team" },
    ],
    landingPages: [
      { name: "For Operations Teams", href: "/lp-operations" },
      { name: "For Executives", href: "/lp-executive" },
    ],
  };

  return (
    <>
      <footer className="relative border-t border-white/10 bg-[#0a0a0a] overflow-hidden">
        <AnimatedGrid />

        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Logo />

              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
                AI-powered video, training, and web infrastructure. We help mid-market companies create faster, perform better, and get discovered everywhere.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <SocialButton
                  href="https://www.youtube.com/@SmarterRevolution"
                  label="YouTube"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.01 3.01 0 00-2.118-2.13C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.38.556A3.01 3.01 0 00.502 6.186C0 8.066 0 12 0 12s0 3.934.502 5.814a3.01 3.01 0 002.118 2.13C4.495 20.5 12 20.5 12 20.5s7.505 0 9.38-.556a3.01 3.01 0 002.118-2.13C24 15.934 24 12 24 12s0-3.934-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/>
                    </svg>
                  }
                />
                <SocialButton
                  href="https://www.facebook.com/smarterrevolution/"
                  label="Facebook"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12.07C22 6.49 17.52 2 11.93 2C6.35 2 1.86 6.49 1.86 12.07C1.86 17.1 5.51 21.28 10.27 22v-7.03H7.9v-2.9h2.37V9.41c0-2.34 1.39-3.63 3.52-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18V22c4.76-.72 8.41-4.9 8.41-9.93z"/>
                    </svg>
                  }
                />
                <SocialButton
                  href="https://www.instagram.com/smarterrevolution"
                  label="Instagram"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4.75-.88a1.06 1.06 0 10-2.12 0 1.06 1.06 0 002.12 0z"/>
                    </svg>
                  }
                />
                <SocialButton
                  href="https://www.linkedin.com/company/smarterrevolution"
                  label="LinkedIn"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  }
                />
                <SocialButton
                  href="https://www.linkedin.com/in/wolfkrammel"
                  label="Wolf Krammel on LinkedIn"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  }
                />
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-2">Ready to transform your content?</p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400"
                >
                  Get started today
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <SectionHeader>Services</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader>Solutions</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader>Company</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
                {footerLinks.landingPages.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader>Information</SectionHeader>
              <div className="space-y-3">
                <ContactInfo
                  href="mailto:info@smarterrevolution.com"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  info@smarterrevolution.com
                </ContactInfo>
                <ContactInfo
                  href="tel:+12133028260"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                >
                  (213) 302-8260
                </ContactInfo>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>©</span>
                <span>{currentYear}</span>
                <span>Smarter Revolution. All rights reserved.</span>
              </p>

              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-red-500">
                  Privacy Policy
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-red-500">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <BackToTopButton />
    </>
  );
}
