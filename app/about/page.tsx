'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Image Slot Map
 * 
 * Documents the intended image usage for this page.
 * All images are located in: public/images/pages/about/
 * 
 * - hero-21x9.png → page hero (top of page)
 * - mission-9x16.png → mission section (text + vertical image)
 * - story-16x9.png → story / narrative section
 * - team-1x1.png → leadership / team avatar
 */

function TeamAvatar({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-20 h-20 aspect-square bg-red-600 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-white">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 aspect-square rounded-full mb-4 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="80px"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/pages/about/hero-21x9.png"
            alt="About AI Marketing Pro"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            About <span className="text-red-600">AI Marketing Pro</span>
          </h1>
          <p className="text-xl text-gray-300">
            Pioneering the future of digital marketing with artificial intelligence
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-12 bg-gray-900 border-2 border-red-600 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Our Mission</h2>
          <div className="flex flex-col md:flex-row md:gap-8 items-start">
            <div className="flex-1 mb-6 md:mb-0">
              <p className="text-gray-300 leading-relaxed text-lg">
                At AI Marketing Pro, we believe that the future of marketing lies in the seamless integration of artificial intelligence and human creativity. Our mission is to empower businesses of all sizes to leverage cutting-edge AI technology to create more effective, efficient, and personalized marketing campaigns that drive real results.
              </p>
            </div>
            <div className="relative w-full md:w-48 md:flex-shrink-0 aspect-[9/16] rounded-lg overflow-hidden">
              <Image
                src="/images/pages/about/mission-9x16.png"
                alt="Our Mission"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Founded in 2020 by a team of marketing veterans and AI engineers, AI Marketing Pro emerged from a simple observation: traditional marketing methods were becoming increasingly inefficient in an ever-evolving digital landscape. We saw an opportunity to bridge the gap between innovative AI technology and practical marketing solutions.
            </p>
            <div className="relative w-full aspect-video my-6 rounded-lg overflow-hidden">
              <Image
                src="/images/pages/about/story-16x9.png"
                alt="Our Story"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p>
              Starting as a small team of five passionate individuals, we've grown into a leading digital marketing agency with over 50 AI specialists, data scientists, and marketing strategists. Our journey has been marked by continuous innovation, with our proprietary AI algorithms processing over 10 million data points daily to optimize client campaigns.
            </p>
            <p>
              Today, we serve over 500 clients across various industries, from startups to Fortune 500 companies, helping them achieve an average ROI increase of 250% through our AI-driven marketing solutions.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border-l-4 border-red-600 p-6">
              <h3 className="text-xl font-bold mb-2 text-red-600">Innovation First</h3>
              <p className="text-gray-300">
                We stay at the forefront of AI technology, constantly exploring new ways to improve marketing effectiveness.
              </p>
            </div>
            <div className="bg-gray-900 border-l-4 border-red-600 p-6">
              <h3 className="text-xl font-bold mb-2 text-red-600">Data-Driven Decisions</h3>
              <p className="text-gray-300">
                Every strategy we develop is backed by comprehensive data analysis and AI-powered insights.
              </p>
            </div>
            <div className="bg-gray-900 border-l-4 border-red-600 p-6">
              <h3 className="text-xl font-bold mb-2 text-red-600">Client Success</h3>
              <p className="text-gray-300">
                Your success is our success. We measure our performance by the results we deliver to our clients.
              </p>
            </div>
            <div className="bg-gray-900 border-l-4 border-red-600 p-6">
              <h3 className="text-xl font-bold mb-2 text-red-600">Transparency</h3>
              <p className="text-gray-300">
                We believe in clear communication and honest reporting, ensuring you always know how your campaigns are performing.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border-2 border-red-600">
              <div className="relative w-20 h-20 aspect-square rounded-full mb-4 overflow-hidden">
                <Image
                  src="/images/pages/about/team-1x1.png"
                  alt="Sarah Mitchell"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Sarah Mitchell</h3>
              <p className="text-red-600 mb-2">CEO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                15+ years in digital marketing, former VP at Google
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border-2 border-red-600">
              <div className="relative w-20 h-20 aspect-square rounded-full mb-4 overflow-hidden">
                <Image
                  src="/images/pages/about/team-1x1.png"
                  alt="David Chen"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">David Chen</h3>
              <p className="text-red-600 mb-2">CTO & Co-Founder</p>
              <p className="text-gray-300 text-sm">
                AI researcher with PhD from MIT, ex-OpenAI engineer
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border-2 border-red-600">
              <div className="relative w-20 h-20 aspect-square rounded-full mb-4 overflow-hidden">
                <Image
                  src="/images/pages/about/team-1x1.png"
                  alt="Emily Johnson"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Emily Johnson</h3>
              <p className="text-red-600 mb-2">Head of Strategy</p>
              <p className="text-gray-300 text-sm">
                Marketing strategist with expertise in AI automation
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-900 border-2 border-red-600 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-white">Want to Work With Us?</h2>
          <p className="text-gray-300 mb-6">
            Join our team of innovators and help shape the future of AI marketing.
          </p>
          <a
            href="/contact"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}

