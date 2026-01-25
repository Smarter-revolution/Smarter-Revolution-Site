'use client';

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Animated particle field
function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1 + 200) * 100,
    y: seededRandom(i * 2 + 200) * 100,
    size: seededRandom(i * 3 + 200) * 3 + 1,
    duration: seededRandom(i * 4 + 200) * 20 + 10,
    delay: seededRandom(i * 5 + 200) * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated rings emanating from center
function PulsingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-red-500/20"
          initial={{ width: 100, height: 100, opacity: 0.5 }}
          animate={{
            width: [100, 800],
            height: [100, 800],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating geometric shapes - professional tech aesthetic
function FloatingShapes() {
  const shapes = [
    { type: 'hexagon', x: 8, y: 15, size: 60, rotation: 0 },
    { type: 'circle', x: 88, y: 12, size: 40, rotation: 0 },
    { type: 'square', x: 5, y: 65, size: 35, rotation: 45 },
    { type: 'hexagon', x: 92, y: 70, size: 50, rotation: 30 },
    { type: 'triangle', x: 12, y: 40, size: 30, rotation: 0 },
    { type: 'circle', x: 85, y: 45, size: 25, rotation: 0 },
    { type: 'square', x: 3, y: 85, size: 20, rotation: 15 },
    { type: 'triangle', x: 95, y: 25, size: 35, rotation: 180 },
  ];

  const renderShape = (type: string, size: number) => {
    switch (type) {
      case 'hexagon':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,2 95,25 95,75 50,98 5,75 5,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        );
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        );
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        );
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 95,95 5,95"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500/10"
          style={{ 
            left: `${shape.x}%`, 
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.05, 0.15, 0.05],
            rotate: [shape.rotation, shape.rotation + 10, shape.rotation],
          }}
          transition={{
            duration: 6 + i * 0.8,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape.type, shape.size)}
        </motion.div>
      ))}
      
      {/* Floating connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <motion.line
          x1="10%"
          y1="20%"
          x2="30%"
          y2="40%"
          stroke="#dc2626"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line
          x1="70%"
          y1="15%"
          x2="90%"
          y2="35%"
          stroke="#dc2626"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.line
          x1="5%"
          y1="70%"
          x2="25%"
          y2="85%"
          stroke="#dc2626"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.line
          x1="75%"
          y1="60%"
          x2="95%"
          y2="80%"
          stroke="#dc2626"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        />
      </svg>
      
      {/* Small floating dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-red-500/20"
          style={{
            left: `${10 + seededRandom(i * 1 + 300) * 80}%`,
            top: `${10 + seededRandom(i * 2 + 300) * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + seededRandom(i * 3 + 300) * 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Magnetic button with spectacular effects
function SpectacularCTAButton({ children, href }: { children: React.ReactNode; href: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic effect
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    
    x.set(deltaX);
    y.set(deltaY);
    
    // Mouse position for gradient
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden group"
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.3), transparent 50%)`,
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur-lg"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: isHovered 
            ? '0 0 30px rgba(239, 68, 68, 0.5), inset 0 0 20px rgba(255,255,255,0.1)'
            : '0 0 15px rgba(239, 68, 68, 0.3)',
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <motion.svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{
            x: isHovered ? [0, 5, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </span>
      
      {/* Particle burst on hover */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 60,
                y: Math.sin((i * Math.PI * 2) / 8) * 30,
                opacity: [1, 0],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.a>
  );
}

// Animated text reveal
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const words = children.split(' ');
  
  return (
    <span ref={ref} className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Countdown urgency element
function UrgencyCounter() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-red-500"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span>Limited availability this week</span>
      <span className="font-mono font-bold text-red-300">
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    </motion.div>
  );
}

// Main Final CTA Section
export default function FinalCTASection() {
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
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Multi-layer background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/50 via-[#0a0a0a] to-[#0a0a0a]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Pulsing rings */}
      <PulsingRings />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Main content */}
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10"
        style={{ scale, opacity, y }}
      >
        {/* Urgency counter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <UrgencyCounter />
        </motion.div>
        
        {/* Main headline */}
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RevealText delay={0.3}>Ready to build</RevealText>
          <br />
          <span className="relative inline-block mt-2">
            <motion.span
              className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <RevealText delay={0.5}>what's next?</RevealText>
            </motion.span>
            
            {/* Sparkle decorations */}
            <motion.span
              className="absolute -top-4 -right-8 text-2xl"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -left-6 text-xl text-orange-400"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ✦
            </motion.span>
          </span>
        </motion.h2>
        
        {/* Subheadline */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A <span className="text-white font-semibold">30-minute conversation</span> costs you nothing 
          but could <span className="text-red-400 font-semibold">change everything</span>. 
          <br className="hidden md:block" />
          Let's talk about what's possible.
        </motion.p>
        
        {/* Value propositions */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: '✓', text: 'No commitment required' },
            { icon: '✓', text: 'Custom strategy for your needs' },
            { icon: '✓', text: 'Clear pricing, no surprises' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">
                {item.icon}
              </span>
              <span className="text-sm md:text-base">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            type: 'spring',
            stiffness: 100
          }}
        >
          <SpectacularCTAButton href="/book">
            Schedule a Free Strategy Call
          </SpectacularCTAButton>
        </motion.div>
        
        {/* Trust signals */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Trusted by 50+ companies</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9/5 client satisfaction</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Response within 24 hours</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
