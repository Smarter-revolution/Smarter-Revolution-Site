'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = '',
  gradient = 'from-red-500 via-red-400 to-orange-500',
  animate = false,
}: GradientTextProps) {
  const baseStyles = `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`;
  
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
