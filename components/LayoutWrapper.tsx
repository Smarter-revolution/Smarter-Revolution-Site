'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
}

// Landing pages that should not have the global navbar and footer
const LANDING_PAGES = ['/lp-executive', '/lp-operations'];

export default function LayoutWrapper({ children, navbar, footer }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLandingPage = LANDING_PAGES.some(page => pathname?.startsWith(page));

  if (isLandingPage) {
    // Landing pages get no global navbar/footer - they have their own
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // Regular pages get the full layout
  return (
    <div className="flex min-h-screen flex-col">
      {navbar}
      <main className="flex-1">
        {children}
      </main>
      {footer}
    </div>
  );
}
