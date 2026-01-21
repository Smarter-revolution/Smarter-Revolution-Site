"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinkBase =
  "text-sm font-medium px-3 py-2 rounded-md transition-all duration-200";

// Navigation structure from Website 2026 specs
const servicesItems = [
  { name: "Video Production", href: "/video-production" },
  { name: "Web Development", href: "/web-development" },
  { name: "Guided Knowledge Hub", href: "/guided-knowledge-hub" },
];

const solutionsItems = [
  { name: "Training & Onboarding", href: "/solutions/training-onboarding" },
  { name: "Sales & Partner Enablement", href: "/solutions/sales-enablement" },
  { name: "Customer Education", href: "/solutions/customer-education" },
  { name: "Compliance & Documentation", href: "/solutions/compliance-documentation" },
  { name: "Website & Platform Modernization", href: "/solutions/website-modernization" },
  { name: "Custom Portals & Systems", href: "/solutions/custom-portals" },
];

const resourcesItems = [
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
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

  // Dropdown component for desktop
  const DropdownMenu = ({ 
    items, 
    isOpen, 
    setIsOpen, 
    label 
  }: { 
    items: { name: string; href: string }[]; 
    isOpen: boolean; 
    setIsOpen: (open: boolean) => void;
    label: string;
  }) => (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${navLinkBase} flex items-center gap-1 text-white hover:text-red-500 hover:bg-white/5`}
      >
        {label}
        <motion.span 
          className="text-xs text-gray-400"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute left-0 top-full w-72 pt-2 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-red-500 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <motion.nav 
        className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
              Smarter <span className="text-red-600">Revolution</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 lg:flex">
            <Link
              href="/"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname === "/" ? "text-red-500 bg-white/5" : ""
              }`}
            >
              Home
            </Link>

            <DropdownMenu 
              items={servicesItems} 
              isOpen={servicesOpen} 
              setIsOpen={setServicesOpen}
              label="Services"
            />

            <DropdownMenu 
              items={solutionsItems} 
              isOpen={solutionsOpen} 
              setIsOpen={setSolutionsOpen}
              label="Solutions"
            />

            <DropdownMenu 
              items={resourcesItems} 
              isOpen={resourcesOpen} 
              setIsOpen={setResourcesOpen}
              label="Resources"
            />

            <Link
              href="/about"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname === "/about" ? "text-red-500 bg-white/5" : ""
              }`}
            >
              About
            </Link>

            <Link
              href="/team"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname === "/team" ? "text-red-500 bg-white/5" : ""
              }`}
            >
              Team
            </Link>

            <Link
              href="/blog"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname === "/blog" ? "text-red-500 bg-white/5" : ""
              }`}
            >
              Blog
            </Link>

            <Link
              href="/book"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname?.startsWith("/book") ? "text-red-500 bg-white/5" : ""
              }`}
            >
              Book
            </Link>

            <Link
              href="/contact"
              className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
                pathname === "/contact" ? "text-red-500 bg-white/5" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 hover:shadow-red-500/30 hover:scale-105"
            >
              <span>Free Strategy Call</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-red-500 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[44px] min-w-[44px] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuExpanded}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
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
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
      />
    </>
  );
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
}) {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // Close submenus when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setMobileServicesOpen(false);
      setMobileSolutionsOpen(false);
      setMobileResourcesOpen(false);
    }
  }, [isOpen]);

  const MobileDropdown = ({
    label,
    items,
    isOpen,
    setIsOpen,
  }: {
    label: string;
    items: { name: string; href: string }[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px]"
      >
        <span>{label}</span>
        <motion.svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4 space-y-1 border-l-2 border-red-600/30 ml-4"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            id="mobile-menu"
            className="fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-[#0a0a0a] border-l border-white/10 z-50 lg:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link
                href="/"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname === "/" ? "bg-white/5 text-red-500" : ""
                }`}
              >
                Home
              </Link>

              <MobileDropdown
                label="Services"
                items={servicesItems}
                isOpen={mobileServicesOpen}
                setIsOpen={setMobileServicesOpen}
              />

              <MobileDropdown
                label="Solutions"
                items={solutionsItems}
                isOpen={mobileSolutionsOpen}
                setIsOpen={setMobileSolutionsOpen}
              />

              <MobileDropdown
                label="Resources"
                items={resourcesItems}
                isOpen={mobileResourcesOpen}
                setIsOpen={setMobileResourcesOpen}
              />

              <Link
                href="/about"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname === "/about" ? "bg-white/5 text-red-500" : ""
                }`}
              >
                About
              </Link>

              <Link
                href="/team"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname === "/team" ? "bg-white/5 text-red-500" : ""
                }`}
              >
                Team
              </Link>

              <Link
                href="/blog"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname === "/blog" ? "bg-white/5 text-red-500" : ""
                }`}
              >
                Blog
              </Link>

              <Link
                href="/book"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname?.startsWith("/book") ? "bg-white/5 text-red-500" : ""
                }`}
              >
                Book
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className={`block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors min-h-[44px] flex items-center ${
                  pathname === "/contact" ? "bg-white/5 text-red-500" : ""
                }`}
              >
                Contact
              </Link>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-red-600 text-white text-base font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/25"
                >
                  Free Strategy Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
