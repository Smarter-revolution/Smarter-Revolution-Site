'use client';

import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Animated connecting line between steps
function ConnectingLine({ progress }: { progress: number }) {
  return (
    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0">
      <div className="relative w-full h-full">
        {/* Background line */}
        <div className="absolute inset-0 bg-gray-800 rounded-full" />
        
        {/* Animated progress line */}
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full"
          style={{ 
            width: `${Math.min(100, progress * 100)}%`,
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
          }}
        />
        
        {/* Glowing dot at the end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"
          style={{ 
            left: `${Math.min(98, progress * 100)}%`,
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4)'
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

// Step card with 3D flip effect
function StepCard({ 
  step, 
  title, 
  description, 
  icon,
  index,
  progress
}: { 
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  progress: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };
  
  // Earlier activation - each step triggers at 0%, 20%, 40% progress
  const stepProgress = Math.max(0, Math.min(1, (progress - index * 0.2) / 0.25));
  
  return (
    <motion.div
      ref={cardRef}
      className="relative z-10"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: stepProgress > 0.3 ? 1 : 0.3,
        y: stepProgress > 0.3 ? 0 : 50,
        rotateX: stepProgress > 0.3 ? 0 : -15,
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 overflow-hidden group cursor-pointer"
        animate={{
          rotateY: isHovered ? mousePosition.x * 10 : 0,
          rotateX: isHovered ? -mousePosition.y * 10 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(239, 68, 68, 0.15), transparent 40%)`,
          }}
        />
        
        {/* Glow border on active */}
        {stepProgress > 0.8 && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              boxShadow: 'inset 0 0 30px rgba(239, 68, 68, 0.1), 0 0 30px rgba(239, 68, 68, 0.2)',
            }}
          />
        )}
        
        {/* Step number badge */}
        <motion.div 
          className="absolute -top-3 -right-3 w-14 h-14 rounded-full flex items-center justify-center text-xl font-black"
          style={{
            background: stepProgress > 0.5 
              ? 'linear-gradient(135deg, #dc2626, #f97316)' 
              : 'linear-gradient(135deg, #374151, #1f2937)',
            boxShadow: stepProgress > 0.5 
              ? '0 0 30px rgba(239, 68, 68, 0.5)' 
              : 'none',
          }}
          animate={stepProgress > 0.5 ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white">{step}</span>
        </motion.div>
        
        {/* Icon with glow */}
        <motion.div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
          style={{
            background: stepProgress > 0.5 
              ? 'linear-gradient(135deg, #dc2626, #991b1b)' 
              : 'linear-gradient(135deg, #374151, #1f2937)',
          }}
          animate={stepProgress > 0.8 ? {
            boxShadow: [
              '0 0 0px rgba(239, 68, 68, 0)',
              '0 0 30px rgba(239, 68, 68, 0.6)',
              '0 0 0px rgba(239, 68, 68, 0)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <div className="text-white">{icon}</div>
          
          {/* Particle burst on activation */}
          {stepProgress > 0.7 && stepProgress < 0.9 && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 8) * Math.PI * 2) * 40,
                    y: Math.sin((i / 8) * Math.PI * 2) * 40,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Content */}
        <motion.h3 
          className="text-2xl font-bold text-white mb-3"
          animate={{
            color: stepProgress > 0.5 ? '#ffffff' : '#9ca3af',
          }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-400 leading-relaxed"
          animate={{
            color: stepProgress > 0.5 ? '#9ca3af' : '#6b7280',
          }}
        >
          {description}
        </motion.p>
        
        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-b-2xl"
          initial={{ width: 0 }}
          animate={{ width: stepProgress > 0.5 ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Floating particles background
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1 + 400) * 100,
    y: seededRandom(i * 2 + 400) * 100,
    size: 2 + seededRandom(i * 3 + 400) * 3,
    duration: 3 + seededRandom(i * 4 + 400) * 4,
    delay: seededRandom(i * 5 + 400) * 2,
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Main Process Section
export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: false, margin: '100px' }); // Trigger earlier
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start 0.9', 'start 0.2'] // Start when section is 90% from top, complete when 20% from top
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Faster response
    damping: 25,
  });
  
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isMounted) return;
    const unsubscribe = smoothProgress.on('change', (v) => {
      // Direct mapping - animations start immediately when section comes into view
      setProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress, isMounted]);
  
  const steps = [
    {
      step: '1',
      title: 'Strategy Call',
      description: "30 minutes. No pitch deck. Just a conversation about what you're trying to accomplish and whether we can help.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      step: '2',
      title: 'Custom Plan',
      description: "We design a solution—video, web, or both—tailored to your actual needs. Not a template with your logo slapped on.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      step: '3',
      title: 'Build & Launch',
      description: "We execute fast. You get modern infrastructure that performs. Not a plan for infrastructure—actual infrastructure.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background effects */}
      <FloatingParticles />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Simple process.{' '}
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Serious results.
              </span>
              
              {/* Underline animation */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.span>
          </motion.h2>
          
          {/* Progress indicator */}
          <motion.div 
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                animate={{
                  backgroundColor: progress > (i + 1) * 0.2 ? '#dc2626' : '#374151',
                  scale: progress > i * 0.2 && progress < (i + 1) * 0.2 + 0.1 ? 1.3 : 1,
                  boxShadow: progress > (i + 1) * 0.2 
                    ? '0 0 15px rgba(220, 38, 38, 0.6)' 
                    : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Steps container */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-32 left-[15%] right-[15%] z-0">
            <ConnectingLine progress={progress} />
          </div>
          
          {/* Step cards */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                index={index}
                progress={progress}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && progress > 0.5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/book">
            <motion.button
              className="relative px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Free Strategy Call
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      {/* CSS for gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
