"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navLinkBase =
  "text-sm font-medium px-3 py-2 rounded-md transition-colors";

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const mobileMenuExpanded = mobileMenuOpen ? "true" : "false";

  return (
    <>
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

          {/* Desktop Navigation */}
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

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 min-h-[44px] min-w-[44px]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuExpanded}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Rendered outside nav to avoid stacking context issues from backdrop-blur */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
      />
    </>
  );
}

// Mobile Menu Component - Rendered outside nav to avoid stacking context issues
export function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
}) {
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const mobileSolutionsExpanded = mobileSolutionsOpen ? "true" : "false";

  // Close solutions submenu when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setMobileSolutionsOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-black border-l-2 border-red-600 z-50 md:hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-red-600 flex-shrink-0 bg-black">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-white hover:text-red-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links - Scrollable Container */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1 bg-black min-h-0"
          aria-label="Mobile navigation"
        >
          <Link
            href="/"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/" ? "bg-gray-900 text-red-600" : ""
            }`}
          >
            Home
          </Link>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px]"
              aria-expanded={mobileSolutionsExpanded}
              aria-controls="mobile-solutions-menu"
            >
              <span>Solutions</span>
              <svg
                className={`h-5 w-5 transition-transform ${
                  mobileSolutionsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="mobile-solutions-menu"
              className={`mt-2 pl-4 space-y-2 border-l-2 border-red-600 ml-4 ${
                mobileSolutionsOpen ? "block" : "hidden"
              }`}
            >
              <Link
                href="/solutions#empower"
                onClick={onClose}
                className="block px-4 py-3 rounded-md text-sm font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center"
              >
                EMPOWER
              </Link>
              <Link
                href="/solutions#captivate"
                onClick={onClose}
                className="block px-4 py-3 rounded-md text-sm font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center"
              >
                CAPTIVATE
              </Link>
              <Link
                href="/solutions#automate"
                onClick={onClose}
                className="block px-4 py-3 rounded-md text-sm font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center"
              >
                AUTOMATE
              </Link>
              <Link
                href="/solutions#dominate"
                onClick={onClose}
                className="block px-4 py-3 rounded-md text-sm font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center"
              >
                DOMINATE
              </Link>
            </div>
          </div>

          <Link
            href="/solutions"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/solutions" ? "bg-gray-900 text-red-600" : ""
            }`}
          >
            Services
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/about" ? "bg-gray-900 text-red-600" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/team"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/team" ? "bg-gray-900 text-red-600" : ""
            }`}
          >
            Team
          </Link>

          <Link
            href="/blog"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/blog" || pathname?.startsWith("/blog/")
                ? "bg-gray-900 text-red-600"
                : ""
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className={`block px-4 py-3 rounded-md text-base font-medium text-white hover:text-red-600 hover:bg-gray-900 transition-colors min-h-[44px] flex items-center ${
              pathname === "/contact" ? "bg-gray-900 text-red-600" : ""
            }`}
          >
            Contact
          </Link>

          <Link
            href="/strategy"
            onClick={onClose}
            className="block mt-4 px-4 py-3 rounded-full bg-red-600 text-white text-base font-semibold text-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 min-h-[44px] flex items-center justify-center"
          >
            Free Strategy Session
          </Link>
        </nav>
      </div>
    </>
  );
}