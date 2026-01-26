'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GlowButton,
  SpotlightCard,
  GridPattern,
  BlurText,
  ScrollReveal,
  GradientText,
  AnimatedCard,
  Particles
} from '@/components/ui';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effect
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Redirect to thank you page on success
      router.push(`/contact/thank-you?name=${encodeURIComponent(formData.name)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputStyles = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm hover:border-white/20";
  const labelStyles = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" squares={[[2, 2], [5, 4], [8, 3], [3, 7]]} />
          <Particles quantity={30} color="#dc2626" size={1.5} speed={0.3} />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Parallax Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <BlurText text="Start Your" className="text-white" />
              <span className="block mt-2">
                <GradientText>Revolution</GradientText>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Whether you&apos;re ready to transform or just curious about what&apos;s possible, we&apos;re here to help.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-red-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <SpotlightCard className="p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-8 text-white">
                  Send us a <GradientText>Message</GradientText>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <motion.div
                      className="bg-red-600/20 border border-red-500/50 text-white p-4 rounded-xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                  )}
                    <div>
                      <label htmlFor="name" className={labelStyles}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelStyles}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className={labelStyles}>
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelStyles}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className={labelStyles}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputStyles} resize-none`}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden group px-8 py-4 text-lg bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/25 hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Glow effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-400/30 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.span
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </motion.button>
                </form>
              </SpotlightCard>
            </ScrollReveal>

            {/* Contact Information */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <SpotlightCard className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    Contact <GradientText>Information</GradientText>
                  </h2>
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-red-500 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </h3>
                      <div className="space-y-2 text-gray-300">
                        <a href="mailto:info@smarterrevolution.com" className="block hover:text-red-500 transition-colors">
                          info@smarterrevolution.com
                        </a>
                        <a href="mailto:wolf@smarterrevolution.com" className="block hover:text-red-500 transition-colors">
                          wolf@smarterrevolution.com
                        </a>
                        <a href="mailto:mark@smarterrevolution.com" className="block hover:text-red-500 transition-colors">
                          mark@smarterrevolution.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-red-500 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone
                      </h3>
                      <a href="tel:+12133028260" className="text-gray-300 hover:text-red-500 transition-colors text-lg">
                        (213) 302-8260
                      </a>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-red-500 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Social Media
                      </h3>
                      <div className="space-y-2 text-gray-300">
                        <a href="https://linkedin.com/company/smarterrevolution" target="_blank" rel="noopener noreferrer" className="block hover:text-red-500 transition-colors">
                          LinkedIn
                        </a>
                        <a href="https://linkedin.com/in/krammel" target="_blank" rel="noopener noreferrer" className="block hover:text-red-500 transition-colors">
                          Wolf on LinkedIn
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <SpotlightCard className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    Why Choose <GradientText>Us?</GradientText>
                  </h2>
                  <ul className="space-y-4">
                    {[
                      'Free initial consultation',
                      'Customized AI solutions',
                      '24/7 AI monitoring & support',
                      'Transparent reporting & analytics',
                      'Proven track record of success'
                    ].map((item, index) => (
                      <motion.li 
                        key={item}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, color: '#fff' }}
                      >
                        <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </SpotlightCard>
              </ScrollReveal>

              {/* Quick Action Card */}
              <ScrollReveal delay={0.3}>
                <AnimatedCard className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Prefer a Call?</h3>
                  <p className="text-gray-400 mb-4">Schedule a free strategy session with our team.</p>
                  <GlowButton href="/book" variant="outline" size="md">
                    Book a Call
                  </GlowButton>
                </AnimatedCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
