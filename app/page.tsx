import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Standalone CMS Admin System
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Smart Sites
            <span className="text-blue-400"> Admin</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            A powerful, reusable admin system for client-editable websites. 
            Built with Next.js, designed for integration into any project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Open Admin Panel →
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              View Demo Site
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Block-Based Editing</h3>
            <p className="text-slate-400">
              8 pre-built block types including Hero, Text+Image, Services Grid, Testimonials, CTA, Team, Contact, and FAQ.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">GitHub Integration</h3>
            <p className="text-slate-400">
              Auto-commits content changes to GitHub, triggering automatic Vercel rebuilds for instant updates.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Image Uploads</h3>
            <p className="text-slate-400">
              Drag-and-drop image uploads to Vercel Blob storage with automatic optimization and CDN delivery.
            </p>
          </div>
        </div>

        {/* Integration Options */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Integration Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 text-left border border-white/10">
              <h3 className="font-semibold text-white mb-2">📦 NPM Package</h3>
              <code className="text-sm text-blue-400 bg-black/30 px-3 py-1 rounded">
                npm install smart-sites-admin
              </code>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 text-left border border-white/10">
              <h3 className="font-semibold text-white mb-2">🚀 CLI Setup</h3>
              <code className="text-sm text-blue-400 bg-black/30 px-3 py-1 rounded">
                npx smart-sites-admin init
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
          <p>Smart Sites Admin • Built by Smarter Revolution</p>
        </div>
      </footer>
    </div>
  )
}
