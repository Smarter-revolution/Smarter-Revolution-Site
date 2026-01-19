'use client';

import { motion, Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'chars' | 'words';
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  type = 'chars',
}: SplitTextProps) {
  const items = type === 'chars' ? text.split('') : text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'chars' ? 0.02 : 0.05,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className={type === 'chars' ? 'inline-block' : 'mr-[0.25em] inline-block'}
          style={{ transformOrigin: 'bottom' }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
