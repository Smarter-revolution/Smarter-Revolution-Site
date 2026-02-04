'use client';

import { GridPattern, BlurText, ScrollReveal } from '@/components/ui';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <BlurText text="Privacy Policy" className="text-white" />
            </h1>
            <p className="text-gray-400">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400 mb-8">
                Smarter Revolution ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Information You Provide</h3>
              <p className="text-gray-400 mb-4">We collect information you voluntarily provide when you:</p>
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
                <li>Fill out our contact form (name, email, company, project details)</li>
                <li>Schedule a strategy call</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage with us via email or phone</li>
                <li>Become a client</li>
              </ul>
              <p className="text-gray-400 mb-4">This may include:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li>Name and contact information</li>
                <li>Company name and role</li>
                <li>Project requirements and business information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Information Collected Automatically</h3>
              <p className="text-gray-400 mb-4">When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>General location (city/region level)</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-400 mb-4">We use collected information to:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li>Respond to your inquiries and requests</li>
                <li>Schedule and conduct strategy calls</li>
                <li>Provide our services (video production, web development, Hub deployments)</li>
                <li>Send relevant communications about our services</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-gray-400 mb-8 font-semibold">We do not sell your personal information to third parties.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">How We Share Your Information</h2>
              <p className="text-gray-400 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-400 mb-8 space-y-2">
                <li><strong className="text-white">Service providers</strong> who assist in operating our website and business (hosting, email, analytics, scheduling tools)</li>
                <li><strong className="text-white">Professional advisors</strong> such as lawyers and accountants when necessary</li>
                <li><strong className="text-white">Legal authorities</strong> when required by law or to protect our rights</li>
              </ul>
              <p className="text-gray-400 mb-8">All service providers are contractually obligated to protect your information and use it only for specified purposes.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400 mb-8">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. 
                However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-400 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your personal data</li>
                <li>Data portability</li>
                <li>Withdraw consent (where processing is based on consent)</li>
              </ul>
              <p className="text-gray-400 mb-8">
                To exercise these rights, contact us at <a href="mailto:privacy@smarterrevolution.com" className="text-red-500 hover:text-red-400">privacy@smarterrevolution.com</a>.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Cookie Policy</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">What Are Cookies</h3>
              <p className="text-gray-400 mb-4">
                Cookies are small text files stored on your device when you visit websites. They help websites function properly and provide information to website owners.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Cookies We Use</h3>
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function. Cannot be disabled.</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics). These collect anonymous data about pages visited, time on site, and similar metrics.</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and choices to enhance your experience.</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Managing Cookies</h3>
              <p className="text-gray-400 mb-8">
                Most browsers allow you to control cookies through settings. Note that disabling certain cookies may affect website functionality.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-400 mb-8">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-400 mb-8">
                Our website and services are not directed at individuals under 18. We do not knowingly collect personal information from children. 
                If we become aware that we have collected data from a child, we will take steps to delete it.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-400 mb-8">
                If you are located outside the United States, please be aware that your information may be transferred to and processed in the United States, where our servers and operations are located.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-400 mb-8">
                We may update this privacy policy from time to time. The updated version will be indicated by the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 mb-4">
                If you have questions about this privacy policy or our data practices, contact us at:
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:privacy@smarterrevolution.com" className="text-red-500 hover:text-red-400">privacy@smarterrevolution.com</a>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
