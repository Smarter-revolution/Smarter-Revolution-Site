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

export default function VideoProductionPage() {
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
                text="Traditional video production has a math problem." 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>We fixed it.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              One video used to cost a fortune, take forever, and by the time it was done, you needed ten more. 
              AI-powered production changes that equation—<span className="text-white">dramatically.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton href="#process" variant="primary" size="lg">
                See Our Process
              </GlowButton>
              <GlowButton href="#samples" variant="outline" size="lg">
                View Sample Work ↓
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Create Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Video content that works as hard as <GradientText>you do.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Guided Training Video',
                description: 'Employee onboarding, product training, compliance, operational procedures—the videos your team actually needs. No more PDFs nobody reads or PowerPoints from the previous administration.',
                useCases: ['New hire orientation', 'Safety training', 'Process documentation', 'Product knowledge', 'Role-specific skills'],
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: 'Guided Explainer Video',
                description: 'Your product is brilliant. Your explanation of it? Maybe less so. Explainer videos that make complex things clear—for customers, prospects, or anyone who needs to get it.',
                useCases: ['Product overviews', 'Feature explanations', 'Service breakdowns', 'Concept education'],
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Guided Sales Video',
                description: 'Arm your sales team with consistent, compelling content. No more rogue PowerPoints or "I\'ll just wing it." Professional delivery of your best messaging, available on demand.',
                useCases: ['Pitch frameworks', 'Objection handling', 'Partner enablement', 'Product demos'],
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 mb-6">{item.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Use cases:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.useCases.map((useCase, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI-Powered Video Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What changes when AI does the <GradientText>heavy lifting.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'More content, faster than you thought possible.',
                description: 'Your content needs grow faster than your team can keep up. Sound familiar? AI-powered production means you\'re no longer choosing which videos to make—you make them all. What used to take weeks now takes days.'
              },
              {
                title: 'Hollywood quality without Hollywood budgets.',
                description: 'Traditional video production quotes are designed to make you cry. One video for $15K? That\'s not a strategy—that\'s a budget crisis. Professional presenters, cinematic quality, scalable production—at a fraction of what agencies charge.'
              },
              {
                title: 'Same presenter, same quality, every single video.',
                description: 'Traditional video means coordinating schedules, booking talent, hoping your spokesperson doesn\'t change their hairstyle between shoots. AI avatars deliver the same professional presence across 5 videos or 500.'
              },
              {
                title: 'One video, every language your business needs.',
                description: 'Bilingual workforce? Global customers? International partners? Create once, deploy in multiple languages—without reshooting, without hiring translators, without doubling your budget.'
              },
              {
                title: 'Need it in weeks, not months? Done.',
                description: 'Product launch in 30 days. Compliance deadline next quarter. New hire class starting Monday. Traditional video production can\'t move that fast—we can. We delivered a 10-minute training video in 10 days.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-8 h-full">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Avatar Selection Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See exactly what you're getting—<GradientText>before you commit.</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Most video projects start with mood boards and hope. Ours start with real output. Before any production begins, we create 3-5 short demo clips combining the actual avatar, actual voice, and actual delivery style.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: '1', text: 'We produce 3-5 avatar demos (15 seconds each) based on your brand and audience.' },
              { step: '2', text: 'Each demo combines appearance, voice, and on-brand delivery—the full experience.' },
              { step: '3', text: 'You pick your presenter. No surprises. No "I\'ll know it when I see it" paralysis.' },
              { step: '4', text: 'Avatar and voice are locked. Production moves forward with confidence.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="p-6 rounded-2xl border border-red-600/30 bg-red-600/5">
              <h3 className="text-lg font-bold text-white mb-2">Why This Matters</h3>
              <p className="text-gray-400">
                This isn't just a nice touch—it eliminates the single biggest cause of video project disasters: late-stage changes. 
                When you've approved the real thing upfront, you don't get to final delivery and say "actually, can we try a different voice?" 
                The result? <span className="text-white">Faster projects, fewer revisions, better outcomes.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              From kickoff to delivery—<GradientText>here's the path.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { phase: 'Discovery & Scoping', description: 'We learn what you\'re trying to accomplish, who\'s watching, and what success looks like. You get clarity on approach, timeline, and investment.' },
              { phase: 'Avatar Selection Process', description: 'We produce real demo clips—not mood boards. You pick your presenter based on actual output. Avatar and voice get locked before we move forward.' },
              { phase: 'Script Development', description: 'We write it, you refine it, we lock it. No more "just one more tweak" at the finish line. Script approved means script approved.' },
              { phase: 'Production', description: 'Avatar footage, supporting visuals, motion graphics, sound design—this is where the magic happens. You\'re not involved in this part (you\'re welcome).' },
              { phase: 'Review & Refinement', description: 'First cut delivered. Feedback incorporated. Final polish applied. Because we locked the big decisions early, this phase is about fine-tuning—not firefighting.' },
              { phase: 'Delivery & Deployment', description: 'Final files in every format you need. QR codes if applicable. Hosting setup if you want it. Your videos are ready to work.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.phase}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* From Videos to System Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your videos deserve a better home than a <GradientText>shared drive.</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-8">
              So you've got great training videos. Where do they live? Scattered across SharePoint? Buried in email threads? 
              Uploaded to YouTube as "unlisted" and shared via links that break?
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-8">
              Great content is worthless if nobody can find it. The <span className="text-white">Guided Knowledge Hub</span> gives your videos a proper home—organized, searchable, trackable. 
              Know who watched what. See where they dropped off. Prove training happened when compliance comes asking.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Link 
              href="/guided-knowledge-hub"
              className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors group"
            >
              Learn about the Guided Knowledge Hub
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Sample Work Section */}
      <section id="samples" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See it in <GradientText>action.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              These aren't hypothetical. These are real videos we've produced for real clients with real deadlines. 
              Notice the quality. Notice the consistency. Now imagine having 50 of these instead of 3.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {['Training Video Example', 'Explainer Example', 'Sales Video Example'].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">[{item}]</p>
                  </div>
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
              Ready to create <GradientText>faster?</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you need 5 videos or 500, we can show you exactly what's possible—starting with a demo of your actual presenter options.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
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
