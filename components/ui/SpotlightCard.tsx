'use client';

import { ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(220, 38, 38, 0.15)',
}: SpotlightCardProps) {
  void spotlightColor;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
