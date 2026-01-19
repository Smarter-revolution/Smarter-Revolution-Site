'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Animated logo placeholder with morphing effect
function AnimatedLogo({ 
  index, 
  isHovered,
  onHover 
}: { 
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}) {
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];
  const color = colors[index % colors.length];
  
  return (
    <motion.div
      className="relative w-32 h-16 cursor-pointer"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.1 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Logo container */}
      <motion.div
        className="relative w-full h-full rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 flex items-center justify-center overflow-hidden backdrop-blur-sm"
        animate={{
          borderColor: isHovered ? color + '50' : 'rgba(55, 65, 81, 0.5)',
        }}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Placeholder logo */}
        <motion.div
          className="flex items-center gap-2"
          animate={{
            color: isHovered ? color : '#6b7280',
          }}
        >
          <motion.div
            className="w-6 h-6 rounded-md"
            style={{ backgroundColor: color }}
            animate={{
              rotate: isHovered ? [0, 180, 360] : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <span className="font-semibold text-sm">Client {index + 1}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Infinite scrolling logo strip
function LogoStrip() {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const logos = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -1024],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos].map((logoIndex, i) => (
          <AnimatedLogo
            key={i}
            index={logoIndex}
            isHovered={hoveredLogo === i}
            onHover={setHoveredLogo}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Testimonial card with dramatic reveal
function TestimonialCard({
  quote,
  name,
  title,
  index,
  isActive,
  onClick
}: {
  quote: string;
  name: string;
  title: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isActive ? 1.02 : 1,
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={`relative p-8 rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-300 ${
          isActive 
            ? 'bg-gradient-to-br from-gray-900 to-gray-950 border-red-500/30' 
            : 'bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-gray-800'
        }`}
        animate={{
          rotateY: (mousePos.x - 0.5) * 5,
          rotateX: -(mousePos.y - 0.5) * 5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight effect following mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(239, 68, 68, 0.15), transparent 50%)`,
          }}
        />
        
        {/* Animated quote mark */}
        <motion.div
          className="absolute -top-4 -left-2 text-8xl font-serif text-red-600/20"
          animate={isActive ? {
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          "
        </motion.div>
        
        {/* Quote text with reveal animation */}
        <motion.p 
          className="text-lg md:text-xl text-gray-300 italic mb-8 relative z-10 leading-relaxed"
          animate={{
            color: isActive ? '#e5e7eb' : '#9ca3af',
          }}
        >
          {quote}
        </motion.p>
        
        {/* Author info */}
        <div className="flex items-center gap-4 relative z-10">
          {/* Avatar placeholder with animated ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
              animate={isActive ? {
                rotate: 360,
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
          </div>
          
          <div>
            <motion.p 
              className="font-bold text-white"
              animate={{
                x: isActive ? [0, 2, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.p>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
        
        {/* Active indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating particles when active */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500/50"
                style={{
                  left: `${20 + seededRandom(i * 1 + index * 10 + 1000) * 60}%`,
                  top: `${20 + seededRandom(i * 2 + index * 10 + 1000) * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Trust metrics with animated counters
function TrustMetric({ 
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
      className="text-center px-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div 
        className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-1"
        animate={isInView ? {
          textShadow: [
            '0 0 0px rgba(239,68,68,0)',
            '0 0 15px rgba(239,68,68,0.4)',
            '0 0 0px rgba(239,68,68,0)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-gray-500 text-sm">{label}</div>
    </motion.div>
  );
}

// Main Social Proof Section
export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  
  const testimonials = [
    {
      quote: "[Placeholder: Testimonial about video production speed, quality, or impact. Something like 'They delivered our entire training library in weeks, not months. The quality exceeded what we got from our previous agency at 3x the cost.']",
      name: '[Name]',
      title: '[Title], [Company]'
    },
    {
      quote: "[Placeholder: Testimonial about web development, AI-readiness, or partnership experience. Something like 'Our new site isn't just faster—it's already ranking in AI search results. That's the difference between modern infrastructure and legacy systems.']",
      name: '[Name]',
      title: '[Title], [Company]'
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, opacity }}
      >
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/3 -left-20 w-40 h-40 bg-red-600/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-1/3 -right-20 w-40 h-40 bg-orange-600/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with dramatic reveal */}
        <motion.div 
          className="text-center mb-12"
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
            Trusted by companies ready to{' '}
            <span className="relative inline-block">
              <motion.span
                className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                move forward.
              </motion.span>
              
              {/* Underline animation */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
        </motion.div>
        
        {/* Trust metrics */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 py-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TrustMetric value={50} label="Projects Delivered" suffix="+" delay={0.5} />
          <div className="hidden md:block w-px bg-gray-700/50" />
          <TrustMetric value={98} label="Client Satisfaction" suffix="%" delay={0.7} />
          <div className="hidden md:block w-px bg-gray-700/50" />
          <TrustMetric value={10} label="Day Avg. Delivery" suffix="" delay={0.9} />
          <div className="hidden md:block w-px bg-gray-700/50" />
          <TrustMetric value={5} label="Years Experience" suffix="+" delay={1.1} />
        </motion.div>
        
        {/* Logo strip */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-center text-gray-500 text-sm mb-4">Trusted by innovative companies</p>
          <LogoStrip />
        </motion.div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              index={index}
              isActive={activeTestimonial === index}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
        
        {/* Testimonial navigation dots */}
        <motion.div
          className="flex justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeTestimonial === index 
                  ? 'bg-red-500' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setActiveTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
