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

export default function GuidedKnowledgeHubPage() {
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
                text="One destination for everything your team" 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>needs to know.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Training videos scattered across six platforms. Questions answered by whoever happens to be available. 
              No idea who's actually completed what. <span className="text-white">Sound familiar?</span> The Guided Knowledge Hub fixes all of it.
            </p>

            <GlowButton href="/contact" variant="primary" size="lg">
              See the Hub in Action
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* The Problem We Solve Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your training infrastructure is probably a mess. <GradientText>Here's how we know.</GradientText>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-lg text-gray-400">
              <p>
                Training videos live in SharePoint, Google Drive, email attachments, YouTube unlisted links, 
                and that one folder on someone's desktop from 2019.
              </p>
              <p>
                When someone has a question, they either ask the same five people or just figure it out themselves (badly).
              </p>
              <p>
                You have no idea who's actually watched the training—and when compliance asks, you scramble.
              </p>
              <p>
                New hires get a link dump and a "good luck."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 p-6 rounded-2xl border border-red-600/30 bg-red-600/5">
              <p className="text-lg text-white text-center">
                This isn't a training problem. It's an <span className="text-red-500">infrastructure problem.</span> And you can't solve infrastructure problems with more PDFs.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Four Pillars Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Four needs. <GradientText>One system.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                thought: '"I need help."',
                delivers: 'Go to the Hub.',
                description: 'One destination for everything—training, resources, support, answers. No more hunting through five platforms. Your team knows exactly where to go.',
                icon: '🎯'
              },
              {
                thought: '"Show me how."',
                delivers: 'Guided Video walks them through it.',
                description: 'Every process, every product, every procedure—explained visually by a professional presenter. Watch, learn, do. At their own pace.',
                icon: '🎬'
              },
              {
                thought: '"I have a question."',
                delivers: 'Guided Voice Agent answers it.',
                description: 'AI-powered assistant trained on your organization\'s knowledge. Instant answers without waiting for a person. Available 24/7, never impatient, always accurate.',
                icon: '🗣️'
              },
              {
                thought: '"Track my progress."',
                delivers: 'The Hub knows where they are.',
                description: 'Users see what they\'ve completed and what\'s next. You see who\'s trained, who\'s struggling, who\'s MIA. Compliance reports with one click.',
                icon: '📊'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-6 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <p className="text-sm text-gray-500 mb-1">User thinks:</p>
                  <p className="text-lg font-bold text-white mb-2">{item.thought}</p>
                  <p className="text-sm text-gray-500 mb-1">Hub delivers:</p>
                  <p className="text-red-500 font-semibold mb-4">{item.delivers}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need. <GradientText>Nothing you don't.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Video Content Library', description: 'All your Guided Videos in one organized, searchable location. Categorized, tagged, and actually findable.', icon: '📹' },
              { title: 'Guided Voice Agent', description: 'AI assistant that knows your business. Answers questions instantly, escalates to humans when needed, learns over time.', icon: '🤖' },
              { title: 'Progress Tracking', description: 'See who\'s completed what, who\'s in progress, and who hasn\'t started. Individual dashboards for users, oversight dashboards for admins.', icon: '📈' },
              { title: 'Certifications', description: 'Mark completion, issue certificates, track expiration. When training requires proof, you\'ve got it.', icon: '🏆' },
              { title: 'Admin Dashboard', description: 'Full control over content, users, permissions, and reporting. See engagement trends, identify gaps, make decisions based on data.', icon: '⚙️' },
              { title: 'QR Code Access', description: 'Scan from products, equipment, or physical locations—instant access to relevant training. No apps to download, no logins to remember.', icon: '📱' },
              { title: 'Multi-Language Support', description: 'Serve your entire workforce in their preferred language. English, Spanish, or whatever your business needs.', icon: '🌍' },
              { title: 'Mobile Responsive', description: 'Works on phones, tablets, desktops—wherever your team is, the Hub is there too.', icon: '💻' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.03}>
                <AnimatedCard className="p-5 h-full">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              One platform. <GradientText>Many applications.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Employee Training & Onboarding',
                description: 'New hires get one destination, not a scavenger hunt. Existing employees find what they need without asking around.',
                link: '/solutions/training-onboarding'
              },
              {
                title: 'Sales & Partner Enablement',
                description: 'Your channel partners get the training and resources to sell effectively. You get visibility into who\'s actually engaged.',
                link: '/solutions/sales-enablement'
              },
              {
                title: 'Customer Education',
                description: 'Customers help themselves, support tickets drop, adoption increases. Self-service that actually works.',
                link: '/solutions/customer-education'
              },
              {
                title: 'Compliance & Documentation',
                description: 'Prove who completed what, when. Audit-ready documentation without the scramble.',
                link: '/solutions/compliance-documentation'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <SpotlightCard className="p-8 h-full">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <Link 
                    href={item.link}
                    className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors group"
                  >
                    Learn about {item.title} Solutions
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Built Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              70% proven framework. <GradientText>30% built for you.</GradientText>
            </h2>
            <p className="text-xl text-gray-400">
              We're not building from scratch every time—and you don't want us to. The Guided Knowledge Hub is built on a proven framework 
              that handles user management, content delivery, progress tracking, and analytics out of the box.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 text-center mb-12">
              The 30% that's customized? That's your branding, your content structure, your workflows, your integrations. 
              <span className="text-white"> The parts that make it yours.</span>
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Faster deployment', description: 'We\'re not reinventing wheels' },
              { title: 'Reliable foundation', description: 'Framework tested across multiple deployments' },
              { title: 'Lower cost', description: 'You\'re not paying for R&D' },
              { title: 'Your brand', description: 'Looks and feels like you, not like us' }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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

      {/* Video + Hub Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We don't just build the platform. <GradientText>We fill it.</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-8">
              Most platforms have a content problem: they're sophisticated systems with nothing inside. 
              The Guided Knowledge Hub is different because we also produce the Guided Videos that live inside it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <AnimatedCard className="p-6">
                <div className="text-3xl mb-3">🎬</div>
                <h3 className="font-bold text-white mb-2">Video Production</h3>
                <p className="text-gray-400 text-sm">We create the training content.</p>
              </AnimatedCard>
              <AnimatedCard className="p-6">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="font-bold text-white mb-2">Hub Infrastructure</h3>
                <p className="text-gray-400 text-sm">We build the system to deliver it.</p>
              </AnimatedCard>
              <AnimatedCard className="p-6">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-bold text-white mb-2">Complete Solution</h3>
                <p className="text-gray-400 text-sm">You get both from one partner.</p>
              </AnimatedCard>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-gray-400 mb-8">
              No more coordinating between your video vendor, your LMS vendor, your website vendor, and your IT team. 
              <span className="text-white"> One partner. One system. Everything working together.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link 
              href="/video-production"
              className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors group"
            >
              Learn about Video Production
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
              Ready to unify your <GradientText>training infrastructure?</GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Stop managing chaos. Start managing a system. Let's talk about what the Guided Knowledge Hub could look like for your organization.
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
