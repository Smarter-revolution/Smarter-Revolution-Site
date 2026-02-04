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

export default function CustomerEducationPage() {
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
              Solutions / Customer Education
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText text="Customers who understand your product" className="text-white" />
              <span className="block mt-2"><GradientText>actually use it.</GradientText></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Your support team is drowning in tickets. Customers are churning because they never figured out how to use your product. 
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
              'Support tickets for questions that have obvious answers (if customers could find them)',
              'Low feature adoption because customers don\'t know features exist',
              'Churn from customers who never got value—because they never figured out how',
              'Documentation that nobody reads (and is probably outdated anyway)',
              'Your team answering the same questions over and over'
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
              Customer education that <GradientText>scales.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Guided Explainer Videos',
                description: 'Product walkthroughs customers actually watch. Clear, professional, always available.',
                link: '/video-production'
              },
              {
                title: 'Customer Hub',
                description: 'Self-service destination where customers find answers. Organized, searchable, 24/7.',
                link: '/guided-knowledge-hub'
              },
              {
                title: 'Guided Voice Agent',
                description: 'AI assistant that answers customer questions instantly. Reduces tickets, improves experience.',
                link: '/guided-knowledge-hub'
              },
              {
                title: 'Usage Analytics',
                description: 'See what customers are watching, where they\'re struggling, what needs improvement.',
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
              Education that drives <GradientText>adoption.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Product onboarding',
              'Feature education',
              'Self-service support',
              'New release announcements',
              'Best practices',
              'Use case guides',
              'Troubleshooting',
              'Integration tutorials',
              'Advanced features'
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
              What changes when customers <GradientText>get it.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Reduced support tickets', description: 'Customers find answers themselves.' },
              { title: 'Higher feature adoption', description: 'Customers discover and use what you built.' },
              { title: 'Better retention', description: 'Customers who get value stay.' },
              { title: 'Scalable without headcount', description: 'Serve more customers without more support staff.' }
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
              Proof that <GradientText>education scales.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: 'Employee handbook turned into a podcast series with 89% completion.',
                author: 'COO, Regional healthcare network'
              },
              {
                quote: 'AI agents now handle 80% of customer questions instantly.',
                author: 'Director of Customer Success, Enterprise services team'
              },
              {
                quote: 'Sales cycles shortened 40% with a leaner team.',
                author: 'CMO, B2B project management platform'
              },
              {
                quote: 'Revenue up 240% in 8 months.',
                author: 'Managing Partner, 50-attorney law firm'
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
              Ready to educate your <GradientText>customers?</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10">
              Let's talk about what customer education could look like for your product.
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
