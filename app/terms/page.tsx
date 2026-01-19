'use client';

import { motion } from 'framer-motion';
import { GridPattern, BlurText, ScrollReveal } from '@/components/ui';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <BlurText text="Terms of Service" className="text-white" />
            </h1>
            <p className="text-gray-400">Last Updated: January 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-400 mb-8">
                By accessing or using the Smarter Revolution website (smarterrevolution.com), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our website.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Use of Website</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Permitted Use</h3>
              <p className="text-gray-400 mb-4">You may use our website for lawful purposes to:</p>
              <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                <li>Learn about our services</li>
                <li>Contact us regarding potential projects</li>
                <li>Access resources and content we make available</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Prohibited Use</h3>
              <p className="text-gray-400 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Transmit any viruses, malware, or harmful code</li>
                <li>Scrape, crawl, or collect data from the website without permission</li>
                <li>Impersonate any person or entity</li>
                <li>Use the website to send unsolicited communications</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Our Content</h3>
              <p className="text-gray-400 mb-4">
                All content on this website—including text, graphics, logos, images, videos, and software—is the property of Smarter Revolution or our licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-400 mb-6">
                You may not reproduce, distribute, modify, or create derivative works from our content without our explicit written permission.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Trademarks</h3>
              <p className="text-gray-400 mb-8">
                "Smarter Revolution," "Guided Knowledge Hub," "Guided Video," "Guided Voice Agent," and related logos are trademarks of Smarter Revolution. You may not use these marks without our prior written consent.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Separate Agreements</h3>
              <p className="text-gray-400 mb-4">
                Our professional services (video production, web development, Guided Knowledge Hub deployments) are governed by separate service agreements. These Terms of Service apply only to your use of our website.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">No Guarantee</h3>
              <p className="text-gray-400 mb-8">
                Information on this website about our services is for general informational purposes. Specific project outcomes depend on many factors and are addressed in individual service agreements.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">User Submissions</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Contact Forms and Communications</h3>
              <p className="text-gray-400 mb-4">
                When you submit information through our contact forms or other communications, you grant us permission to use that information to respond to your inquiry and potentially follow up about our services.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">No Confidentiality</h3>
              <p className="text-gray-400 mb-8">
                Unless we have a separate written agreement, information you submit through the website is not considered confidential. Do not send us proprietary or sensitive business information through website forms.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-400 mb-4 uppercase font-semibold">
                THE WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-gray-400 mb-4">We do not warrant that:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li>The website will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The website is free of viruses or harmful components</li>
                <li>The information on the website is complete or accurate</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-400 mb-4 uppercase font-semibold">
                TO THE FULLEST EXTENT PERMITTED BY LAW, SMARTER REVOLUTION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE WEBSITE.
              </p>
              <p className="text-gray-400 mb-8">
                Our total liability for any claims arising from your use of the website shall not exceed the amount you paid us in the twelve months preceding the claim (or $100 if you have not paid us anything).
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
              <p className="text-gray-400 mb-8">
                You agree to indemnify and hold harmless Smarter Revolution, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from your use of the website or violation of these terms.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-400 mb-8">
                Our website may contain links to third-party websites. These links are provided for convenience only. We do not endorse or assume responsibility for the content or practices of linked websites.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
              <p className="text-gray-400 mb-8">
                We reserve the right to modify these Terms of Service at any time. Changes become effective when posted to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-400 mb-8">
                We may terminate or suspend your access to the website at any time, without notice, for any reason, including violation of these terms.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-gray-400 mb-8">
                These Terms of Service are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Los Angeles County, California.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Severability</h2>
              <p className="text-gray-400 mb-8">
                If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Entire Agreement</h2>
              <p className="text-gray-400 mb-8">
                These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and Smarter Revolution regarding your use of the website.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="text-gray-400 mb-4">
                Questions about these Terms of Service? Contact us at:
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:legal@smarterrevolution.com" className="text-red-500 hover:text-red-400">legal@smarterrevolution.com</a>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
