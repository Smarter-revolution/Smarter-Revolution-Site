'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PageListItem } from '@/src/lib/types'

interface AdminSidebarProps {
  siteName?: string
  onLogout: () => void
}

export function AdminSidebar({ siteName = 'Smart Sites', onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const [pages, setPages] = useState<PageListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/content/pages')
      const data = await response.json()
      if (data.success) {
        setPages(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      onLogout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg">{siteName}</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {/* Dashboard Link */}
        <Link
          href="/admin"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            pathname === '/admin'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </Link>

        {/* Pages Section */}
        <div className="pt-4">
          <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Pages
          </h3>
          
          {loading ? (
            <div className="px-4 py-2 text-slate-400 text-sm">Loading...</div>
          ) : pages.length === 0 ? (
            <div className="px-4 py-2 text-slate-400 text-sm">No pages found</div>
          ) : (
            pages.map((page) => (
              <Link
                key={page.slug}
                href={`/admin/${page.slug}`}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                  pathname === `/admin/${page.slug}`
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="capitalize">{page.title}</span>
              </Link>
            ))
          )}
        </div>

        {/* Settings Section */}
        <div className="pt-4">
          <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Settings
          </h3>
          
          <Link
            href="/admin/site"
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
              pathname === '/admin/site'
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Site Settings</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
