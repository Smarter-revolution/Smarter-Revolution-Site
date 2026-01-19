'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GridPattern, ScrollReveal } from '@/components/ui';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    phone: '',
    service: '',
    message: '',
    hearAbout: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        companySize: '',
        phone: '',
        service: '',
        message: '',
        hearAbout: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GridPattern className="opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-white">
            Start Your <span className="text-red-600">Revolution</span>
          </h1>
          <p className="text-xl text-gray-300">
            Whether you&apos;re ready to transform or just curious about what&apos;s possible, we&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal>
            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
              {submitted ? (
                <motion.div 
                  className="bg-green-600 text-white p-4 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-semibold">Thank you! We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    >
                      <option value="">Select company size</option>
                      <option value="1-50">1-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      What brings you here?
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="empower">Team Empowerment</option>
                      <option value="content">Content Production</option>
                      <option value="automate">Automation</option>
                      <option value="search">AI Search</option>
                      <option value="notsure">Not Sure Yet</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white resize-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-2">
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
                <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-red-600 font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">
                      <a href="mailto:info@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                        info@smarterrevolution.com
                      </a>
                      <br />
                      <a href="mailto:wolf@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                        wolf@smarterrevolution.com
                      </a>
                      <br />
                      <a href="mailto:mark@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                        mark@smarterrevolution.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-red-600 font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">
                      <a href="tel:+12133028260" className="hover:text-red-600 transition-colors">
                        (213) 302-8260
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-red-600 font-semibold mb-2">Social Media</h3>
                    <p className="text-gray-300">
                      <a href="https://linkedin.com/company/smarterrevolution" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                        LinkedIn
                      </a>
                      <br />
                      <a href="https://linkedin.com/in/krammel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                        Wolf on LinkedIn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
                <h2 className="text-2xl font-bold mb-4 text-white">Why Choose Us?</h2>
                <ul className="space-y-3 text-gray-300">
                  {[
                    'Free initial consultation',
                    'Customized AI solutions',
                    '24/7 AI monitoring & support',
                    'Transparent reporting & analytics',
                    'Proven track record of success'
                  ].map((item, index) => (
                    <motion.li 
                      key={item}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="text-red-600 mr-2">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
