'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Transform Your Business with</span>
            <br />
            <span className="text-red-600">AI-Powered Marketing</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We leverage cutting-edge artificial intelligence to revolutionize your digital marketing strategy and drive unprecedented growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-lg"
            >
              Get Started Today
            </Link>
            <Link
              href="/service"
              className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors text-lg"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose <span className="text-red-600">AI Marketing Pro</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">AI-Driven Insights</h3>
              <p className="text-gray-300">
                Harness the power of machine learning to analyze customer behavior and optimize your marketing campaigns in real-time.
              </p>
            </div>
            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">Data Analytics</h3>
              <p className="text-gray-300">
                Advanced analytics and reporting tools that provide actionable insights to drive your business forward.
              </p>
            </div>
            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">Automated Campaigns</h3>
              <p className="text-gray-300">
                Fully automated marketing campaigns that adapt and optimize themselves based on performance data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-300">Clients Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">250%</div>
              <div className="text-gray-300">Average ROI Increase</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-300">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to <span className="text-red-600">Transform</span> Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of successful businesses that have revolutionized their marketing with AI technology.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-lg"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
