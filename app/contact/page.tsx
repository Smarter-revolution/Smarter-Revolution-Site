'use client';

import { useState } from 'react';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <BlurText 
                text="Let's talk about" 
                className="text-white"
              />
              <span className="block mt-2">
                <GradientText>what's possible.</GradientText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Whether you need video content that scales, web infrastructure that performs, or you're not quite sure yet—we're happy to help you figure it out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Options Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pick your <GradientText>path.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Option 1: Book a Call */}
            <ScrollReveal delay={0.1}>
              <SpotlightCard className="p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Schedule a Free Strategy Call</h3>
                <p className="text-gray-400 mb-6">
                  30 minutes. No pitch deck. No pressure. Just a conversation about what you're trying to accomplish and whether we can help.
                </p>
                <p className="text-gray-400 mb-8">
                  We'll talk about your situation, explore what's possible, and give you honest feedback—even if that feedback is "you don't need us."
                </p>
                
                {/* Calendar Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">[Calendar booking widget will be embedded here]</p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Option 2: Send a Message */}
            <ScrollReveal delay={0.2}>
              <SpotlightCard className="p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Rather just reach out?</h3>
                <p className="text-gray-400 mb-6">
                  Not ready for a call? No problem. Tell us what you're working on and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Message sent!</h4>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company *</label>
                      <input
                        type="text"
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">What are you interested in?</label>
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      >
                        <option value="" className="bg-gray-900">Select an option</option>
                        <option value="video" className="bg-gray-900">Video Production</option>
                        <option value="web" className="bg-gray-900">Web Development</option>
                        <option value="hub" className="bg-gray-900">Guided Knowledge Hub</option>
                        <option value="unsure" className="bg-gray-900">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Tell us about your project</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                        placeholder="What are you working on?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Here's what to <GradientText>expect.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'We review your inquiry',
                description: 'Within 24 hours, a real human (not an autoresponder) reads what you sent and thinks about it.'
              },
              {
                step: '2',
                title: 'We reach out',
                description: 'Either to schedule a call, ask clarifying questions, or give you an honest assessment of whether we\'re the right fit.'
              },
              {
                step: '3',
                title: 'We talk',
                description: 'A real conversation about your goals, challenges, and what\'s actually possible. No hard sell. No pressure. Just straight answers.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-6">
              Prefer the direct route?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <a 
                href="mailto:hello@smarterrevolution.com" 
                className="block text-lg text-gray-400 hover:text-red-500 transition-colors"
              >
                hello@smarterrevolution.com
              </a>
              <p className="text-gray-500">
                Response time: Within 24 hours on business days. Usually faster.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Things people wonder <GradientText>before reaching out.</GradientText>
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              {
                q: 'What does a strategy call actually look like?',
                a: '30 minutes on Zoom. We ask about your situation, you ask about ours, and we figure out together if there\'s a fit. No presentations, no pressure. If we\'re not the right solution, we\'ll tell you.'
              },
              {
                q: 'Do I need to know exactly what I need?',
                a: 'Nope. "I think we need something but I\'m not sure what" is a perfectly valid starting point. That\'s what the conversation is for.'
              },
              {
                q: 'What if I\'m just exploring?',
                a: 'That\'s fine. We\'d rather have a conversation too early than too late. And if you\'re not ready, we\'ll say so.'
              },
              {
                q: 'How quickly can you start a project?',
                a: 'Depends on scope, but we typically kick off within 1-2 weeks of agreement. We move fast.'
              },
              {
                q: 'What does working with you cost?',
                a: 'It varies by project. Video production, web development, and Hub deployments each have different investment levels. We\'ll give you straight numbers once we understand what you need—no "it depends" runaround.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <AnimatedCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Nudge Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
          <GridPattern className="opacity-20" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still thinking about it?
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-gray-400 mb-8">
              That's okay. But here's the thing: the companies figuring out AI infrastructure now are building advantages that compound over time. 
              The longer you wait, the harder it gets to catch up.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white mb-8">
              A 30-minute conversation costs you nothing but could change everything.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlowButton href="#" variant="primary" size="lg">
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
