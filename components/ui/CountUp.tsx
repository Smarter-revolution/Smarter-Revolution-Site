'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export default function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toString()
  );

  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(end);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, end]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{display}{suffix}
    </motion.span>
  );
}
