'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/src/components/admin/LoginForm'
import { AdminSidebar } from '@/src/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    router.push('/admin')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <LoginForm 
        onSuccess={handleLoginSuccess}
        title="Smart Sites Admin"
        subtitle="Enter your password to manage content"
      />
    )
  }

  // Authenticated - show admin layout
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar 
        siteName="Smart Sites"
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
