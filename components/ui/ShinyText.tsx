'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export default function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
}: ShinyTextProps) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ width: `${shimmerWidth}%` }}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      />
    </span>
  );
}
