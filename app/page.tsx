'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GlowButton,
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard,
  SpotlightCard
} from '@/components/ui';

export default function Home() {
  const steps = [
    {
      step: '1',
      title: 'Strategy Call',
      description:
        "30 minutes. No pitch deck. Just a conversation about what you're trying to accomplish and whether we can help."
    },
    {
      step: '2',
      title: 'Custom Plan',
      description:
        'We design a solution—video, web, or both—tailored to your actual needs. Not a template with your logo slapped on.'
    },
    {
      step: '3',
      title: 'Build & Launch',
      description:
        'We execute fast. You get modern infrastructure that performs. Not a plan for infrastructure—actual infrastructure.'
    }
  ];

  const benefits = [
    {
      emoji: '⚡',
      title: 'Speed',
      description:
        "Timelines measured in days and weeks, not quarters. We delivered a 10-minute training video in 10 days. What's your deadline?"
    },
    {
      emoji: '📈',
      title: 'Scale',
      description:
        'Create 50 videos or rebuild your entire web presence—without proportional cost or the proportional headache.'
    },
    {
      emoji: '🎯',
      title: 'Results',
      description:
        'Infrastructure designed to convert, track, and prove ROI. Not just "it looks nice"—actual measurable outcomes.'
    },
    {
      emoji: '🔮',
      title: 'Future-Proof',
      description:
        "Built on modern technology that's ready for AI search, AI integrations, and whatever comes next. No rebuilding in two years."
    },
    {
      emoji: '🤝',
      title: 'Partnership',
      description: 'Responsive humans who actually answer emails. Radical concept, we know.'
    },
    {
      emoji: '💰',
      title: 'Value',
      description: 'Enterprise-grade capability without enterprise-grade budgets or enterprise-grade bureaucracy.'
    }
  ];

  const trustMetrics = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10', label: 'Day Avg. Delivery' },
    { value: '5+', label: 'Years Experience' }
  ];

  const testimonials = [
    {
      quote: 'Revenue up 240% in 8 months.',
      name: 'Managing Partner',
      title: '50-attorney law firm'
    },
    {
      quote: 'Employee handbook turned into a podcast series with 89% completion.',
      name: 'COO',
      title: 'Regional healthcare network'
    },
    {
      quote: 'Sales cycles shortened 40% with a leaner team.',
      name: 'CMO',
      title: 'B2B project management platform'
    },
    {
      quote: 'AI agents now handle 80% of customer questions instantly.',
      name: 'Director of Customer Success',
      title: 'Enterprise services team'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium tracking-wide">
                AI-powered video, training, and web infrastructure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <BlurText text="Create faster. Perform better." className="text-white" />
              <span className="block mt-2">
                <GradientText>Get discovered everywhere.</GradientText>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              <span className="text-white font-medium">Built for humans.</span>{' '}
              <span className="text-red-500 font-medium">Optimized for AI.</span>{' '}
              <span className="text-gray-300 font-medium">Designed to convert.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="#how-it-works" variant="primary" size="lg" glowColor="red">
                See How It Works
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </GlowButton>
              <GlowButton href="/book" variant="outline" size="lg" glowColor="red">
                Schedule a Call
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section id="impact-container" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Two ways we help you <GradientText>win.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6">
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
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6">
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The old way isn&apos;t working <GradientText>anymore.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 leading-relaxed mb-6">
              Your training videos live in six different folders. Your website runs on prayers and plugins.
              Every new content request gets the same answer: <span className="text-gray-300 italic">&quot;maybe next quarter.&quot;</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              Meanwhile, your competitors figured out AI infrastructure <span className="text-red-500 font-semibold">6 months ago.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <AnimatedCard className="p-6 md:p-8">
              <p className="text-lg md:text-xl text-white font-medium">
                The companies that figure this out first will have an advantage that <span className="text-red-400 font-bold">compounds</span>.
                The window is open now—but it won&apos;t stay open forever.
              </p>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple process. <GradientText>Serious results.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center text-lg font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <GlowButton href="/book" variant="primary" size="lg">
              Schedule a Free Strategy Call
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </GlowButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What changes when you <GradientText>work with us.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <div className="text-3xl mb-4">{benefit.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by companies ready to <GradientText>move forward.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 py-6 rounded-2xl bg-gray-900/30 border border-gray-800/50">
              {trustMetrics.map((metric, index) => (
                <div key={metric.label} className="text-center px-6 py-4">
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-gray-500 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.quote} delay={index * 0.05}>
                <SpotlightCard className="p-8 h-full">
                  <p className="text-lg md:text-xl text-gray-300 italic mb-8 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to build <GradientText>what&apos;s next?</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              A <span className="text-white font-semibold">30-minute conversation</span> costs you nothing but could{' '}
              <span className="text-red-400 font-semibold">change everything</span>. Let&apos;s talk about what&apos;s possible.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                'No commitment required',
                'Custom strategy for your needs',
                'Clear pricing, no surprises'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span className="text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlowButton href="/book" variant="primary" size="lg">
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
