'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
      
      {/* Hover spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background }}
      />
    </motion.div>
  );
}
