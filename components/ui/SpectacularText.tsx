'use client';

import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Glitch effect for individual characters
function GlitchChar({ char, delay }: { char: string; delay: number }) {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(true);
  
  useEffect(() => {
    if (char === ' ') {
      setDisplayChar(' ');
      setIsGlitching(false);
      return;
    }
    
    const startDelay = setTimeout(() => {
      let iterations = 0;
      const maxIterations = 8;
      
      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          setDisplayChar(char);
          setIsGlitching(false);
          clearInterval(interval);
          return;
        }
        
        setDisplayChar(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
        iterations++;
      }, 50);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(startDelay);
  }, [char, delay]);
  
  return (
    <span 
      className={`inline-block ${isGlitching ? 'text-red-500' : ''}`}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ffff' 
          : 'none',
        transition: 'text-shadow 0.1s ease'
      }}
    >
      {displayChar}
    </span>
  );
}

// Scramble text effect
function ScrambleText({ 
  text, 
  className = '',
  delay = 0,
  duration = 1.5
}: { 
  text: string; 
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const chars = text.split('');
  
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <GlitchChar 
          key={i} 
          char={char} 
          delay={delay + (i * (duration / chars.length))}
        />
      ))}
    </span>
  );
}

// Magnetic letters that react to mouse
function MagneticLetter({ 
  char, 
  index,
  totalChars
}: { 
  char: string; 
  index: number;
  totalChars: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      const maxDistance = 150;
      const strength = Math.max(0, 1 - distance / maxDistance);
      
      setPosition({
        x: distanceX * strength * 0.15,
        y: distanceY * strength * 0.15
      });
    };
    
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.span
      ref={ref}
      className="inline-block cursor-default"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.2, color: '#ef4444' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

// Wave animation for text
function WaveText({ 
  text, 
  className = '',
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const chars = text.split('');
  
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: delay + i * 0.04,
          }}
        >
          <MagneticLetter char={char} index={i} totalChars={chars.length} />
        </motion.span>
      ))}
    </span>
  );
}

// Typewriter with cursor
function TypewriterText({
  text,
  className = '',
  delay = 0,
  speed = 0.05
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Keep cursor blinking for a bit then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed * 1000);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(startDelay);
  }, [text, delay, speed]);
  
  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-red-500 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

// Gradient text with animated gradient
function AnimatedGradientText({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-red-400 to-red-500 bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

// Reveal text with mask
function RevealText({
  text,
  className = '',
  delay = 0
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.6, 0.01, 0.05, 0.95]
        }}
      >
        <span className={className}>{text}</span>
      </motion.div>
    </div>
  );
}

// Split text with stagger
function SplitRevealText({
  text,
  className = '',
  delay = 0,
  stagger = 0.1
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', rotateX: -80 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.6, 0.01, 0.05, 0.95]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Main spectacular hero component
interface SpectacularHeroTextProps {
  className?: string;
}

export default function SpectacularHeroText({ className = '' }: SpectacularHeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Glow effect following mouse */}
      <div 
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, transparent 70%)',
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Main headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] relative z-10">
        {/* Line 1: Create faster */}
        <div className="overflow-hidden mb-2">
          {isInView && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <WaveText text="Create faster." className="text-white block" delay={0.2} />
            </motion.div>
          )}
        </div>
        
        {/* Line 2: Perform better */}
        <div className="overflow-hidden mb-2">
          {isInView && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <WaveText text="Perform better." className="text-white block" delay={0.5} />
            </motion.div>
          )}
        </div>
        
        {/* Line 3: Get discovered everywhere - with gradient */}
        <div className="overflow-hidden">
          {isInView && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="relative"
            >
              <AnimatedGradientText className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <WaveText text="Get discovered" delay={0.8} />
              </AnimatedGradientText>
              <AnimatedGradientText className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <WaveText text="everywhere." delay={1.2} />
              </AnimatedGradientText>
            </motion.div>
          )}
        </div>
      </h1>
    </div>
  );
}

// Subheadline component with typewriter effect
export function SpectacularSubheadline({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const timers = [
      setTimeout(() => setPhase(1), 1800), // Start "Built for humans"
      setTimeout(() => setPhase(2), 3000), // Start "Optimized for AI"
      setTimeout(() => setPhase(3), 4200), // Start "Designed to convert"
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isInView]);
  
  return (
    <div ref={ref} className={`text-xl md:text-2xl ${className}`}>
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
        {/* Built for humans */}
        <motion.span
          className="text-white font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phase >= 1 && <TypewriterText text="Built for humans." delay={0} speed={0.04} />}
        </motion.span>
        
        {/* Optimized for AI */}
        <motion.span
          className="text-red-500 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phase >= 2 && <TypewriterText text="Optimized for AI." delay={0} speed={0.04} />}
        </motion.span>
        
        {/* Designed to convert */}
        <motion.span
          className="text-gray-300 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phase >= 3 && <TypewriterText text="Designed to convert." delay={0} speed={0.04} />}
        </motion.span>
      </span>
    </div>
  );
}

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Floating particles around text
export function TextParticles({ className = '' }: { className?: string }) {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1 + 100) * 100,
    y: seededRandom(i * 2 + 100) * 100,
    size: 2 + seededRandom(i * 3 + 100) * 4,
    duration: 3 + seededRandom(i * 4 + 100) * 4,
    delay: seededRandom(i * 5 + 100) * 2,
  }));
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
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
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
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
