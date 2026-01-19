'use client';

import Link from "next/link";
import { motion } from "framer-motion";

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
    resources: [
      { name: "Blog", href: "/blog" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/5 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                Smarter <span className="text-red-600">Revolution</span>
              </h3>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
              AI-powered video, training, and web infrastructure. We help mid-market companies create faster, perform better, and get discovered everywhere.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://linkedin.com/company/smarterrevolution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:info@smarterrevolution.com"
                className="block text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                info@smarterrevolution.com
              </a>
              <a
                href="tel:+12133028260"
                className="block text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                (213) 302-8260
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Smarter Revolution. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
