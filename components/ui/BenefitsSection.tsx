'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Hexagon shape for benefit icons
function HexagonIcon({ 
  emoji, 
  isActive, 
  color 
}: { 
  emoji: string; 
  isActive: boolean;
  color: string;
}) {
  return (
    <div className="relative w-20 h-20">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-xl rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          opacity: isActive ? [0.3, 0.5, 0.3] : 0,
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Hexagon shape */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`hex-gradient-${emoji}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isActive ? color : '#374151'} />
            <stop offset="100%" stopColor={isActive ? color + '99' : '#1f2937'} />
          </linearGradient>
        </defs>
        <motion.polygon
          points="50,2 95,25 95,75 50,98 5,75 5,25"
          fill={`url(#hex-gradient-${emoji})`}
          stroke={isActive ? color : '#4b5563'}
          strokeWidth="2"
          animate={{
            filter: isActive ? 'drop-shadow(0 0 10px ' + color + ')' : 'none',
          }}
        />
      </svg>
      
      {/* Emoji */}
      <motion.span 
        className="absolute inset-0 flex items-center justify-center text-3xl"
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
      </motion.span>
    </div>
  );
}

// Benefit card with flip reveal
function BenefitCard({
  emoji,
  title,
  description,
  color,
  index
}: {
  emoji: string;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };
  
  // Staggered entrance from different directions
  const getEntranceDirection = () => {
    const directions = [
      { x: -100, y: -50, rotate: -10 },
      { x: 0, y: -100, rotate: 5 },
      { x: 100, y: -50, rotate: 10 },
      { x: -100, y: 50, rotate: -5 },
      { x: 0, y: 100, rotate: -10 },
      { x: 100, y: 50, rotate: 5 },
    ];
    return directions[index % directions.length];
  };
  
  const entrance = getEntranceDirection();
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ 
        opacity: 0, 
        x: entrance.x, 
        y: entrance.y,
        rotateZ: entrance.rotate,
        scale: 0.8
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        rotateZ: 0,
        scale: 1
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-gray-800 backdrop-blur-sm overflow-hidden h-full"
        animate={{
          rotateY: isHovered ? (mousePos.x - 0.5) * 15 : 0,
          rotateX: isHovered ? -(mousePos.y - 0.5) * 15 : 0,
          borderColor: isHovered ? color + '50' : '#1f2937',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${color}20, transparent 50%)`,
          }}
        />
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: `${20 + seededRandom(i * 1 + index * 10 + 1100) * 60}%`,
                  bottom: 0,
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: -100 - seededRandom(i * 2 + index * 10 + 1100) * 50,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + seededRandom(i * 3 + index * 10 + 1100) * 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: seededRandom(i * 4 + index * 10 + 1100) * 0.5,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Icon */}
        <div className="mb-4 flex justify-center md:justify-start">
          <HexagonIcon emoji={emoji} isActive={isHovered || isInView} color={color} />
        </div>
        
        {/* Content */}
        <motion.h3 
          className="text-xl font-bold mb-3 text-center md:text-left"
          animate={{
            color: isHovered ? '#ffffff' : '#e5e7eb',
          }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-400 text-sm leading-relaxed text-center md:text-left"
          animate={{
            color: isHovered ? '#d1d5db' : '#9ca3af',
          }}
        >
          {description}
        </motion.p>
        
        {/* Bottom highlight */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, transparent 50%)`,
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated counter stat
function AnimatedStat({ 
  value, 
  label, 
  suffix = '',
  delay = 0 
}: { 
  value: number; 
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);
  
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div 
        className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
        animate={isInView ? {
          textShadow: [
            '0 0 0px rgba(239,68,68,0)',
            '0 0 20px rgba(239,68,68,0.5)',
            '0 0 0px rgba(239,68,68,0)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

// Main Benefits Section
export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const benefits = [
    {
      emoji: '⚡',
      title: 'Speed',
      description: "Timelines measured in days and weeks, not quarters. We delivered a 10-minute training video in 10 days. What's your deadline?",
      color: '#f59e0b', // Amber
    },
    {
      emoji: '📈',
      title: 'Scale',
      description: 'Create 50 videos or rebuild your entire web presence—without proportional cost or the proportional headache.',
      color: '#3b82f6', // Blue
    },
    {
      emoji: '🎯',
      title: 'Results',
      description: 'Infrastructure designed to convert, track, and prove ROI. Not just "it looks nice"—actual measurable outcomes.',
      color: '#10b981', // Emerald
    },
    {
      emoji: '🔮',
      title: 'Future-Proof',
      description: "Built on modern technology that's ready for AI search, AI integrations, and whatever comes next. No rebuilding in two years.",
      color: '#8b5cf6', // Violet
    },
    {
      emoji: '🤝',
      title: 'Partnership',
      description: 'Responsive humans who actually answer emails. Radical concept, we know.',
      color: '#ec4899', // Pink
    },
    {
      emoji: '💰',
      title: 'Value',
      description: 'Enterprise-grade capability without enterprise-grade budgets or enterprise-grade bureaucracy.',
      color: '#f97316', // Orange
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What changes when you{' '}
            <span className="relative inline-block">
              <motion.span
                className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                work with us.
              </motion.span>
              
              {/* Sparkle effects */}
              <motion.span
                className="absolute -top-2 -right-2 text-yellow-400 text-lg"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✦
              </motion.span>
              <motion.span
                className="absolute -bottom-1 -left-3 text-red-400 text-sm"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ✦
              </motion.span>
            </span>
          </motion.h2>
          
          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedStat value={10} label="Day Delivery" suffix=" day" delay={0.5} />
            <AnimatedStat value={50} label="Videos at Scale" suffix="+" delay={0.7} />
            <AnimatedStat value={100} label="Client Satisfaction" suffix="%" delay={0.9} />
          </motion.div>
        </motion.div>
        
        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              {...benefit}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom decoration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex items-center gap-2 text-gray-500 text-sm"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to explore more</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
