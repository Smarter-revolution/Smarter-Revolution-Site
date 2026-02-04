'use client';

import { 
  GlowButton, 
  SpotlightCard, 
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard
} from '@/components/ui';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText 
                text="Help businesses figure out AI—" 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>before their competitors do.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              We're building something that matters: infrastructure that helps mid-market companies compete with giants. 
              <span className="text-white"> Small team. Big impact. No corporate nonsense.</span>
            </p>

            <GlowButton href="#positions" variant="outline" size="lg">
              See Open Positions
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </GlowButton>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The work actually <GradientText>matters.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-6">
              Here's what's happening: AI is reshaping how businesses operate. Most companies are either paralyzed by the hype or chasing tools without strategy. 
              Meanwhile, the ones who figure out AI infrastructure first are pulling ahead—fast.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p className="text-xl text-white font-medium mb-6">
              We help them figure it out.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-400 mb-6">
              Video production that scales. Training infrastructure that works. Web platforms built for where the internet is going. 
              Real solutions for real businesses with real problems.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.25}>
            <p className="text-xl text-gray-400 mb-6">
              This isn't theoretical consulting. We build things. You see them work. Clients use them every day.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="p-6 rounded-2xl border border-red-600/30 bg-red-600/5">
              <p className="text-lg text-white text-center">
                If "helping businesses actually succeed with AI" sounds more interesting than "optimizing ad click-through rates," keep reading.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Smarter Revolution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What working here <GradientText>actually looks like.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Small Team, Real Impact',
                description: 'No layers of bureaucracy between you and the work. Your contributions matter. Your ideas get heard. Your work ships and makes a difference.'
              },
              {
                title: 'Cutting-Edge Technology',
                description: 'AI video generation, modern web frameworks, conversational AI agents—you\'re working with tools that are genuinely new, not maintaining legacy systems.'
              },
              {
                title: 'Direct Access to Leadership',
                description: 'You\'ll work directly with founders who\'ve been building businesses for 30 years. Learn from experience, not middle management.'
              },
              {
                title: 'Remote-Friendly',
                description: 'Work where you work best. We care about results, not where your desk is located.'
              },
              {
                title: 'No Corporate Nonsense',
                description: 'No pointless meetings. No performance theater. No "synergy" or "alignment" or whatever buzzword of the week. Just work that matters, done well.'
              },
              {
                title: 'Growth With the Company',
                description: 'We\'re early. That means opportunity for people who want to shape something, not just fill a slot in an org chart.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How we actually <GradientText>operate.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Results Over Process',
                description: 'We care about what gets done, not how many meetings you attended. Great work matters. Busywork doesn\'t.'
              },
              {
                title: 'Quality Over Shortcuts',
                description: 'We\'d rather do something right than do it fast and fix it later. Clients trust us because we don\'t cut corners.'
              },
              {
                title: 'Honesty Over Comfort',
                description: 'We tell clients what they need to hear, not what they want to hear. We extend the same respect internally.'
              },
              {
                title: 'Innovation Over "How It\'s Always Been Done"',
                description: 'Best practices are a starting point, not a ceiling. We\'re building new things—that requires new thinking.'
              },
              {
                title: 'Partnership Over Transactions',
                description: 'We succeed when clients succeed. We think long-term, not just project-to-project.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who Thrives Here Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              You might be a <GradientText>great fit if...</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'You want to work on things that matter, not just fill a role',
                'You\'re excited about AI but skeptical of the hype',
                'You prefer autonomy over micromanagement',
                'You communicate clearly and directly',
                'You figure things out rather than waiting to be told',
                'You care about quality—even when no one\'s checking',
                'You\'re comfortable with ambiguity (we\'re building as we go)',
                'You want to grow with a company, not just work at one'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Current <GradientText>Openings</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AnimatedCard className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No open positions right now—but we're always interested in exceptional people.</h3>
              <p className="text-gray-400 mb-6">
                We don't always have posted positions, but we're always open to conversations with talented people who align with what we're building.
              </p>
              <p className="text-gray-400">
                If you think you'd be a great fit, reach out anyway. Tell us what you're great at and why you're interested. 
                <span className="text-white"> The right person creates their own opportunity.</span>
              </p>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The process is <GradientText>pretty simple.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Send us your info', description: 'Email with resume, portfolio, and why you\'re interested.' },
              { step: '2', title: 'We review (quickly)', description: 'If there\'s potential fit, we reach out within a week.' },
              { step: '3', title: 'Conversation', description: 'Real conversation, not interrogation. No brain teasers.' },
              { step: '4', title: 'Small project', description: 'Sometimes a paid project to see how we collaborate.' },
              { step: '5', title: 'Decision', description: 'We move quickly. You\'ll know where you stand.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <GradientText>talk?</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-gray-400 mb-8">
              Send us an email with your resume, relevant work samples, and a note about why Smarter Revolution interests you. 
              Be yourself—we're not looking for cover letter theater.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-4 mb-8">
              <a 
                href="mailto:careers@smarterrevolution.com"
                className="inline-flex items-center text-xl text-red-500 hover:text-red-400 transition-colors"
              >
                careers@smarterrevolution.com
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <AnimatedCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">What to include:</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Resume or LinkedIn profile</li>
                  <li>• Portfolio, work samples, or relevant projects</li>
                  <li>• Brief note on why you're interested (doesn't need to be formal)</li>
                </ul>
              </AnimatedCard>
              <AnimatedCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">What we don't need:</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Generic cover letters</li>
                  <li>• Keyword-stuffed resumes</li>
                  <li>• Exaggerated claims you can't back up</li>
                </ul>
              </AnimatedCard>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
