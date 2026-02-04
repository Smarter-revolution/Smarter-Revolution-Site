'use client';

import Image from 'next/image';
import { 
  GridPattern, 
  ScrollReveal, 
  SpotlightCard, 
  BlurText, 
  GradientText,
  Particles
} from '@/components/ui';

export default function Team() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" squares={[[1, 2], [4, 3], [7, 5], [2, 7]]} />
          <Particles quantity={35} color="#dc2626" size={1.5} speed={0.3} />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <BlurText text="The Architects Behind the" className="text-white" />
              <span className="block mt-2">
                <GradientText>Revolution</GradientText>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Three decades of digital evolution. One mission: empowering businesses through AI.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Wolf Krammel */}
        <ScrollReveal>
          <SpotlightCard className="mb-16 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Content */}
              <div className="flex-1">
                {/* Header with Headshot */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Headshot */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-600 mx-auto md:mx-0 shadow-lg shadow-red-600/25">
                      <Image
                        src="/images/pages/team/wolf_krammel.png"
                        alt="Wolf Krammel"
                        fill
                        className="object-cover"
                        sizes="192px"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Header Info */}
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                      Wolf <GradientText>Krammel</GradientText>
                    </h2>
                    <p className="text-xl text-red-500 mb-4 font-semibold">
                      Co-Founder & AI Strategist
                    </p>
                    <p className="text-lg text-gray-400 mb-4">
                      AI Automation Pioneer | Digital Transformation Strategist
                    </p>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                      <a 
                        href="mailto:wolf@smarterrevolution.com" 
                        className="hover:text-red-500 transition-colors"
                      >
                        wolf@smarterrevolution.com
                      </a>
                      <span className="text-gray-600">|</span>
                      <a 
                        href="tel:+12133028260" 
                        className="hover:text-red-500 transition-colors"
                      >
                        (213) 302-8260
                      </a>
                      <span className="text-gray-600">|</span>
                      <a 
                        href="https://linkedin.com/in/krammel" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-red-500 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold mb-4 text-white">The Pioneer&apos;s Journey</h3>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      Wolf&apos;s digital journey began in 1993 on the 34th floor of the Empire State Building, crafting websites when the web didn&apos;t even have background colors. As a self-taught developer at Ingrid Communications, he was building internet infrastructure for Fortune 500 companies before most businesses knew they needed a website.
                    </p>
                    <blockquote className="italic text-gray-400 border-l-4 border-red-600 pl-4 my-6">
                      &quot;I still remember a seminar attendee telling me, &apos;The internet is just a fad. It won&apos;t be around next year,&apos;&quot; Wolf recalls. &quot;That moment taught me something important: the biggest opportunities live in the gap between what skeptics dismiss and what visionaries embrace.&quot;
                    </blockquote>
                    <p>
                      Over three decades, Wolf has navigated every digital transformation: the dot-com boom, the rise of search, social media&apos;s explosion, mobile-first design, and now artificial intelligence. He&apos;s founded multiple ventures, including a digital marketing agency that evolved through every technological revolution, and even ventured into custom home construction in South Florida.
                    </p>
                    <p>
                      But it&apos;s his foundation in healthcare that sets Wolf apart. As a physical therapist at the Hospital for People with Disabilities in Berlin, Germany (1988-1990), Wolf learned to see systems holistically: developing personalized treatment plans, collaborating across disciplines, and focusing on building patient capability rather than creating dependency. This &quot;wellness approach&quot; now informs how Smarter Revolution approaches business transformation.
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold mb-4 text-red-500">Key Achievements:</h4>
                    <ul className="space-y-3 text-gray-300">
                      {[ 
                        '30+ years pioneering digital transformation from early web to AI',
                        'Published author on AI business applications and technology integration',
                        'Developed the AI Business Accelerator framework used by SMBs nationwide',
                        'Healthcare background bringing unique perspective to business wellness',
                        'Cross-industry expertise spanning tech, healthcare, e-commerce, and hospitality'
                      ].map((item, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Info Image (Desktop only) */}
              <div className="hidden lg:block flex-shrink-0 lg:w-80 xl:w-96 self-start">
                <div className="relative w-full">
                  <Image
                    src="/images/pages/team/wolf-info2.png"
                    alt="Wolf Krammel Information"
                    width={400}
                    height={711}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 384px"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Info Image */}
            <div className="lg:hidden mt-8 w-full">
              <div className="relative w-full">
                <Image
                  src="/images/pages/team/wolf-info2.png"
                  alt="Wolf Krammel Information"
                  width={400}
                  height={711}
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* Mark Alouf */}
        <ScrollReveal delay={0.1}>
          <SpotlightCard className="mb-16 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Content */}
              <div className="flex-1">
                {/* Header with Headshot */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Headshot */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-600 mx-auto md:mx-0 shadow-lg shadow-red-600/25">
                      <Image
                        src="/images/pages/team/mark_alouf.png"
                        alt="Mark Alouf"
                        fill
                        className="object-cover"
                        sizes="192px"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Header Info */}
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                      Mark <GradientText>Alouf</GradientText>
                    </h2>
                    <p className="text-xl text-red-500 mb-4 font-semibold">
                      Co-Founder & Business Strategist
                    </p>
                    <p className="text-lg text-gray-400 mb-4">
                      Serial Entrepreneur | Technology Business Strategist
                    </p>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                      <a 
                        href="mailto:mark@smarterrevolution.com" 
                        className="hover:text-red-500 transition-colors"
                      >
                        mark@smarterrevolution.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold mb-4 text-white">From IBM to Building Empires</h3>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      Mark&apos;s career launched in 1995 at IBM, where he cut his teeth as a sales specialist competing head-to-head with industry giants like Compaq. His talent for understanding customer needs and closing deals quickly earned him promotion to IBM&apos;s business partner channel, where he mastered the art of strategic partnerships.
                    </p>
                    <p>
                      But the structured corporate environment couldn&apos;t contain Mark&apos;s entrepreneurial drive. The dot-com boom called, and Mark answered, joining NQL in Santa Ana, California, where he managed high-profile OEM engagements and navigated the volatile world of tech startups. The dot-com crash, while challenging, proved to be his greatest teacher in resilience and adaptability.
                    </p>
                    <p>
                      Mark&apos;s defining achievement came with P1 Technologies, a company he co-founded and built from startup to a multi-million dollar acquisition. Along the way, he pioneered distributed teams across multiple countries, developed CRM implementations that transformed sales processes, and created systems that scaled.
                    </p>
                    <p>
                      Today, Mark brings that same strategic thinking to Smarter Revolution. His experience building and selling companies gives him unique insight into what mid-market businesses actually need: not just tools, but transformation strategies that drive measurable results.
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold mb-4 text-red-500">Key Achievements:</h4>
                    <ul className="space-y-3 text-gray-300">
                      {[ 
                        'Co-founded and led P1 Technologies to successful acquisition',
                        'Built and managed distributed teams across multiple countries',
                        'Developed enterprise sales strategies for Fortune 500 and SMB markets',
                        'Pioneered CRM implementation and sales process automation',
                        'Deep expertise in podcasting, AI integration, and business development'
                      ].map((item, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Info Image (Desktop only) */}
              <div className="hidden lg:block flex-shrink-0 lg:w-80 xl:w-96 self-start">
                <div className="relative w-full">
                  <Image
                    src="/images/pages/team/mark-info2.png"
                    alt="Mark Alouf Information"
                    width={400}
                    height={711}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 384px"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Info Image */}
            <div className="lg:hidden mt-8 w-full">
              <div className="relative w-full">
                <Image
                  src="/images/pages/team/mark-info2.png"
                  alt="Mark Alouf Information"
                  width={400}
                  height={711}
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* Team Philosophy */}
        <ScrollReveal delay={0.2}>
          <SpotlightCard className="p-8 md:p-12">
            <blockquote className="text-3xl md:text-4xl font-bold text-white mb-8 border-l-4 border-red-600 pl-6">
              &quot;We practice what we preach.&quot;
            </blockquote>
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              <p>
                Our small team operates with AI-powered efficiency that larger agencies can&apos;t match. We use the same tools, workflows, and strategies we implement for clients. Every system we recommend has been battle-tested in our own operations.
              </p>
              <p>
                This means you&apos;re not getting theoretical advice from consultants who&apos;ve never implemented. You&apos;re getting proven strategies from practitioners who use AI every single day to run a leaner, faster, more effective business.
              </p>
              <p className="text-2xl font-semibold text-red-500 mt-8">
                When we say AI gives teams superpowers, we&apos;re speaking from experience.
              </p>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </div>
  );
}
