'use client'

import { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { AdminSidebar } from './components/AdminSidebar'
import type { PageListItem } from '@/lib/types'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [pages, setPages] = useState<PageListItem[]>([])
  const [siteName, setSiteName] = useState('Site Admin')
  
  useEffect(() => {
    // Check authentication status
    fetch('/api/admin/auth')
      .then(r => r.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false))
    
    // Load pages list
    fetch('/api/content/pages')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPages(data)
        }
      })
      .catch(() => setPages([]))
    
    // Load site config for name
    fetch('/api/content/site')
      .then(r => r.json())
      .then(data => setSiteName(data.siteName || 'Site Admin'))
      .catch(() => {})
  }, [])
  
  // Loading state
  if (authenticated === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Loading admin...</span>
        </div>
      </div>
    )
  }
  
  // Not authenticated
  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />
  }
  
  // Authenticated - show admin interface
  return (
    <div className="fixed inset-0 flex bg-slate-100">
      <AdminSidebar pages={pages} siteName={siteName} />
      <main className="flex-1 ml-72 overflow-auto">
        <div className="p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
