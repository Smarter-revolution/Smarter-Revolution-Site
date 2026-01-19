'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: GlowButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 overflow-hidden group';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/25 hover:shadow-red-500/40',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20',
    outline: 'bg-transparent text-red-500 border-2 border-red-600 hover:bg-red-600 hover:text-white',
  };

  const buttonContent = (
    <>
      {/* Glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-400/30 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          className={combinedStyles}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={combinedStyles}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
}
