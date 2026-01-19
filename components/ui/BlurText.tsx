'use client';

import { motion, Variants } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({
  text,
  className = '',
  delay = 0,
}: BlurTextProps) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(20px)',
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
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
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
