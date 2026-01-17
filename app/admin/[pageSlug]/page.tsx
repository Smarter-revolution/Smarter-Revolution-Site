'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { BlockEditor } from '../components/BlockEditor'
import { SaveButton } from '../components/SaveButton'
import { AddBlockModal } from '../components/AddBlockModal'
import type { PageContent, BlockType, BlockData } from '@/lib/types'
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
      .catch(() => {
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
  const handleBlockChange = useCallback((blockId: string, newData: BlockData) => {
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
        <p className="text-gray-600">The page &ldquo;{pageSlug}&rdquo; does not exist.</p>
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
