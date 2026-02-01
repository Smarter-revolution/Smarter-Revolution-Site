"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/types/strapi";

const navLinkBase =
  "text-sm font-medium px-3 py-2 rounded-md transition-all duration-200";

interface NavbarProps {
  mainMenu: MenuItem[];
}

export default function Navbar({ mainMenu }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
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

  // Check if a menu item or any of its children is active
  const isMenuItemActive = (item: MenuItem): boolean => {
    if (item.url && item.url !== '#' && pathname === item.url) return true;
    if (item.children?.some(child => pathname === child.url)) return true;
    return false;
  };

  // Dropdown component for desktop - renders menu items with children
  const DropdownMenu = ({
    item,
    isOpen,
    onOpen,
    onClose,
  }: {
    item: MenuItem;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => {
    const isActive = isMenuItemActive(item);

    return (
      <div
        className="relative group"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <button
          type="button"
          onClick={() => isOpen ? onClose() : onOpen()}
          className={`${navLinkBase} flex items-center gap-1 text-white hover:text-red-500 hover:bg-white/5 ${
            isActive ? "text-red-500 bg-white/5" : ""
          }`}
        >
          {item.label}
          <motion.span
            className="text-xs text-gray-400"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && item.children && item.children.length > 0 && (
            <motion.div
              className="absolute left-0 top-full w-72 pt-3 z-50"
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl p-2 shadow-2xl shadow-black/60 ring-1 ring-white/5">
                {/* Dropdown inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.url}
                    target={child.openInNewTab ? "_blank" : undefined}
                    rel={child.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`relative block rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-red-500 transition-all duration-200 ${
                      pathname === child.url ? "text-red-500 bg-white/5" : ""
                    }`}
                    onClick={onClose}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Render a single nav item - either a link or dropdown based on children
  const renderNavItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <DropdownMenu
          key={item.id}
          item={item}
          isOpen={openDropdown === item.id}
          onOpen={() => setOpenDropdown(item.id)}
          onClose={() => setOpenDropdown(null)}
        />
      );
    }

    // Direct link without children
    return (
      <Link
        key={item.id}
        href={item.url}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={`${navLinkBase} text-white hover:text-red-500 hover:bg-white/5 ${
          pathname === item.url ? "text-red-500 bg-white/5" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Floating Navbar Container */}
      <div className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-4">
        <motion.nav
          className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0a0a0a]/70 backdrop-blur-2xl shadow-2xl shadow-black/40"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="relative flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center group">
              <img
                src="/LogosAsset/1rb.png"
                alt="Smarter Revolution"
                className="h-8 sm:h-10 w-auto transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation - Dynamically rendered from mainMenu */}
            <div className="hidden items-center space-x-1 lg:flex">
              {mainMenu.map(renderNavItem)}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/book"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-red-600 px-4 xl:px-5 py-2 xl:py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-500 hover:shadow-red-500/40 hover:scale-105 active:scale-100"
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
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-white hover:text-red-500 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] min-w-[44px] transition-all duration-200"
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
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        mainMenu={mainMenu}
      />
    </>
  );
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onClose,
  pathname,
  mainMenu,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
  mainMenu: MenuItem[];
}) {
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());

  // Close all submenus when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenDropdowns(new Set());
    }
  }, [isOpen]);

  const toggleDropdown = (id: number) => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Render a mobile menu item with optional children
  const MobileMenuItem = ({ item }: { item: MenuItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdowns.has(item.id);

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => toggleDropdown(item.id)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-white hover:text-red-500 hover:bg-white/10 transition-all duration-200 min-h-[44px]"
          >
            <span>{item.label}</span>
            <motion.svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
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
            {isDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-3 space-y-1 border-l-2 border-red-600/40 ml-4"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.id}
                    href={child.url}
                    target={child.openInNewTab ? "_blank" : undefined}
                    rel={child.openInNewTab ? "noopener noreferrer" : undefined}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-white/10 transition-all duration-200 min-h-[44px] flex items-center ${
                      pathname === child.url ? "text-red-500 bg-white/10" : ""
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Direct link without children
    return (
      <Link
        href={item.url}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        onClick={onClose}
        className={`block px-4 py-3 rounded-xl text-base font-medium text-white hover:text-red-500 hover:bg-white/10 transition-all duration-200 min-h-[44px] flex items-center ${
          pathname === item.url ? "bg-white/10 text-red-500" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer - Floating style */}
          <motion.div
            id="mobile-menu"
            className="fixed top-4 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50 z-50 lg:hidden flex flex-col overflow-hidden"
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src="/LogosAsset/1rb.png"
                  alt="Smarter Revolution"
                  className="h-8 w-auto"
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-white hover:text-red-500 hover:bg-white/10 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation - Dynamically rendered from mainMenu */}
            <nav className="relative flex-1 overflow-y-auto p-4 space-y-2">
              {mainMenu.map((item) => (
                <MobileMenuItem key={item.id} item={item} />
              ))}

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-red-600 text-white text-base font-semibold hover:bg-red-500 transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-100"
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
