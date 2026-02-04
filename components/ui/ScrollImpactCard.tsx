'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, ReactNode } from 'react';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Soft dust particle - like sand being kicked up
function SoftDustParticle({ 
  startX, 
  startY, 
  delay,
  side,
  seed = 0
}: { 
  startX: string; 
  startY: string; 
  delay: number;
  side: 'top' | 'bottom' | 'left' | 'right';
  seed?: number;
}) {
  const size = 8 + seededRandom(seed * 1 + 500) * 20;
  const duration = 2.5 + seededRandom(seed * 2 + 500) * 1.5; // Much longer duration
  
  // Soft, natural movement - rises then falls slowly
  let xMove = (seededRandom(seed * 3 + 500) - 0.5) * 50;
  let yRise = -30 - seededRandom(seed * 4 + 500) * 50;
  
  if (side === 'left') xMove = -20 - seededRandom(seed * 5 + 500) * 35;
  if (side === 'right') xMove = 20 + seededRandom(seed * 6 + 500) * 35;
  if (side === 'top') yRise = -40 - seededRandom(seed * 7 + 500) * 40;
  if (side === 'bottom') yRise = -20 - seededRandom(seed * 8 + 500) * 30;
  
  // Warm dust colors - sandy, earthy tones
  const colors = [
    'rgba(180, 140, 100, 0.6)',
    'rgba(160, 120, 80, 0.5)',
    'rgba(200, 160, 120, 0.5)',
    'rgba(140, 100, 70, 0.4)',
    'rgba(220, 180, 140, 0.4)',
  ];
  const color = colors[Math.floor(seededRandom(seed * 9 + 500) * colors.length)];
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: startX,
        top: startY,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(2px)',
      }}
      initial={{ 
        opacity: 0.8, 
        scale: 0.3,
        x: 0,
        y: 0,
      }}
      animate={{ 
        opacity: [0.8, 0.7, 0.5, 0.3, 0.1, 0],
        scale: [0.3, 1, 1.2, 1.3, 1.4, 1.5],
        x: [0, xMove * 0.4, xMove * 0.7, xMove * 0.9, xMove],
        y: [0, yRise * 0.6, yRise, yRise + 5, yRise + 15], // Rise then settle very slowly
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Very soft ease out
        times: [0, 0.15, 0.35, 0.6, 0.8, 1]
      }}
    />
  );
}

// Larger billowing dust cloud
function BillowingCloud({ 
  startX, 
  startY, 
  delay,
  direction,
  seed = 0
}: { 
  startX: string; 
  startY: string; 
  delay: number;
  direction: number; // -1 for left, 1 for right, 0 for up
  seed?: number;
}) {
  const size = 40 + seededRandom(seed * 1 + 600) * 60;
  const xMove = direction * (30 + seededRandom(seed * 2 + 600) * 40);
  const duration = 3 + seededRandom(seed * 3 + 600) * 1.5; // Much longer
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size * 0.7,
        left: startX,
        top: startY,
        background: 'radial-gradient(ellipse, rgba(150, 120, 90, 0.4) 0%, rgba(130, 100, 70, 0.2) 40%, transparent 70%)',
        filter: 'blur(4px)',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.2,
        x: 0,
        y: 0,
      }}
      animate={{ 
        opacity: [0, 0.6, 0.5, 0.4, 0.25, 0.1, 0],
        scale: [0.2, 0.8, 1.2, 1.6, 1.9, 2.1, 2.3],
        x: [0, xMove * 0.2, xMove * 0.5, xMove * 0.75, xMove * 0.9, xMove],
        y: [0, -15, -30, -40, -35, -28],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.1, 0.25, 0.45, 0.7, 0.85, 1]
      }}
    />
  );
}

// Fine sand particles - tiny specs
function SandSpeck({ 
  startX, 
  startY, 
  delay,
  seed = 0
}: { 
  startX: string; 
  startY: string; 
  delay: number;
  seed?: number;
}) {
  const size = 2 + seededRandom(seed * 1 + 700) * 4;
  const angle = seededRandom(seed * 2 + 700) * Math.PI * 2;
  const distance = 20 + seededRandom(seed * 3 + 700) * 60;
  const xMove = Math.cos(angle) * distance;
  const yMove = Math.sin(angle) * distance - 30; // Bias upward
  const duration = 1.8 + seededRandom(seed * 4 + 700) * 1.2; // Much longer
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: startX,
        top: startY,
        background: 'rgba(200, 170, 130, 0.8)',
        filter: 'blur(0.5px)',
      }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ 
        opacity: [1, 0.9, 0.7, 0.4, 0.15, 0],
        x: [0, xMove * 0.4, xMove * 0.7, xMove * 0.9, xMove],
        y: [0, yMove * 0.3, yMove * 0.6, yMove + 10, yMove + 25], // Arc up then down slowly
        scale: [1, 0.9, 0.8, 0.6, 0.4],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.2, 0.45, 0.7, 0.9, 1]
      }}
    />
  );
}

// Soft glow pulse on impact - slow fade
function SoftImpactGlow({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        boxShadow: 'inset 0 0 40px rgba(200, 150, 100, 0.3), 0 0 40px rgba(180, 140, 100, 0.2)',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.7, 0.4, 0.15, 0] }}
      transition={{ 
        duration: 2.5, 
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.2, 0.5, 0.8, 1]
      }}
    />
  );
}

// Full impact effect - soft dusty landing
function FullImpactEffect({ active }: { active: boolean }) {
  if (!active) return null;
  
  // Generate soft dust particles around all edges
  const dustParticles: Array<{ x: string; y: string; side: 'top' | 'bottom' | 'left' | 'right'; delay: number }> = [];
  
  // Bottom edge - most particles here (main impact)
  for (let i = 0; i < 20; i++) {
    dustParticles.push({
      x: `${5 + (i / 20) * 90}%`,
      y: '100%',
      side: 'bottom',
      delay: seededRandom(i + 800) * 0.15,
    });
  }
  
  // Top edge
  for (let i = 0; i < 12; i++) {
    dustParticles.push({
      x: `${10 + (i / 12) * 80}%`,
      y: '0%',
      side: 'top',
      delay: seededRandom(i + 820) * 0.12,
    });
  }
  
  // Left edge
  for (let i = 0; i < 10; i++) {
    dustParticles.push({
      x: '0%',
      y: `${10 + (i / 10) * 80}%`,
      side: 'left',
      delay: seededRandom(i + 832) * 0.12,
    });
  }
  
  // Right edge
  for (let i = 0; i < 10; i++) {
    dustParticles.push({
      x: '100%',
      y: `${10 + (i / 10) * 80}%`,
      side: 'right',
      delay: seededRandom(i + 842) * 0.12,
    });
  }
  
  // Billowing clouds at corners and edges
  const clouds = [
    { x: '0%', y: '100%', dir: -1, delay: 0 },
    { x: '100%', y: '100%', dir: 1, delay: 0.05 },
    { x: '50%', y: '100%', dir: 0, delay: 0.02 },
    { x: '25%', y: '100%', dir: -0.5, delay: 0.08 },
    { x: '75%', y: '100%', dir: 0.5, delay: 0.08 },
    { x: '0%', y: '50%', dir: -1, delay: 0.1 },
    { x: '100%', y: '50%', dir: 1, delay: 0.1 },
    { x: '0%', y: '0%', dir: -1, delay: 0.12 },
    { x: '100%', y: '0%', dir: 1, delay: 0.12 },
  ];
  
  // Fine sand specks scattered around
  const sandSpecks: Array<{ x: string; y: string; delay: number }> = [];
  for (let i = 0; i < 40; i++) {
    const edge = Math.floor(seededRandom(i + 900) * 4);
    let x: string, y: string;
    
    switch (edge) {
      case 0: // Top
        x = `${seededRandom(i * 2 + 900) * 100}%`;
        y = '0%';
        break;
      case 1: // Bottom
        x = `${seededRandom(i * 3 + 900) * 100}%`;
        y = '100%';
        break;
      case 2: // Left
        x = '0%';
        y = `${seededRandom(i * 4 + 900) * 100}%`;
        break;
      default: // Right
        x = '100%';
        y = `${seededRandom(i * 5 + 900) * 100}%`;
    }
    
    sandSpecks.push({ x, y, delay: seededRandom(i * 6 + 900) * 0.2 });
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
      {/* Billowing dust clouds */}
      {clouds.map((c, i) => (
        <BillowingCloud
          key={`cloud-${i}`}
          startX={c.x}
          startY={c.y}
          delay={c.delay}
          direction={c.dir}
          seed={i}
        />
      ))}
      
      {/* Soft dust particles */}
      {dustParticles.map((p, i) => (
        <SoftDustParticle
          key={`dust-${i}`}
          startX={p.x}
          startY={p.y}
          delay={p.delay}
          side={p.side}
          seed={i}
        />
      ))}
      
      {/* Fine sand specks */}
      {sandSpecks.map((s, i) => (
        <SandSpeck
          key={`sand-${i}`}
          startX={s.x}
          startY={s.y}
          delay={s.delay}
          seed={i}
        />
      ))}
      
      {/* Soft impact glow */}
      <SoftImpactGlow active={active} />
      
      {/* Subtle edge highlight on impact - slow fade */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: '0 0 0 1px rgba(200, 160, 120, 0.4), 0 0 25px rgba(180, 140, 100, 0.25)',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.8, 0.5, 0.2, 0] }}
        transition={{ 
          duration: 2, 
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.25, 0.55, 0.8, 1]
        }}
      />
    </div>
  );
}

// Soft dust wave - expands outward from all edges
function DustWave({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <>
      {/* Bottom wave - multiple layers for depth */}
      {[0, 0.15, 0.3, 0.5].map((delay, i) => (
        <motion.div
          key={`bottom-${i}`}
          className="absolute left-1/2 bottom-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(180, 140, 100, 0.2) 0%, transparent 70%)',
            transformOrigin: 'bottom center',
            filter: 'blur(4px)',
          }}
          initial={{ 
            width: 0, 
            height: 0, 
            opacity: 0.5,
            x: '-50%',
          }}
          animate={{ 
            width: [0, 300, 500, 600],
            height: [0, 50, 80, 100],
            opacity: [0.5, 0.4, 0.2, 0] 
          }}
          transition={{
            duration: 2.5,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.3, 0.6, 1]
          }}
        />
      ))}
      
      {/* Side waves - slower fade */}
      <motion.div
        className="absolute left-0 top-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(180, 140, 100, 0.15) 0%, transparent 70%)',
          filter: 'blur(4px)',
          transformOrigin: 'left center',
        }}
        initial={{ width: 0, height: 0, opacity: 0.4, y: '-50%' }}
        animate={{ 
          width: [0, 40, 60, 70],
          height: [0, 200, 300, 350],
          opacity: [0.4, 0.3, 0.15, 0] 
        }}
        transition={{ 
          duration: 2.2, 
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.3, 0.6, 1]
        }}
      />
      <motion.div
        className="absolute right-0 top-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right, rgba(180, 140, 100, 0.15) 0%, transparent 70%)',
          filter: 'blur(4px)',
          transformOrigin: 'right center',
        }}
        initial={{ width: 0, height: 0, opacity: 0.4, y: '-50%' }}
        animate={{ 
          width: [0, 40, 60, 70],
          height: [0, 200, 300, 350],
          opacity: [0.4, 0.3, 0.15, 0] 
        }}
        transition={{ 
          duration: 2.2, 
          ease: [0.25, 0.1, 0.25, 1], 
          delay: 0.08,
          times: [0, 0.3, 0.6, 1]
        }}
      />
    </>
  );
}

// Settling dust haze - very slow fade
function SettlingHaze({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.25, 0.2, 0.12, 0.05, 0] }}
      transition={{ 
        duration: 4, 
        ease: [0.25, 0.1, 0.25, 1], 
        times: [0, 0.1, 0.3, 0.55, 0.8, 1] 
      }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          background: 'linear-gradient(to top, rgba(160, 130, 100, 0.12) 0%, transparent 50%)',
          filter: 'blur(10px)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: ['100%', '50%', '60%', '70%', '80%'] }}
        transition={{ 
          duration: 4, 
          ease: [0.25, 0.1, 0.25, 1], 
          times: [0, 0.15, 0.4, 0.7, 1] 
        }}
      />
    </motion.div>
  );
}

// Screen shake effect
function useScreenShake(active: boolean) {
  useEffect(() => {
    if (!active) return;
    
    const container = document.getElementById('impact-container');
    if (!container) return;
    
    container.style.animation = 'screenShake 0.4s ease-out';
    
    const timeout = setTimeout(() => {
      container.style.animation = '';
    }, 400);
    
    return () => clearTimeout(timeout);
  }, [active]);
}

interface ScrollImpactCardProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right';
}

export default function ScrollImpactCard({
  children,
  className = '',
  direction = 'left',
}: ScrollImpactCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasImpacted, setHasImpacted] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Scroll progress for this card
  const { scrollYProgress } = useScroll({
    target: isMounted ? cardRef : undefined,
    offset: ['start end', 'end center']
  });
  
  // Smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });
  
  // Transform values based on scroll - cards fully visible by 60% progress
  const flyDistance = direction === 'left' ? -400 : 400;
  const x = useTransform(smoothProgress, [0, 0.5, 0.6], [flyDistance, flyDistance * 0.05, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.5], [0, 0.7, 1]);
  const scale = useTransform(smoothProgress, [0, 0.5, 0.6], [0.8, 0.98, 1]);
  const rotateY = useTransform(
    smoothProgress, 
    [0, 0.6], 
    [direction === 'left' ? -25 : 25, 0]
  );
  const rotateX = useTransform(smoothProgress, [0, 0.6], [10, 0]);
  
  // Blur effect - completely clear by 50% progress
  const blur = useTransform(smoothProgress, [0, 0.3, 0.5], [8, 2, 0]);
  
  // Track when card lands for impact effect - trigger earlier at 60%
  useEffect(() => {
    if (!isMounted) return;
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest > 0.58 && !hasImpacted) {
        setHasImpacted(true);
        setShowEffects(true);
        
        // Hide effects after all animations complete (4+ seconds)
        setTimeout(() => setShowEffects(false), 4500);
      } else if (latest < 0.5) {
        setHasImpacted(false);
      }
    });
    
    return () => unsubscribe();
  }, [smoothProgress, hasImpacted, isMounted]);
  
  // Screen shake on impact
  useScreenShake(showEffects);
  
  return (
    <div ref={cardRef} className="relative" style={{ perspective: '1000px' }}>
      {/* Impact effects - soft dusty landing like sand */}
      <FullImpactEffect active={showEffects} />
      <DustWave active={showEffects} />
      <SettlingHaze active={showEffects} />
      
      {/* Card */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/90 backdrop-blur-sm ${className}`}
        style={{
          x,
          opacity,
          scale,
          rotateY,
          rotateX,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow on landing */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: hasImpacted 
              ? '0 0 60px rgba(239, 68, 68, 0.4), inset 0 0 60px rgba(239, 68, 68, 0.1)'
              : 'none',
            transition: 'box-shadow 0.3s ease-out'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}

// Section title with spectacular animation
export function SpectacularSectionTitle({ 
  children,
  className = '' 
}: { 
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? ref : undefined,
    offset: ['start end', 'center center']
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });
  
  const y = useTransform(smoothProgress, [0, 1], [100, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  const letterSpacing = useTransform(smoothProgress, [0, 1], ['0.5em', '0em']);
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y, opacity, scale }}
        className="text-center"
      >
        <motion.div style={{ letterSpacing }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Animated gradient background for section
export function AnimatedSectionBackground({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? ref : undefined,
    offset: ['start end', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)',
          left: '10%',
          top: backgroundY,
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
          right: '10%',
          bottom: backgroundY,
        }}
      />
    </motion.div>
  );
}

// CSS for screen shake
export function ScreenShakeStyles() {
  return (
    <style jsx global>{`
      @keyframes screenShake {
        0%, 100% { transform: translateX(0) translateY(0); }
        10% { transform: translateX(-5px) translateY(-3px); }
        20% { transform: translateX(5px) translateY(2px); }
        30% { transform: translateX(-4px) translateY(-2px); }
        40% { transform: translateX(4px) translateY(2px); }
        50% { transform: translateX(-2px) translateY(-1px); }
        60% { transform: translateX(2px) translateY(1px); }
        70% { transform: translateX(-1px) translateY(0); }
        80% { transform: translateX(1px) translateY(0); }
      }
    `}</style>
  );
}
