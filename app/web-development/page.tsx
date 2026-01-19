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

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <BlurText 
                text="Your website was probably built for a world that" 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>doesn't exist anymore.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              WordPress. Magento. Squarespace. They were fine—for 2015. Modern business needs modern infrastructure: 
              <span className="text-white"> fast, secure, AI-ready,</span> and actually designed to convert.
            </p>

            <GlowButton href="/contact" variant="primary" size="lg">
              Discuss Your Project
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* The Platform Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's talk about why your current site is <GradientText>holding you back.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-8 text-center">
              WordPress wasn't built for where the web is going. Neither was Magento. Or Squarespace. 
              Or that custom thing someone built seven years ago that nobody understands anymore.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 rounded-2xl border border-white/10 bg-gray-900/50">
              <p className="text-lg text-gray-400 mb-6">The symptoms are familiar:</p>
              <ul className="space-y-4">
                {[
                  'Plugins that break every time something updates',
                  'Security patches that feel like a part-time job',
                  'Load times that make visitors leave before they arrive',
                  '"We can\'t do that" as the answer to every new request',
                  'A developer relationship that\'s mostly you waiting'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg text-white mt-6">
                Sound familiar? It's not your fault. These platforms were built for a different era. The web moved on. Your infrastructure didn't.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Modern infrastructure for <GradientText>modern business.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Modern Websites',
                description: 'Fast, secure, beautiful—and actually built on technology from this decade. Sites that perform, convert, and don\'t require constant babysitting.',
                icon: '🌐'
              },
              {
                title: 'Training Portals',
                description: 'Give your team one place to go for everything they need. Video content, resources, progress tracking—all in one branded destination.',
                icon: '📚'
              },
              {
                title: 'Partner Portals',
                description: 'Arm your channel with the tools to succeed. Organized resources, training certification, performance tracking—without the enterprise price tag.',
                icon: '🤝'
              },
              {
                title: 'Customer Portals',
                description: 'Self-service that actually serves. Let customers find answers, track progress, and get help—without flooding your support team.',
                icon: '👥'
              },
              {
                title: 'E-Commerce Solutions',
                description: 'Sell online without the platform headaches. Modern storefronts that load fast, convert better, and don\'t fight you on every customization.',
                icon: '🛒'
              },
              {
                title: 'Custom Web Applications',
                description: 'When off-the-shelf doesn\'t cut it, we build exactly what you need. Your workflow, your logic, your competitive advantage—coded from scratch.',
                icon: '⚙️'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full Development Capabilities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We're not just a <GradientText>website shop.</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Some projects need more than a pretty homepage. They need integrations, custom functionality, and systems that talk to each other. That's fine—we do that too.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'E-Commerce', description: 'Shopify, headless commerce, custom storefronts—whatever makes sense for how you sell. Built to convert, not just to exist.' },
              { title: 'CRM Integration', description: 'Salesforce, HubSpot, Pipedrive, or whatever you\'re running. Your website and your sales system should actually talk to each other.' },
              { title: 'ERP Integration', description: 'Inventory, fulfillment, operations—connected to your web presence so data flows where it needs to go.' },
              { title: 'Marketing Automation', description: 'Forms that trigger sequences. Behavior that triggers actions. Websites that do things, not just display things.' },
              { title: 'Social Media Integration', description: 'Feeds, sharing, authentication, posting—social baked into your infrastructure, not bolted on as an afterthought.' },
              { title: 'Custom Functionality', description: 'If you can describe it, we can probably build it. Calculators, configurators, dashboards, workflows—whatever your business actually needs.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <SpotlightCard className="p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <p className="text-xl text-white font-medium">
              We're a full development partner. If your project needs it, we can build it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why AI-Ready Matters Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The web is changing. <GradientText>AI is changing it.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              Here's what's happening: AI systems are increasingly influencing what gets found, recommended, and trusted online. 
              Search is evolving from "type keywords, get links" to "ask questions, get answers."
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-red-600/30 bg-red-600/5 mb-12">
              <p className="text-lg text-white text-center">
                If your website isn't structured for AI to read, understand, and recommend—you're becoming invisible to the systems that shape buying decisions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Structured Data', description: 'Your content organized so AI systems can actually parse it—not just humans scanning headings.' },
              { title: 'Schema Markup', description: 'The technical layer that tells AI what your content means, not just what it says.' },
              { title: 'Fast Performance', description: 'AI systems favor sites that load quickly and work well. Slow sites get deprioritized.' },
              { title: 'Integration-Ready', description: 'Architecture that supports AI chatbots, voice agents, automated workflows—the tools reshaping business.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <p className="text-xl text-gray-400">
              This isn't future speculation. This is happening now. The question is whether you're <span className="text-white">building for it</span> or hoping it doesn't affect you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Modern stack. <GradientText>Proven results.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              We build on Next.js—the same framework used by Nike, Netflix, TikTok, and companies that can't afford slow or unreliable. 
              It's fast, secure, and built for exactly where the web is heading.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '⚡', title: 'Speed', description: 'Pages that load before visitors have time to leave' },
              { icon: '🔒', title: 'Security', description: 'No plugin vulnerabilities, no constant patching' },
              { icon: '📈', title: 'Scalability', description: 'Infrastructure that grows with you, not against you' },
              { icon: '🤖', title: 'AI-Ready', description: 'Built for integrations, structured data, and whatever comes next' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <p className="text-lg text-gray-400">
              You don't need to understand the technology. You just need infrastructure that works—and keeps working as the web evolves.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Escape Developer Hell Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your developer shouldn't be your <GradientText>bottleneck.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              We've heard the stories. Waiting weeks for simple changes. Invoices that don't match the value delivered. 
              Emails that disappear into the void. "I'll get to it next week" as a permanent status.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-white text-center mb-12">
              Your business moves fast. Your web partner should too.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Actually responsive', description: 'We answer emails. Quickly. Revolutionary, we know.' },
              { title: 'Transparent process', description: 'You know what\'s happening, what\'s next, and what it costs.' },
              { title: 'Reasonable timelines', description: 'Fast doesn\'t mean sloppy. It means we don\'t waste time.' },
              { title: 'Partnership mentality', description: 'Your success is our success. We act like it.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
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
              Whether you're replacing an aging platform or building something entirely new—let's talk about what modern infrastructure could do for your business.
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
