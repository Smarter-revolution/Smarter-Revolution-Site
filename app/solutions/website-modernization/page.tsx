'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  GlowButton, 
  SpotlightCard, 
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard
} from '@/components/ui';

export default function WebsiteModernizationPage() {
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium mb-6">
              Solutions / Website & Platform Modernization
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText text="Your website shouldn't require" className="text-white" />
              <span className="block mt-2"><GradientText>prayers and plugins.</GradientText></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              WordPress was fine for 2010. Modern business needs modern infrastructure: fast, secure, AI-ready, and actually designed for where the web is going.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sound <GradientText>familiar?</GradientText>
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              'Site so slow visitors leave before it loads',
              'Plugins that break every time something updates',
              'Security patches that feel like a part-time job',
              '"We can\'t do that" as the answer to every feature request',
              'Design that looked dated three years ago',
              'Not showing up in AI search results'
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-4 flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-gray-300">{item}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Villains Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The platforms holding you <GradientText>back.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'WordPress', issue: 'Plugin hell, security nightmares, performance ceiling' },
              { name: 'Magento', issue: 'Complexity, maintenance burden, scaling problems' },
              { name: 'Squarespace', issue: 'Limited customization, no real integrations' },
              { name: 'Wix', issue: 'SEO limitations, performance issues, feature ceiling' },
              { name: 'Legacy Custom Builds', issue: 'Nobody understands the code, impossible to update' },
              { name: 'Outdated CMS', issue: 'Built for a different era, fighting the future' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.issue}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Modern architecture that <GradientText>actually works.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Speed', description: 'Pages that load before visitors have time to leave.' },
              { icon: '🔒', title: 'Security', description: 'No plugin vulnerabilities, no constant patching.' },
              { icon: '🤖', title: 'AI-Ready', description: 'Structured for AI search and recommendations.' },
              { icon: '🔍', title: 'AI Search Visibility', description: 'Built so AI systems can find and recommend you.' },
              { icon: '📈', title: 'Scalable', description: 'Infrastructure that grows with you, not against you.' },
              { icon: '🔌', title: 'Integrations', description: 'Connect to CRM, ERP, marketing tools—whatever you need.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <SpotlightCard className="p-6 h-full">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Modernization Looks Like Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              This isn't a facelift. It's a <GradientText>foundation replacement.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <AnimatedCard className="p-6 h-full">
                <h3 className="text-xl font-bold text-red-500 mb-4">Before</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span> Slow load times
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span> Plugin dependencies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span> Security vulnerabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span> Limited customization
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">×</span> Invisible to AI search
                  </li>
                </ul>
              </AnimatedCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <AnimatedCard className="p-6 h-full border-red-600/30">
                <h3 className="text-xl font-bold text-green-500 mb-4">After</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span> Sub-second page loads
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span> No plugin dependencies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span> Secure by architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span> Fully customizable
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span> AI-ready and discoverable
                  </li>
                </ul>
              </AnimatedCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Proof that <GradientText>modernization pays off.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: 'Sales cycles shortened 40% with a leaner team.',
                author: 'CMO, B2B project management platform'
              },
              {
                quote: 'Revenue up 240% in 8 months.',
                author: 'Managing Partner, 50-attorney law firm'
              },
              {
                quote: 'AI agents now handle 80% of customer questions instantly.',
                author: 'Director of Customer Success, Enterprise services team'
              },
              {
                quote: 'Employee handbook turned into a podcast series with 89% completion.',
                author: 'COO, Regional healthcare network'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <AnimatedCard className="p-6">
                  <p className="text-gray-200 text-lg italic mb-4">"{item.quote}"</p>
                  <p className="text-gray-500 text-sm">{item.author}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to modernize your <GradientText>web infrastructure?</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10">
              Let's talk about what modern architecture could do for your business.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <GlowButton href="/book" variant="primary" size="lg">
              Schedule a Free Strategy Call
            </GlowButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
