'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Glitch text effect
function GlitchText({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: string; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        // Stop glitching after animation
        setTimeout(() => setIsGlitching(false), 1500);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);
  
  return (
    <span 
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{
        animation: isGlitching ? 'glitch 0.3s ease-in-out infinite' : 'none',
      }}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 opacity-70 z-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-2px, -1px)',
              animation: 'glitchTop 0.3s ease-in-out infinite',
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 text-cyan-500 opacity-70 z-0"
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(2px, 1px)',
              animation: 'glitchBottom 0.3s ease-in-out infinite',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Typewriter with deletion effect - like correcting mistakes
function TypeDeleteType({ 
  wrongText, 
  correctText,
  className = '',
  delay = 0
}: { 
  wrongText: string;
  correctText: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'retyping' | 'done'>('typing');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    if (!isInView) return;
    
    const startDelay = setTimeout(() => {
      let index = 0;
      
      // Phase 1: Type wrong text
      const typeWrong = setInterval(() => {
        if (index <= wrongText.length) {
          setDisplayText(wrongText.slice(0, index));
          index++;
        } else {
          clearInterval(typeWrong);
          // Pause, then delete
          setTimeout(() => {
            setPhase('deleting');
            let delIndex = wrongText.length;
            const deleteText = setInterval(() => {
              if (delIndex >= 0) {
                setDisplayText(wrongText.slice(0, delIndex));
                delIndex--;
              } else {
                clearInterval(deleteText);
                // Pause, then retype correct
                setTimeout(() => {
                  setPhase('retyping');
                  let retypeIndex = 0;
                  const retypeText = setInterval(() => {
                    if (retypeIndex <= correctText.length) {
                      setDisplayText(correctText.slice(0, retypeIndex));
                      retypeIndex++;
                    } else {
                      clearInterval(retypeText);
                      setPhase('done');
                      setTimeout(() => setShowCursor(false), 1000);
                    }
                  }, 60);
                }, 200);
              }
            }, 40);
          }, 800);
        }
      }, 80);
      
      return () => clearInterval(typeWrong);
    }, delay * 1000);
    
    return () => clearTimeout(startDelay);
  }, [isInView, wrongText, correctText, delay]);
  
  return (
    <span ref={ref} className={className}>
      <span className={phase === 'deleting' ? 'text-red-500/70 line-through' : ''}>
        {displayText}
      </span>
      {showCursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-red-500 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

// Scattered folder icons that come together
function ScatteredFolders({ active }: { active: boolean }) {
  const folders = [
    { x: -150, y: -80, rotate: -25, delay: 0 },
    { x: 120, y: -60, rotate: 15, delay: 0.1 },
    { x: -100, y: 50, rotate: -10, delay: 0.2 },
    { x: 80, y: 70, rotate: 20, delay: 0.15 },
    { x: -50, y: -100, rotate: 5, delay: 0.25 },
    { x: 150, y: 30, rotate: -15, delay: 0.05 },
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {folders.map((folder, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 text-red-500/20"
          initial={{ 
            x: folder.x, 
            y: folder.y, 
            rotate: folder.rotate,
            opacity: 0,
            scale: 0.5
          }}
          animate={active ? { 
            x: folder.x * 0.3, 
            y: folder.y * 0.3, 
            rotate: folder.rotate * 0.5,
            opacity: [0, 0.3, 0.2],
            scale: [0.5, 1, 0.9]
          } : {}}
          transition={{
            duration: 2,
            delay: folder.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Warning pulse effect
function WarningPulse({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.1, 0] }}
      transition={{ duration: 2, repeat: 3, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-red-600/10" />
    </motion.div>
  );
}

// Countdown timer visual
function UrgencyCounter({ active }: { active: boolean }) {
  const [count, setCount] = useState(100);
  
  useEffect(() => {
    if (!active) return;
    
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 50);
    
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active]);
  
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute top-4 right-4 font-mono text-red-500/30 text-6xl font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0.2, 0] }}
      transition={{ duration: 5, ease: 'linear' }}
    >
      {count}%
    </motion.div>
  );
}

// Static noise overlay
function StaticNoise({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.05, 0.02, 0.04, 0] }}
      transition={{ duration: 3, ease: 'linear' }}
    />
  );
}

// Broken/cracked line effect
function CrackLines({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
      <motion.path
        d="M 0 50% L 20% 48% L 35% 52% L 50% 45% L 65% 55% L 80% 50% L 100% 48%"
        stroke="rgba(239, 68, 68, 0.3)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.5, 0.3] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.path
        d="M 50% 0 L 48% 25% L 53% 40% L 47% 60% L 52% 80% L 50% 100%"
        stroke="rgba(239, 68, 68, 0.2)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.4, 0.2] }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

// Main Problem Section Component
export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const [effectsActive, setEffectsActive] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setEffectsActive(true), 500);
    }
  }, [isInView]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"
        style={{ y: backgroundY }}
      />
      
      {/* Warning effects */}
      <WarningPulse active={effectsActive} />
      <StaticNoise active={effectsActive} />
      <CrackLines active={effectsActive} />
      <UrgencyCounter active={effectsActive} />
      
      {/* Scattered folders visual */}
      <ScatteredFolders active={effectsActive} />
      
      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        style={{ opacity }}
      >
        {/* Main headline with glitch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            The old way isn't working{' '}
            <GlitchText className="text-red-500" delay={0.5}>
              anymore.
            </GlitchText>
          </h2>
        </motion.div>
        
        {/* Pain points with staggered reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <p className="text-xl text-gray-400 leading-relaxed">
            Your training videos live in{' '}
            <motion.span 
              className="text-red-400 font-semibold"
              animate={effectsActive ? { 
                textShadow: ['0 0 0px transparent', '0 0 10px rgba(239,68,68,0.5)', '0 0 0px transparent']
              } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              six different folders
            </motion.span>
            . Your website runs on{' '}
            <TypeDeleteType 
              wrongText="hopes and dreams" 
              correctText="prayers and plugins"
              className="text-white font-medium"
              delay={1.5}
            />
            . Every new content request gets the same answer:{' '}
            <motion.span
              className="inline-block"
              animate={effectsActive ? { rotate: [0, -2, 2, -1, 0] } : {}}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <span className="text-gray-300 italic">"maybe next quarter."</span>
            </motion.span>
          </p>
        </motion.div>
        
        {/* Competitor callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <p className="text-xl text-gray-400 leading-relaxed">
            Meanwhile, your competitors figured out AI infrastructure{' '}
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Stamp/badge effect */}
              <span className="relative inline-flex items-center">
                {/* Background glow */}
                <motion.span
                  className="absolute inset-0 -m-2 rounded-lg bg-red-500/20 blur-md"
                  animate={effectsActive ? {
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Stamp border */}
                <span className="relative px-3 py-1 border-2 border-red-500 rounded-md bg-red-500/10">
                  <motion.span
                    className="text-red-500 font-black uppercase tracking-wider text-lg"
                    animate={effectsActive ? {
                      textShadow: [
                        '0 0 0px rgba(239,68,68,0)',
                        '0 0 15px rgba(239,68,68,0.8)',
                        '0 0 0px rgba(239,68,68,0)'
                      ]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    6 months ago
                  </motion.span>
                </span>
                
                {/* Corner accents */}
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-red-500" />
                <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-red-500" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-red-500" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-red-500" />
              </span>
            </motion.span>
            .
          </p>
        </motion.div>
        
        {/* Urgency box with special effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Animated border */}
          <motion.div
            className="absolute -inset-[2px] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #dc2626, #f97316, #dc2626)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Content box */}
          <div className="relative p-6 md:p-8 rounded-2xl bg-[#0a0a0a] overflow-hidden">
            {/* Pulsing background */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-red-600/5"
              animate={{
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <p className="text-lg md:text-xl text-white font-medium relative z-10">
              The companies that figure this out first will have an advantage that{' '}
              <motion.span
                className="text-red-400 font-bold"
                animate={effectsActive ? {
                  scale: [1, 1.05, 1],
                  textShadow: ['0 0 0px transparent', '0 0 20px rgba(239,68,68,0.6)', '0 0 0px transparent']
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                compounds
              </motion.span>
              . The window is open now—
              <motion.span
                className="text-red-500 font-bold"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 }}
              >
                but it won't stay open forever.
              </motion.span>
            </p>
          </div>
          
          {/* Closing window visual - positioned outside the box */}
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-full"
            initial={{ scaleX: 1, opacity: 1 }}
            animate={effectsActive ? { 
              scaleX: [1, 0.6, 0.65],
              opacity: [1, 0.8, 0.9]
            } : {}}
            transition={{ duration: 4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>
      </motion.div>
      
      {/* CSS for glitch animations */}
      <style jsx global>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitchTop {
          0%, 100% { transform: translate(-2px, -1px); }
          25% { transform: translate(-3px, 0px); }
          50% { transform: translate(-1px, -2px); }
          75% { transform: translate(-4px, 1px); }
        }
        
        @keyframes glitchBottom {
          0%, 100% { transform: translate(2px, 1px); }
          25% { transform: translate(3px, 0px); }
          50% { transform: translate(1px, 2px); }
          75% { transform: translate(4px, -1px); }
        }
      `}</style>
    </section>
  );
}