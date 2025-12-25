export default function Team() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            The Architects Behind the <span className="text-red-600">Revolution</span>
          </h1>
          <p className="text-xl text-gray-300">
            Three decades of digital evolution. One mission: empowering businesses through AI.
          </p>
        </div>

        {/* Wolf Krammel */}
        <section className="mb-16 bg-gray-900 border-2 border-red-600 rounded-lg p-8 md:p-12">
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              Wolf <span className="text-red-600">Krammel</span>
            </h2>
            <p className="text-xl text-red-600 mb-4">
              Co-Founder & AI Strategist
            </p>
            <p className="text-lg text-gray-300 mb-4">
              AI Automation Pioneer | Digital Transformation Strategist
            </p>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <a href="mailto:wolf@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                wolf@smarterrevolution.com
              </a>
              <span>|</span>
              <a href="tel:+12133028260" className="hover:text-red-600 transition-colors">
                (213) 302-8260
              </a>
              <span>|</span>
              <a href="https://linkedin.com/in/krammel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mb-4 text-white">The Pioneer's Journey</h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Wolf's digital journey began in 1993 on the 34th floor of the Empire State Building, crafting websites when the web didn't even have background colors. As a self-taught developer at Ingrid Communications, he was building internet infrastructure for Fortune 500 companies before most businesses knew they needed a website.
              </p>
              <p className="italic text-gray-400 border-l-4 border-red-600 pl-4">
                "I still remember a seminar attendee telling me, 'The internet is just a fad. It won't be around next year,'" Wolf recalls. "That moment taught me something important: the biggest opportunities live in the gap between what skeptics dismiss and what visionaries embrace."
              </p>
              <p>
                Over three decades, Wolf has navigated every digital transformation: the dot-com boom, the rise of search, social media's explosion, mobile-first design, and now artificial intelligence. He's founded multiple ventures, including a digital marketing agency that evolved through every technological revolution, and even ventured into custom home construction in South Florida.
              </p>
              <p>
                But it's his foundation in healthcare that sets Wolf apart. As a physical therapist at the Hospital for People with Disabilities in Berlin, Germany (1988-1990), Wolf learned to see systems holistically: developing personalized treatment plans, collaborating across disciplines, and focusing on building patient capability rather than creating dependency. This "wellness approach" now informs how Smarter Revolution approaches business transformation.
              </p>
            </div>

          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4 text-red-600">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>30+ years pioneering digital transformation from early web to AI</li>
              <li>Published author on AI business applications and technology integration</li>
              <li>Developed the AI Business Accelerator framework used by SMBs nationwide</li>
              <li>Healthcare background bringing unique perspective to business wellness</li>
              <li>Cross-industry expertise spanning tech, healthcare, e-commerce, and hospitality</li>
            </ul>
          </div>
          </div>
        </section>

        {/* Mark Alouf */}
        <section className="mb-16 bg-gray-900 border-2 border-red-600 rounded-lg p-8 md:p-12">
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              Mark <span className="text-red-600">Alouf</span>
            </h2>
            <p className="text-xl text-red-600 mb-4">
              Co-Founder & Business Strategist
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Serial Entrepreneur | Technology Business Strategist
            </p>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <a href="mailto:mark@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                mark@smarterrevolution.com
              </a>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mb-4 text-white">From IBM to Building Empires</h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Mark's career launched in 1995 at IBM, where he cut his teeth as a sales specialist competing head-to-head with industry giants like Compaq. His talent for understanding customer needs and closing deals quickly earned him promotion to IBM's business partner channel, where he mastered the art of strategic partnerships.
              </p>
              <p>
                But the structured corporate environment couldn't contain Mark's entrepreneurial drive. The dot-com boom called, and Mark answered, joining NQL in Santa Ana, California, where he managed high-profile OEM engagements and navigated the volatile world of tech startups. The dot-com crash, while challenging, proved to be his greatest teacher in resilience and adaptability.
              </p>
              <p>
                Mark's defining achievement came with P1 Technologies, a company he co-founded and built from startup to a multi-million dollar acquisition. Along the way, he pioneered distributed teams across multiple countries, developed CRM implementations that transformed sales processes, and created systems that scaled.
              </p>
              <p>
                Today, Mark brings that same strategic thinking to Smarter Revolution. His experience building and selling companies gives him unique insight into what mid-market businesses actually need: not just tools, but transformation strategies that drive measurable results.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4 text-red-600">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Co-founded and led P1 Technologies to successful acquisition</li>
                <li>Built and managed distributed teams across multiple countries</li>
                <li>Developed enterprise sales strategies for Fortune 500 and SMB markets</li>
                <li>Pioneered CRM implementation and sales process automation</li>
                <li>Deep expertise in podcasting, AI integration, and business development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SuperHero */}
        <section className="mb-16 bg-gray-900 border-2 border-red-600 rounded-lg p-8 md:p-12">
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              <span className="text-red-600">SuperHero</span>
            </h2>
            <p className="text-xl text-red-600 mb-4">
              Operations Manager
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Operations Manager | Implementation Specialist
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mb-4 text-white">The Engine Behind the Revolution</h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                SuperHero serves as the operational backbone of Smarter Revolution, ensuring that strategic vision translates into flawless execution. While the founders architect transformation strategies, SuperHero makes them real: managing implementations, coordinating projects, and keeping every moving part synchronized.
              </p>
              <p>
                In a company dedicated to AI automation, SuperHero embodies the human element that makes technology work. He bridges the gap between high-level strategy and day-to-day delivery, ensuring clients receive not just plans, but results.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4 text-red-600">Core Responsibilities:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Project management and client implementation coordination</li>
                <li>Operations optimization and workflow management</li>
                <li>Quality assurance across all deliverables</li>
                <li>Team coordination and resource allocation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 md:p-12">
          <blockquote className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-6">
            "We practice what we preach."
          </blockquote>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Our small team operates with AI-powered efficiency that larger agencies can't match. We use the same tools, workflows, and strategies we implement for clients. Every system we recommend has been battle-tested in our own operations.
            </p>
            <p>
              This means you're not getting theoretical advice from consultants who've never implemented. You're getting proven strategies from practitioners who use AI every single day to run a leaner, faster, more effective business.
            </p>
            <p className="text-xl font-semibold text-red-600">
              When we say AI gives teams superpowers, we're speaking from experience.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

