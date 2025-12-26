export default function Service() {
  const services = [
    {
      title: "AI-Powered SEO Optimization",
      description: "Our advanced AI algorithms analyze search patterns, competitor strategies, and content performance to optimize your website's search engine rankings. We use machine learning to identify high-value keywords and create content that ranks.",
      features: [
        "Real-time keyword analysis",
        "Automated content optimization",
        "Competitor intelligence",
        "Performance tracking & reporting"
      ],
      price: "Starting at $2,500/month"
    },
    {
      title: "Intelligent Social Media Management",
      description: "Leverage AI to create, schedule, and optimize social media content across all platforms. Our system learns from engagement data to post at optimal times and create content that resonates with your audience.",
      features: [
        "AI content generation",
        "Optimal posting time analysis",
        "Sentiment analysis",
        "Multi-platform management"
      ],
      price: "Starting at $1,800/month"
    },
    {
      title: "Predictive Email Marketing",
      description: "Transform your email campaigns with AI that predicts the best send times, personalizes content for each recipient, and optimizes subject lines for maximum open rates. Our system learns from every interaction.",
      features: [
        "Behavioral prediction models",
        "Dynamic content personalization",
        "A/B testing automation",
        "Advanced segmentation"
      ],
      price: "Starting at $1,200/month"
    },
    {
      title: "Programmatic Advertising",
      description: "Our AI-driven programmatic advertising platform automatically bids on ad inventory in real-time, optimizing for conversions while reducing costs. We use machine learning to identify the most valuable audiences.",
      features: [
        "Real-time bidding optimization",
        "Audience targeting AI",
        "Budget allocation automation",
        "Cross-channel campaign management"
      ],
      price: "Starting at $3,000/month"
    },
    {
      title: "Content Marketing Automation",
      description: "Generate high-quality, SEO-optimized content at scale using our AI content engine. From blog posts to social media captions, our system creates engaging content that drives traffic and conversions.",
      features: [
        "AI content generation",
        "SEO optimization",
        "Content calendar automation",
        "Performance analytics"
      ],
      price: "Starting at $2,000/month"
    },
    {
      title: "Customer Journey Analytics",
      description: "Map and optimize every touchpoint in your customer's journey using AI-powered analytics. Identify bottlenecks, predict churn, and personalize experiences to maximize lifetime value.",
      features: [
        "Journey mapping AI",
        "Churn prediction",
        "Personalization engine",
        "Conversion optimization"
      ],
      price: "Starting at $2,800/month"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI-powered marketing solutions designed to drive growth and maximize ROI
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 border-2 border-red-600 rounded-lg p-6 hover:border-red-500 transition-colors flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4 text-red-600">{service.title}</h3>
              <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-700">
                <p className="text-red-600 font-bold">{service.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <section className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            How We <span className="text-red-600">Work</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600">Discovery</h3>
              <p className="text-gray-300">
                We analyze your business, goals, and current marketing performance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600">Strategy</h3>
              <p className="text-gray-300">
                Our AI creates a customized marketing strategy tailored to your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600">Implementation</h3>
              <p className="text-gray-300">
                We deploy AI-powered campaigns and continuously optimize performance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600">Optimization</h3>
              <p className="text-gray-300">
                AI learns and adapts, improving results with every campaign cycle
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-900 border-2 border-red-600 rounded-lg p-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to Get <span className="text-red-600">Started</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our AI-powered marketing services can transform your business
          </p>
          <a
            href="/contact"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-lg"
          >
            Request a Free Consultation
          </a>
        </section>
      </div>
    </div>
  );
}

