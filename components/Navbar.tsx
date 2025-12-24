"use client";

import Link from "next/link";
import { useState } from "react";

const navLinkBase =
  "text-sm font-medium px-3 py-2 rounded-md transition-colors";

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b-2 border-red-600 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-white">
            Smarter <span className="text-red-600">Revolution</span>
          </span>
          <span className="hidden text-xs font-medium text-gray-400 sm:inline">
            The AI Architects
          </span>
        </Link>

        <div className="hidden items-center space-x-1 md:flex">
          <Link
            href="/"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            Home
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setSolutionsOpen((o) => !o)}
              className={`${navLinkBase} flex items-center gap-1 text-white hover:text-red-600 hover:bg-gray-900`}
            >
              Solutions
              <span className="text-xs text-gray-400">▾</span>
            </button>
            {solutionsOpen && (
              <div className="absolute right-0 top-full w-64 pt-2 z-50">
                <div className="rounded-md border-2 border-red-600 bg-black p-2 shadow-xl">
                  <Link
                    href="/solutions#empower"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-gray-900 hover:text-red-600 transition-colors"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    EMPOWER
                  </Link>
                  <Link
                    href="/solutions#captivate"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-gray-900 hover:text-red-600 transition-colors"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    CAPTIVATE
                  </Link>
                  <Link
                    href="/solutions#automate"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-gray-900 hover:text-red-600 transition-colors"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    AUTOMATE
                  </Link>
                  <Link
                    href="/solutions#dominate"
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-gray-900 hover:text-red-600 transition-colors"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    DOMINATE
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/solutions"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            Services
          </Link>

          <Link
            href="/about"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            About
          </Link>
          <Link
            href="/team"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            Team
          </Link>
          <Link
            href="/blog"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`${navLinkBase} text-white hover:text-red-600 hover:bg-gray-900`}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/strategy"
            className="hidden rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 md:inline-block"
          >
            Free Strategy Session
          </Link>
        </div>
      </div>
    </nav>
  );
}