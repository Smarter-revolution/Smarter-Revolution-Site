'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, ArrowRight, Sparkles, Clock, Edit3 } from 'lucide-react'
import type { PageListItem } from '@/lib/types'

export default function AdminDashboard() {
  const [pages, setPages] = useState<PageListItem[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/content/pages')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPages(data)
        }
      })
      .catch(() => setPages([]))
      .finally(() => setLoading(false))
  }, [])
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          </div>
          <p className="text-slate-500 text-lg">Manage your website content from here.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{pages.length}</span>
          </div>
          <h3 className="font-semibold text-slate-700">Total Pages</h3>
          <p className="text-sm text-slate-500">Editable content pages</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">Live</span>
          </div>
          <h3 className="font-semibold text-slate-700">Site Status</h3>
          <p className="text-sm text-slate-500">All systems operational</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg shadow-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="font-semibold">Quick Tip</h3>
          <p className="text-sm text-white/80">Click on any page below to start editing content.</p>
        </div>
      </div>
      
      {/* Pages Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Your Pages</h2>
          <span className="text-sm text-slate-500">{pages.length} pages available</span>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded w-24 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/admin/${page.slug}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        /{page.slug === 'home' ? '' : page.slug}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Help Section */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-2">Need Help?</h3>
        <p className="text-slate-500 text-sm mb-4">
          Each page is made up of content blocks that you can edit, reorder, or delete. 
          Changes are saved to GitHub and automatically deployed.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
            📝 Edit blocks
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
            🖼️ Upload images
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
            💾 Auto-save to GitHub
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
            🚀 Instant deploy
          </span>
        </div>
      </div>
    </div>
  )
}
