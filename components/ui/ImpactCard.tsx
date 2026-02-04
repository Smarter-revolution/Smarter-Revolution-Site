'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, ReactNode } from 'react';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

interface ImpactCardProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  delay?: number;
  spotlightColor?: string;
}

// Dust particle component
function DustParticle({ 
  index, 
  direction 
}: { 
  index: number; 
  direction: 'left' | 'right';
}) {
  const angle = (index / 12) * Math.PI * 2;
  const distance = 50 + seededRandom(index * 1 + 1200) * 100;
  const size = 2 + seededRandom(index * 2 + 1200) * 4;
  const duration = 0.4 + seededRandom(index * 3 + 1200) * 0.3;
  
  // Particles spread from the impact side
  const spreadDirection = direction === 'left' ? 1 : -1;
  const xOffset = Math.cos(angle) * distance * spreadDirection;
  const yOffset = Math.sin(angle) * distance;
  
  return (
    <motion.div
      className="absolute rounded-full bg-red-500/80"
      style={{
        width: size,
        height: size,
        left: direction === 'left' ? '0%' : '100%',
        top: '50%',
      }}
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: 0,
        y: 0
      }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
        x: xOffset,
        y: yOffset
      }}
      transition={{
        duration: duration,
        ease: 'easeOut',
        delay: seededRandom(index * 4 + 1200) * 0.1
      }}
    />
  );
}

// Shockwave ring effect
function ShockwaveRing({ direction }: { direction: 'left' | 'right' }) {
  return (
    <motion.div
      className="absolute border-2 border-red-500/50 rounded-full"
      style={{
        left: direction === 'left' ? '0%' : '100%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ 
        width: 0, 
        height: 0, 
        opacity: 0.8 
      }}
      animate={{ 
        width: 200, 
        height: 200, 
        opacity: 0 
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut'
      }}
    />
  );
}

// Impact flash effect
function ImpactFlash({ direction }: { direction: 'left' | 'right' }) {
  return (
    <motion.div
      className="absolute w-20 h-20 rounded-full"
      style={{
        left: direction === 'left' ? '-10px' : 'auto',
        right: direction === 'right' ? '-10px' : 'auto',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(220,38,38,0) 70%)',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  );
}

// Debris particles (larger chunks)
function DebrisParticle({ 
  index, 
  direction 
}: { 
  index: number; 
  direction: 'left' | 'right';
}) {
  const angle = -Math.PI/4 + (seededRandom(index * 1 + 1300) * Math.PI/2); // Spread upward
  const distance = 30 + seededRandom(index * 2 + 1300) * 60;
  const size = 4 + seededRandom(index * 3 + 1300) * 6;
  const rotation = seededRandom(index * 4 + 1300) * 360;
  
  const spreadDirection = direction === 'left' ? 1 : -1;
  const xOffset = Math.cos(angle) * distance * spreadDirection;
  const yOffset = -Math.abs(Math.sin(angle) * distance); // Always go up initially
  
  return (
    <motion.div
      className="absolute bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm"
      style={{
        width: size,
        height: size * 0.6,
        left: direction === 'left' ? '0%' : '100%',
        top: '50%',
      }}
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: 0,
        y: 0,
        rotate: 0
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        x: [0, xOffset * 0.5, xOffset],
        y: [0, yOffset, yOffset + 50], // Fall down after rising
        rotate: rotation
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        times: [0, 0.2, 0.6, 1]
      }}
    />
  );
}

export default function ImpactCard({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  spotlightColor = 'rgba(220, 38, 38, 0.15)',
}: ImpactCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasImpacted, setHasImpacted] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  
  // Spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  useEffect(() => {
    if (isInView && !hasImpacted) {
      // Trigger impact effects after the card lands
      const timer = setTimeout(() => {
        setHasImpacted(true);
        setShowEffects(true);
        
        // Hide effects after animation completes
        setTimeout(() => setShowEffects(false), 800);
      }, (delay + 0.5) * 1000); // 0.5s is the flight duration
      
      return () => clearTimeout(timer);
    }
  }, [isInView, hasImpacted, delay]);
  
  const flyDistance = direction === 'left' ? -300 : 300;
  
  return (
    <div ref={ref} className="relative">
      {/* Impact effects container */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          {/* Flash */}
          <ImpactFlash direction={direction} />
          
          {/* Shockwave rings */}
          <ShockwaveRing direction={direction} />
          
          {/* Dust particles */}
          {[...Array(15)].map((_, i) => (
            <DustParticle key={`dust-${i}`} index={i} direction={direction} />
          ))}
          
          {/* Debris particles */}
          {[...Array(8)].map((_, i) => (
            <DebrisParticle key={`debris-${i}`} index={i} direction={direction} />
          ))}
        </div>
      )}
      
      {/* Main card */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm ${className}`}
        onMouseMove={handleMouseMove}
        initial={{ 
          x: flyDistance,
          opacity: 0,
          scale: 0.8,
          rotateY: direction === 'left' ? -15 : 15,
        }}
        animate={isInView ? { 
          x: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
        } : {}}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: delay,
        }}
        // Shake effect on impact
        style={{
          animation: hasImpacted ? 'shake 0.3s ease-out' : 'none',
        }}
      >
        {/* Spotlight gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
      
      {/* CSS for shake animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-3px) translateY(-2px); }
          20% { transform: translateX(3px) translateY(1px); }
          30% { transform: translateX(-2px) translateY(-1px); }
          40% { transform: translateX(2px) translateY(1px); }
          50% { transform: translateX(-1px) translateY(0); }
          60% { transform: translateX(1px) translateY(0); }
        }
      `}</style>
    </div>
  );
}
