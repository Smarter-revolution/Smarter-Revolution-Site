'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Plus, FileText, Search, AlertCircle, ChevronDown, ChevronUp, ExternalLink, Wrench } from 'lucide-react'
import { BlockEditor } from '../components/BlockEditor'
import { SaveButton } from '../components/SaveButton'
import { AddBlockModal } from '../components/AddBlockModal'
import type { PageContent, BlockType, BlockData } from '@/lib/types'
import { createNewBlock } from '@/lib/types'

interface ErrorDetails {
  type: 'config' | 'auth' | 'not_found' | 'permission' | 'network' | 'unknown'
  message: string
  fix: string
  details?: string
}

interface SaveError {
  error: string
  errorDetails?: ErrorDetails
  configStatus?: {
    owner?: string
    repo?: string
    branch?: string
    tokenSet: boolean
    repoUrl?: string
  }
}

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
  const [saveError, setSaveError] = useState<SaveError | null>(null)
  const [showErrorDetails, setShowErrorDetails] = useState(false)
  
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
    setSaveError(null)
    
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
        // Store detailed error for display
        setSaveError({
          error: data.error || 'Save failed',
          errorDetails: data.errorDetails,
          configStatus: data.configStatus
        })
        setMessage({ type: 'error', text: data.error || 'Save failed' })
        setShowErrorDetails(true)
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save. Please try again.' })
      setSaveError({
        error: 'Network error - could not reach the server',
        errorDetails: {
          type: 'network',
          message: 'Failed to connect to the save API',
          fix: 'Check your internet connection and try again.'
        }
      })
    } finally {
      setSaving(false)
    }
  }
  
  // Get error type badge color
  const getErrorTypeBadge = (type: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      config: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Configuration' },
      auth: { bg: 'bg-red-100', text: 'text-red-800', label: 'Authentication' },
      not_found: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Not Found' },
      permission: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Permission' },
      network: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Network' },
      unknown: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Unknown' }
    }
    return badges[type] || badges.unknown
  }
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
          <div>
            <div className="h-7 bg-slate-200 rounded w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-24 animate-pulse" />
          </div>
        </div>
        <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
        <div className="h-40 bg-slate-200 rounded-2xl animate-pulse" />
      </div>
    )
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
        <p className="text-slate-500">The page &ldquo;{pageSlug}&rdquo; does not exist.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{content.pageTitle}</h1>
            <p className="text-slate-500">/{pageSlug === 'home' ? '' : pageSlug}</p>
          </div>
        </div>
        <SaveButton
          onClick={handleSave}
          saving={saving}
          disabled={!hasChanges}
          hasChanges={hasChanges}
          lastSaved={lastSaved}
        />
      </div>
      
      {/* Success Message */}
      {message && message.type === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-800 border border-green-200">
          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{message.text}</span>
        </div>
      )}
      
      {/* Error Message with Details */}
      {saveError && (
        <div className="rounded-xl border border-red-200 overflow-hidden">
          {/* Error Header */}
          <div 
            className="flex items-center justify-between gap-3 p-4 bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
            onClick={() => setShowErrorDetails(!showErrorDetails)}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="font-medium text-red-800">{saveError.error}</span>
            </div>
            <button className="text-red-600 hover:text-red-800">
              {showErrorDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Expanded Error Details */}
          {showErrorDetails && saveError.errorDetails && (
            <div className="p-4 bg-white border-t border-red-200 space-y-4">
              {/* Error Type Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getErrorTypeBadge(saveError.errorDetails.type).bg} ${getErrorTypeBadge(saveError.errorDetails.type).text}`}>
                  {getErrorTypeBadge(saveError.errorDetails.type).label}
                </span>
              </div>
              
              {/* How to Fix */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold text-amber-800">How to Fix</span>
                </div>
                <pre className="text-sm text-amber-900 whitespace-pre-wrap font-mono bg-amber-100/50 p-3 rounded">
                  {saveError.errorDetails.fix}
                </pre>
              </div>
              
              {/* Configuration Status */}
              {saveError.configStatus && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-700 mb-3">Current Configuration</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-500">GITHUB_OWNER:</div>
                    <div className="font-mono text-slate-900">{saveError.configStatus.owner || <span className="text-red-500">Not set</span>}</div>
                    
                    <div className="text-slate-500">GITHUB_REPO:</div>
                    <div className="font-mono text-slate-900">{saveError.configStatus.repo || <span className="text-red-500">Not set</span>}</div>
                    
                    <div className="text-slate-500">GITHUB_BRANCH:</div>
                    <div className="font-mono text-slate-900">{saveError.configStatus.branch || 'main'}</div>
                    
                    <div className="text-slate-500">GITHUB_TOKEN:</div>
                    <div className="font-mono">
                      {saveError.configStatus.tokenSet 
                        ? <span className="text-green-600">Set ✓</span> 
                        : <span className="text-red-500">Not set</span>
                      }
                    </div>
                  </div>
                  
                  {saveError.configStatus.repoUrl && (
                    <a 
                      href={saveError.configStatus.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Repository
                    </a>
                  )}
                </div>
              )}
              
              {/* Technical Details (collapsible) */}
              {saveError.errorDetails.details && (
                <details className="bg-slate-50 border border-slate-200 rounded-lg">
                  <summary className="p-3 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-800">
                    Technical Details
                  </summary>
                  <pre className="p-3 text-xs text-slate-600 whitespace-pre-wrap font-mono border-t border-slate-200">
                    {saveError.errorDetails.details}
                  </pre>
                </details>
              )}
              
              {/* Quick Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a 
                  href="https://vercel.com/dashboard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Vercel Dashboard
                </a>
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  GitHub Tokens
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* SEO Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            <h2 className="font-semibold text-slate-900">SEO Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Page Title (SEO)</label>
            <input
              type="text"
              value={content.seo.title}
              onChange={(e) => {
                setContent({ ...content, seo: { ...content.seo, title: e.target.value } })
                setHasChanges(true)
              }}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Page title for search engines"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
            <textarea
              value={content.seo.description}
              onChange={(e) => {
                setContent({ ...content, seo: { ...content.seo, description: e.target.value } })
                setHasChanges(true)
              }}
              rows={3}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              placeholder="Brief description for search results"
            />
          </div>
        </div>
      </div>
      
      {/* Blocks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Content Blocks</h2>
          <span className="text-sm text-slate-500">{content.blocks.length} blocks</span>
        </div>
        
        <div className="space-y-4">
          {content.blocks.map((block, index) => (
            <BlockEditor
              key={block.id}
              block={block}
              index={index}
              onChange={(data) => handleBlockChange(block.id, data)}
              onDelete={() => handleBlockDelete(block.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Add Block Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-5 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50 flex items-center justify-center gap-2 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
        </div>
        <span className="font-medium">Add New Block</span>
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
