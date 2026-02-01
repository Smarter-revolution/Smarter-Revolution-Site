'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  GlowButton, 
  SpotlightCard, 
  CountUp, 
  Particles, 
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard,
  NeuralNetwork3D,
  ImpactCard,
  SpectacularHeroText,
  SpectacularSubheadline,
  TextParticles,
  ScrollImpactCard,
  SpectacularSectionTitle,
  AnimatedSectionBackground,
  ScreenShakeStyles,
  ProblemSection,
  ProcessSection,
  BenefitsSection,
  SocialProofSection,
  FinalCTASection,
  HeroBackground
} from '@/components/ui';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [explodedValue, setExplodedValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted before using scroll
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Scroll-based explosion effect - only track when mounted
  const { scrollYProgress } = useScroll({
    target: isMounted ? heroRef : undefined,
    offset: ['start start', 'end start']
  });
  
  // Transform scroll progress to explosion value
  useEffect(() => {
    if (!isMounted) return;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Start exploding after 30% scroll, fully exploded at 80%
      const explosionProgress = Math.max(0, Math.min(1, (latest - 0.3) / 0.5));
      setExplodedValue(explosionProgress);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMounted]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section with Sophisticated Tech Background */}
      <section 
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 pb-24"
      >
        {/* Sophisticated tech background */}
        <HeroBackground />
        
        {/* 3D Neural Network - Subtle layer */}
        <div className="absolute inset-0 z-[2] opacity-25">
          <NeuralNetwork3D 
            className="w-full h-full"
            exploded={explodedValue}
            autoRotate={true}
            interactionEnabled={true}
          />
        </div>
        
        {/* Content overlay for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]/60 z-[3]" />
        
        {/* Hero Content */}
        <div className="relative z-[10] max-w-5xl mx-auto text-center">
          {/* Floating particles around text */}
          <TextParticles className="z-0" />
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 relative z-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              AI-powered video, training, and web infrastructure
            </span>
          </motion.div>

          {/* Main Headline - SPECTACULAR VERSION */}
          <div className="mb-8 relative z-10">
            <SpectacularHeroText />
          </div>

          {/* Subheadline - TYPEWRITER VERSION */}
          <div className="mb-10 max-w-2xl mx-auto relative z-10">
            <SpectacularSubheadline />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pb-20 md:pb-0"
          >
            <GlowButton href="#how-it-works" variant="primary" size="lg" glowColor="red">
              See How It Works
              <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </GlowButton>
            <GlowButton href="/book" variant="outline" size="lg" glowColor="red">
              Schedule a Call
            </GlowButton>
          </motion.div>
        </div>

        {/* Scroll indicator - positioned at very bottom */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          {/* Interactive hint text */}
          <p className="text-xs text-gray-500">
            <span className="hidden md:inline">Drag to rotate • </span>
            Scroll to explore
          </p>
          
          {/* Scroll mouse indicator */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
              <motion.div 
                className="w-1 h-1.5 bg-red-500 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Two Paths Section */}
      <section id="impact-container" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Two ways we help you <GradientText>win.</GradientText>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Path 1: Video Production */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 group hover:border-red-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                AI-Powered Video Production
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Traditional video production has a math problem—one video costs a fortune and takes forever. We fixed the math.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Professional quality without agency budgets',
                  'Days and weeks, not months',
                  'Scalable from 5 videos to 500',
                  'Multilingual without reshooting'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/video-production" 
                className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors group/link"
              >
                Learn more about Video Production
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Path 2: Web Development */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 group hover:border-red-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                AI-Ready Web Development
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                WordPress was great—for 2010. Modern business needs modern infrastructure: fast, secure, and built for where the web is going.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Replace WordPress, Magento, Squarespace',
                  'Optimized for AI search visibility',
                  'Designed to convert, not just exist',
                  'Ready for whatever comes next'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/web-development" 
                className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors group/link"
              >
                Learn more about Web Development
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section - Spectacular Version */}
      <ProblemSection />

      {/* How It Works Section - Spectacular Version */}
      <ProcessSection />

      {/* Benefits Section - Spectacular Version */}
      <BenefitsSection />

      {/* Social Proof Section - Spectacular Version */}
      <SocialProofSection />

      {/* Final CTA Section - Spectacular Version */}
      <FinalCTASection />
    </div>
  );
}
