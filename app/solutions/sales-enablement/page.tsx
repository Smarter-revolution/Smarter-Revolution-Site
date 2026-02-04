'use client';

import Link from 'next/link';
import { 
  GlowButton, 
  SpotlightCard, 
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard
} from '@/components/ui';

export default function SalesEnablementPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium mb-6">
              Solutions / Sales & Partner Enablement
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText text="Your partners can't sell what they" className="text-white" />
              <span className="block mt-2"><GradientText>don't understand.</GradientText></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Your channel partners are guessing. Your sales team is winging it. Your messaging is all over the map. 
              <span className="text-white"> There's a better way.</span>
            </p>
          </div>
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
              'Partners using outdated pitch decks with last year\'s messaging',
              'Every rep telling a different story about your product',
              'Channel partners who don\'t really understand what makes you different',
              'Content requests piling up faster than you can create',
              'No visibility into whether anyone\'s actually using your sales materials'
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
              Arm your channel with tools that <GradientText>actually work.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Guided Sales Videos',
                description: 'Professional pitch content your partners can use. Consistent messaging, compelling delivery, available on demand.',
                link: '/video-production'
              },
              {
                title: 'Partner Portal',
                description: 'One destination for everything partners need. Training, resources, certifications—organized and accessible.',
                link: '/guided-knowledge-hub'
              },
              {
                title: 'Guided Voice Agent',
                description: 'AI assistant that answers product questions instantly. Partners get answers without waiting for your team.',
                link: '/guided-knowledge-hub'
              },
              {
                title: 'Certification & Tracking',
                description: 'Know who\'s trained, who\'s engaged, who needs attention. Visibility into your entire channel.',
                link: '/guided-knowledge-hub'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-6 h-full">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <Link href={item.link} className="text-red-500 hover:text-red-400 text-sm font-semibold">
                    Learn more →
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Content that helps your channel <GradientText>close deals.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Partner onboarding',
              'Product training',
              'Pitch standardization',
              'Objection handling',
              'Competitive positioning',
              'Certification programs',
              'New product launches',
              'Sales methodology',
              'Deal support resources'
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

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What changes when your channel is <GradientText>actually enabled.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Consistent messaging everywhere', description: 'Every partner tells the same compelling story.' },
              { title: 'Partners who can actually sell', description: 'They understand your product, your value, your differentiation.' },
              { title: 'Visibility into channel engagement', description: 'Know who\'s trained, who\'s active, who needs attention.' },
              { title: 'Faster partner ramp-up', description: 'New partners get productive in weeks, not quarters.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Proof that <GradientText>momentum compounds.</GradientText>
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
              Ready to enable your <GradientText>channel?</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10">
              Let's talk about what real sales enablement could look like for your partners.
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
