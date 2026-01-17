// ============================================
// /app/admin/layout.tsx
// ============================================

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
      .then(setPages)
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


// ============================================
// /app/admin/page.tsx - Dashboard
// ============================================

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import type { PageListItem } from '@/lib/types'

export default function AdminDashboard() {
  const [pages, setPages] = useState<PageListItem[]>([])
  
  useEffect(() => {
    fetch('/api/content/pages')
      .then(r => r.json())
      .then(setPages)
      .catch(() => setPages([]))
  }, [])
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome to Admin</h1>
      <p className="text-gray-600 mb-8">Select a page from the sidebar to start editing, or choose from below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/${page.slug}`}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h2 className="font-semibold">{page.title}</h2>
                  <p className="text-sm text-gray-500">/{page.slug === 'home' ? '' : page.slug}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


// ============================================
// /app/admin/[pageSlug]/page.tsx - Page Editor
// ============================================

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { BlockEditor } from '../components/BlockEditor'
import { SaveButton } from '../components/SaveButton'
import { AddBlockModal } from '../components/AddBlockModal'
import type { PageContent, Block, BlockType } from '@/lib/types'
import { createNewBlock } from '@/lib/types'

export default function PageEditorPage() {
  const params = useParams()
  const pageSlug = params.pageSlug as string
  
  const [content, setContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Load page content
  useEffect(() => {
    setLoading(true)
    fetch(`/api/content/${pageSlug}`)
      .then(r => {
        if (!r.ok) throw new Error('Page not found')
        return r.json()
      })
      .then(data => {
        setContent(data)
        setHasChanges(false)
      })
      .catch(err => {
        setMessage({ type: 'error', text: 'Failed to load page' })
      })
      .finally(() => setLoading(false))
  }, [pageSlug])
  
  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])
  
  // Handle block changes
  const handleBlockChange = useCallback((blockId: string, newData: any) => {
    setContent(prev => {
      if (!prev) return prev
      return {
        ...prev,
        blocks: prev.blocks.map(block =>
          block.id === blockId ? { ...block, data: newData } : block
        )
      }
    })
    setHasChanges(true)
  }, [])
  
  // Handle block delete
  const handleBlockDelete = useCallback((blockId: string) => {
    setContent(prev => {
      if (!prev) return prev
      return {
        ...prev,
        blocks: prev.blocks.filter(block => block.id !== blockId)
      }
    })
    setHasChanges(true)
  }, [])
  
  // Handle add new block
  const handleAddBlock = useCallback((type: BlockType) => {
    const newBlock = createNewBlock(type)
    setContent(prev => {
      if (!prev) return prev
      return {
        ...prev,
        blocks: [...prev.blocks, newBlock]
      }
    })
    setHasChanges(true)
  }, [])
  
  // Handle save
  const handleSave = async () => {
    if (!content) return
    
    setSaving(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug,
          content
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setHasChanges(false)
        setLastSaved(new Date().toLocaleTimeString())
        setMessage({ type: 'success', text: data.message })
        
        // Clear success message after 5 seconds
        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Save failed' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save. Please try again.' })
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }
  
  if (!content) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600">The page "{pageSlug}" does not exist.</p>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Edit: {content.pageTitle}</h1>
          <p className="text-gray-500">/{pageSlug === 'home' ? '' : pageSlug}</p>
        </div>
        <SaveButton
          onClick={handleSave}
          saving={saving}
          disabled={!hasChanges}
          hasChanges={hasChanges}
          lastSaved={lastSaved}
        />
      </div>
      
      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}
      
      {/* SEO Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4">SEO Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title (SEO)</label>
            <input
              type="text"
              value={content.seo.title}
              onChange={(e) => {
                setContent({ ...content, seo: { ...content.seo, title: e.target.value } })
                setHasChanges(true)
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Page title for search engines"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea
              value={content.seo.description}
              onChange={(e) => {
                setContent({ ...content, seo: { ...content.seo, description: e.target.value } })
                setHasChanges(true)
              }}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Brief description for search results"
            />
          </div>
        </div>
      </div>
      
      {/* Blocks */}
      <div className="space-y-4 mb-6">
        {content.blocks.map((block) => (
          <BlockEditor
            key={block.id}
            block={block}
            onChange={(data) => handleBlockChange(block.id, data)}
            onDelete={() => handleBlockDelete(block.id)}
          />
        ))}
      </div>
      
      {/* Add Block Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add New Block
      </button>
      
      {/* Add Block Modal */}
      {showAddModal && (
        <AddBlockModal
          onSelect={handleAddBlock}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}