'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  from?: 'red' | 'cyan' | 'yellow' | 'blue' | 'purple' | 'green';
  to?: 'red' | 'cyan' | 'yellow' | 'blue' | 'purple' | 'green' | 'orange';
  animate?: boolean;
}

const colorMap = {
  red: 'red-500',
  cyan: 'cyan-400',
  yellow: 'yellow-400',
  blue: 'blue-500',
  purple: 'purple-500',
  green: 'green-500',
  orange: 'orange-500',
};

export default function GradientText({
  children,
  className = '',
  gradient,
  from,
  to,
  animate = false,
}: GradientTextProps) {
  // Use custom gradient if provided, otherwise build from from/to colors
  let gradientClass = gradient || 'from-red-500 via-red-400 to-orange-500';
  
  if (from && to) {
    gradientClass = `from-${colorMap[from]} to-${colorMap[to]}`;
  } else if (from) {
    gradientClass = `from-${colorMap[from]} to-${colorMap[from]}`;
  }
  
  const baseStyles = `bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`;
  
  if (animate) {
    return (
      <motion.span
        className={`${baseStyles} ${className}`}
        style={{
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`${baseStyles} ${className}`}>
      {children}
    </span>
  );
}
