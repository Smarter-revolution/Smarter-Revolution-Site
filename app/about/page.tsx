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

export default function AboutPage() {
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
                text="We've been watching technology transform business for 30 years." 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>This is the biggest shift yet.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Smarter Revolution exists to help mid-market companies navigate AI transformation—without the hype, 
              without the overwhelm, and without replacing the humans who make your business work.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We saw this coming. <GradientText>Again.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-gray-400">
                In <span className="text-white font-semibold">1993</span>, most businesses didn't have email addresses. We were building websites.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-xl text-gray-400">
                In <span className="text-white font-semibold">2005</span>, social media was a curiosity. We saw it as the democratization of distribution.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-xl text-gray-400">
                In <span className="text-white font-semibold">2010</span>, mobile was "nice to have." We knew it would become everything.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.25}>
              <p className="text-xl text-gray-400">
                <span className="text-white font-semibold">Now?</span> AI is reshaping what's possible—and most companies are either paralyzed by the hype or chasing tools without strategy.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl border border-red-600/30 bg-red-600/5 mt-8">
                <p className="text-lg text-white">
                  We've seen this movie before. Revolutionary technology arrives. Some companies figure it out early and pull ahead. 
                  Others wait, hesitate, and spend years catching up. <span className="text-red-500">Smarter Revolution was founded to make sure you're in the first group.</span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The philosophy behind <GradientText>everything we build.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI is infrastructure, not magic.',
                description: 'AI isn\'t a silver bullet and it isn\'t science fiction. It\'s business infrastructure—like electricity or the internet before it. The companies that treat it that way will win.'
              },
              {
                title: 'Empowerment, not replacement.',
                description: 'We don\'t believe AI should replace your team. We believe it should give them superpowers. More output. Less drudgery. Better results. Same humans.'
              },
              {
                title: 'Results over hype.',
                description: 'The AI space is drowning in buzzwords and promises. We\'re more interested in what actually works—and proving it with real outcomes.'
              },
              {
                title: 'Mid-market deserves enterprise capabilities.',
                description: 'Fortune 500 companies have armies of consultants and unlimited budgets. You don\'t. But you should still have access to sophisticated AI infrastructure. We make that possible.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-8 h-full">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How we <GradientText>actually work.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Strategy + Execution',
                description: 'We don\'t hand you a PowerPoint and wish you luck. We build working systems—video production, training infrastructure, modern web platforms—that your team can actually use.'
              },
              {
                title: 'Modern Technology, Practical Implementation',
                description: 'We use cutting-edge tools because they produce better results, not because they sound impressive. If something simpler works better, we use that instead.'
              },
              {
                title: 'Partnership, Not Vendor Relationship',
                description: 'We\'re not here to sell you something and disappear. We succeed when you succeed—and we act like it.'
              },
              {
                title: 'Speed Without Sacrifice',
                description: 'AI lets us move fast. But fast doesn\'t mean sloppy. You get quality and velocity—because you shouldn\'t have to choose.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-6 h-full">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The people behind <GradientText>Smarter Revolution.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Wolf Krammel */}
            <ScrollReveal delay={0.1}>
              <SpotlightCard className="p-8 h-full">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-3xl font-bold mb-6">
                  WK
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Wolf Krammel</h3>
                <p className="text-red-500 font-semibold mb-4">Co-Founder & CEO</p>
                <p className="text-gray-400 mb-4">
                  Wolf recognized the web's potential in 1993—before most businesses had email. Three decades later, he's still spotting what's next while others are still debating what's now.
                </p>
                <p className="text-gray-400 mb-4">
                  His background spans digital transformation, healthcare and wellness industries, and a career built on seeing around corners. Wolf leads client relationships and strategic direction at Smarter Revolution with a direct, no-BS approach balanced by genuine care for outcomes.
                </p>
                <p className="text-gray-300 italic">
                  "When he tells you something isn't going to work, he's saving you time. When he tells you something will, he's betting his reputation on it."
                </p>
              </SpotlightCard>
            </ScrollReveal>

            {/* Mark Alouf */}
            <ScrollReveal delay={0.2}>
              <SpotlightCard className="p-8 h-full">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-3xl font-bold mb-6">
                  MA
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mark Alouf</h3>
                <p className="text-red-500 font-semibold mb-4">Co-Founder & COO</p>
                <p className="text-gray-400 mb-4">
                  Mark started at IBM in 1995 selling PCs against Compaq. He's touched every layer of the tech stack since—hardware, software, Fortune 500, garage startup, selling boxes, building businesses.
                </p>
                <p className="text-gray-400 mb-4">
                  His superpower? Understanding not just how technology works, but how businesses actually use it. He built P1 Technologies from his garage to $25 million in revenue, then orchestrated a successful exit. Now he brings that operational rigor to Smarter Revolution.
                </p>
                <p className="text-gray-300 italic">
                  "If Wolf is the strategist, Mark is the systems thinker who makes sure the machine actually runs."
                </p>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Partnership Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What 50+ combined years <GradientText>looks like.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-white font-semibold">Wolf Krammel</th>
                    <th className="text-left py-4 px-6 text-white font-semibold">Mark Alouf</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Vision & Strategy', 'Systems & Operations'],
                    ['Client Relationships', 'Process Design'],
                    ['Creative Direction', 'Scalable Execution'],
                    ['Digital evolution since \'93', '$25M business built and sold'],
                    ['CEO — External leadership', 'COO — Internal operations']
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-400">{row[0]}</td>
                      <td className="py-4 px-6 text-gray-400">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-8">
            <p className="text-lg text-gray-400 text-center">
              Together, they've witnessed every major digital transformation since the early web—and helped businesses navigate each one. 
              This isn't theoretical knowledge from reading articles. <span className="text-white">It's pattern recognition earned by doing the work.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Mid-Market Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We focus on mid-market companies <GradientText>for a reason.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 text-center mb-8">
              Mid-market companies ($10M–$250M) occupy a strategic position:
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Big enough', description: 'to have real content and training needs that justify investment.' },
              { title: 'Small enough', description: 'that transformation is actually achievable—without enterprise bureaucracy slowing everything down.' },
              { title: 'Underserved', description: 'by both enterprise solutions (too expensive, too complex) and small business tools (too limited, too basic).' },
              { title: 'Decision-capable', description: 'with accessible leadership who can approve initiatives and champion change.' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-8">
            <p className="text-xl text-white text-center font-medium">
              This is where we do our best work. Big enough to matter. Small enough to move.
            </p>
          </ScrollReveal>
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
              Ready to work <GradientText>with us?</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you're exploring AI transformation or ready to start building—we'd love to hear what you're working on.
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
