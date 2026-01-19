'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={hover ? { 
        y: -5,
        borderColor: 'rgba(220, 38, 38, 0.5)',
        transition: { duration: 0.2 }
      } : undefined}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
