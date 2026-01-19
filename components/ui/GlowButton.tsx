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
  glowColor?: 'red' | 'cyan' | 'yellow' | 'blue';
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  glowColor = 'red',
}: GlowButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 overflow-hidden group';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const colorConfig = {
    red: {
      primary: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/25 hover:shadow-red-500/40',
      outline: 'bg-transparent text-red-500 border-2 border-red-600 hover:bg-red-600 hover:text-white',
      glow: 'from-red-600/0 via-red-400/30 to-red-600/0',
    },
    cyan: {
      primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40',
      outline: 'bg-transparent text-cyan-400 border-2 border-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-300',
      glow: 'from-cyan-500/0 via-cyan-300/40 to-cyan-500/0',
    },
    yellow: {
      primary: 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-400 hover:to-orange-500 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-400/40',
      outline: 'bg-transparent text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-300',
      glow: 'from-yellow-500/0 via-yellow-300/40 to-yellow-500/0',
    },
    blue: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40',
      outline: 'bg-transparent text-blue-400 border-2 border-blue-500 hover:bg-blue-500/20 hover:text-blue-300',
      glow: 'from-blue-500/0 via-blue-300/40 to-blue-500/0',
    },
  };

  const variantStyles = {
    primary: colorConfig[glowColor].primary,
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20',
    outline: colorConfig[glowColor].outline,
  };

  const buttonContent = (
    <>
      {/* Glow effect */}
      <span className={`absolute inset-0 bg-gradient-to-r ${colorConfig[glowColor].glow} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700`} />
      
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
