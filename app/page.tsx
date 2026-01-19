'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GlowButton, 
  SpotlightCard, 
  CountUp, 
  Particles, 
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard
} from '@/components/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GridPattern 
            className="opacity-30" 
            squares={[[1, 1], [3, 3], [5, 2], [7, 4], [2, 6], [6, 7]]} 
          />
          <Particles quantity={40} color="#dc2626" size={1.5} speed={0.3} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              AI-powered video, training, and web infrastructure
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
            <BlurText 
              text="Create faster." 
              className="text-white block"
              delay={0.2}
            />
            <BlurText 
              text="Perform better." 
              className="text-white block"
              delay={0.4}
            />
            <BlurText 
              text="Get discovered everywhere." 
              className="block"
              delay={0.6}
            />
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            <span className="text-white font-medium">Built for humans.</span>{' '}
            <span className="text-red-500">Optimized for AI.</span>{' '}
            <span className="text-gray-300">Designed to convert.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <GlowButton href="#how-it-works" variant="outline" size="lg">
              See How It Works
              <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </GlowButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-red-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Two Paths Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Two ways we help you <GradientText>win.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Path 1: Video Production */}
            <SpotlightCard className="p-8 md:p-10 group">
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
            </SpotlightCard>

            {/* Path 2: Web Development */}
            <SpotlightCard className="p-8 md:p-10 group">
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
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              The old way isn't working <GradientText>anymore.</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              Your training videos live in six different folders. Your website runs on prayers and plugins. 
              Every new content request gets the same answer: <span className="text-white">"maybe next quarter."</span>
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Meanwhile, your competitors figured out AI infrastructure six months ago.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="p-6 rounded-2xl border border-red-600/30 bg-red-600/5">
              <p className="text-lg md:text-xl text-white font-medium">
                The companies that figure this out first will have an advantage that compounds. 
                The window is open now—<span className="text-red-500">but it won't stay open forever.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple process. <GradientText>Serious results.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: '1',
                title: 'Strategy Call',
                description: '30 minutes. No pitch deck. Just a conversation about what you\'re trying to accomplish and whether we can help.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              },
              {
                step: '2',
                title: 'Custom Plan',
                description: 'We design a solution—video, web, or both—tailored to your actual needs. Not a template with your logo slapped on.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              },
              {
                step: '3',
                title: 'Build & Launch',
                description: 'We execute fast. You get modern infrastructure that performs. Not a plan for infrastructure—actual infrastructure.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-6 text-white">
                    {item.icon}
                  </div>
                  <div className="text-sm text-red-500 font-bold mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center">
            <GlowButton href="/contact" variant="primary" size="lg">
              Schedule a Free Strategy Call
            </GlowButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What changes when you <GradientText>work with us.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Speed',
                description: 'Timelines measured in days and weeks, not quarters. We delivered a 10-minute training video in 10 days. What\'s your deadline?'
              },
              {
                icon: '📈',
                title: 'Scale',
                description: 'Create 50 videos or rebuild your entire web presence—without proportional cost or the proportional headache.'
              },
              {
                icon: '🎯',
                title: 'Results',
                description: 'Infrastructure designed to convert, track, and prove ROI. Not just "it looks nice"—actual measurable outcomes.'
              },
              {
                icon: '🔮',
                title: 'Future-Proof',
                description: 'Built on modern technology that\'s ready for AI search, AI integrations, and whatever comes next. No rebuilding in two years.'
              },
              {
                icon: '🤝',
                title: 'Partnership',
                description: 'Responsive humans who actually answer emails. Radical concept, we know.'
              },
              {
                icon: '💰',
                title: 'Value',
                description: 'Enterprise-grade capability without enterprise-grade budgets or enterprise-grade bureaucracy.'
              }
            ].map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by companies ready to <GradientText>move forward.</GradientText>
            </h2>
          </ScrollReveal>

          {/* Logo placeholders */}
          <ScrollReveal className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-32 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm">
                Logo {i}
              </div>
            ))}
          </ScrollReveal>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: '[Placeholder: Testimonial about video production speed, quality, or impact.]',
                name: '[Name]',
                title: '[Title], [Company]'
              },
              {
                quote: '[Placeholder: Testimonial about web development, AI-readiness, or partnership experience.]',
                name: '[Name]',
                title: '[Title], [Company]'
              }
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-8">
                  <svg className="w-10 h-10 text-red-600/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg text-gray-300 italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to build <GradientText>what's next?</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              A 30-minute conversation costs you nothing but could change everything. 
              Let's talk about what's possible.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <GlowButton href="/contact" variant="primary" size="lg">
              Schedule a Free Strategy Call
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </GlowButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
