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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    )
  }
  
  // Not authenticated
  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />
  }
  
  // Authenticated - show admin interface
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar pages={pages} siteName={siteName} />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
