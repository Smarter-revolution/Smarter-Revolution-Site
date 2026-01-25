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

export default function CustomPortalsPage() {
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
              Solutions / Custom Portals & Systems
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText text="Off-the-shelf doesn't fit?" className="text-white" />
              <span className="block mt-2"><GradientText>We'll build exactly what you need.</GradientText></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Sometimes your business needs something that doesn't exist yet. Custom portals, specialized workflows, unique systems—built for how your business actually works.
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
              'Generic platforms that almost work—but not quite',
              'Cobbled-together tools that don\'t talk to each other',
              'Workarounds that have become permanent "solutions"',
              'Enterprise software that costs more than it\'s worth',
              'Custom dev quotes that make you cry'
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

      {/* The Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Custom development that makes <GradientText>sense.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '70% Proven / 30% Custom',
                description: 'We don\'t build from scratch every time. Our framework handles the common stuff—you pay for customization, not reinventing wheels.'
              },
              {
                title: 'Modern Architecture',
                description: 'Built on technology that\'s fast, secure, and ready for whatever comes next. Not legacy code that fights the future.'
              },
              {
                title: 'Integration-Ready',
                description: 'Connects to your existing systems—CRM, ERP, marketing tools, whatever you\'re running.'
              },
              {
                title: 'Mid-Market Economics',
                description: 'Enterprise-grade capability without enterprise-grade budgets or enterprise-grade timelines.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-6 h-full">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portals and systems that <GradientText>fit your business.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Training Portals', description: 'Custom learning environments for employees, partners, or customers.' },
              { icon: '🤝', title: 'Partner Portals', description: 'Channel enablement platforms with resources, training, and tracking.' },
              { icon: '👥', title: 'Customer Portals', description: 'Self-service destinations for support, resources, and account management.' },
              { icon: '📖', title: 'Internal Knowledge Bases', description: 'Searchable repositories for company knowledge and documentation.' },
              { icon: '🛒', title: 'E-Commerce Solutions', description: 'Custom storefronts, B2B ordering systems, subscription platforms.' },
              { icon: '⚙️', title: 'Custom Web Applications', description: 'Calculators, configurators, dashboards, workflow tools—whatever you need.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full Development Capabilities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Full development <GradientText>capabilities.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              We're not just a portal shop. If your project needs it, we can build it.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'E-commerce integration',
              'CRM connections (Salesforce, HubSpot, etc.)',
              'ERP integration',
              'Marketing automation',
              'Social media integration',
              'AI and machine learning features',
              'Custom APIs',
              'Data visualization dashboards'
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.03}>
                <AnimatedCard className="p-4 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-300">{item}</span>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Build Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How we build <GradientText>custom systems.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Discovery', description: 'We learn how your business actually works. Not how you think it should work—how it works.' },
              { step: '2', title: 'Specification', description: 'We define exactly what we\'re building. Clear scope, clear deliverables, clear timeline.' },
              { step: '3', title: 'Development', description: 'We build it. You see progress. No disappearing into a cave for six months.' },
              { step: '4', title: 'Testing', description: 'We break it before you do. Thorough testing, real-world scenarios.' },
              { step: '5', title: 'Launch', description: 'Smooth deployment. Training for your team. Documentation that\'s actually useful.' },
              { step: '6', title: 'Support', description: 'We don\'t disappear after launch. Ongoing support, updates, improvements.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-5 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to build something <GradientText>custom?</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10">
              Let's talk about what you need and whether we're the right partner to build it.
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
