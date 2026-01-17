'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { PageContent, Block } from '@/src/lib/types'
import { BlockEditor } from '@/src/components/admin/BlockEditor'
import { AddBlockModal } from '@/src/components/admin/AddBlockModal'
import { SaveButton } from '@/src/components/admin/SaveButton'

interface PageEditorProps {
  params: Promise<{ pageSlug: string }>
}

export default function PageEditor({ params }: PageEditorProps) {
  const { pageSlug } = use(params)
  const router = useRouter()
  
  const [content, setContent] = useState<PageContent | null>(null)
  const [originalContent, setOriginalContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [pageSlug])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${pageSlug}`)
      const data = await response.json()
      
      if (data.success) {
        setContent(data.data)
        setOriginalContent(JSON.stringify(data.data))
      } else {
        setError(data.error || 'Failed to load page')
      }
    } catch (err) {
      setError('Failed to fetch content')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const hasChanges = content ? JSON.stringify(content) !== originalContent : false

  const handleSave = async () => {
    if (!content) return
    
    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug,
          content,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOriginalContent(JSON.stringify(content))
        setLastSaved(new Date())
      } else {
        setError(data.error || 'Save failed')
      }
    } catch (err) {
      setError('Failed to save content')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleBlockChange = (index: number, updatedBlock: Block) => {
    if (!content) return
    
    const newBlocks = [...content.blocks]
    newBlocks[index] = updatedBlock
    setContent({ ...content, blocks: newBlocks })
  }

  const handleBlockDelete = (index: number) => {
    if (!content) return
    
    const newBlocks = content.blocks.filter((_, i) => i !== index)
    setContent({ ...content, blocks: newBlocks })
  }

  const handleBlockMove = (index: number, direction: 'up' | 'down') => {
    if (!content) return
    
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= content.blocks.length) return

    const newBlocks = [...content.blocks]
    const [removed] = newBlocks.splice(index, 1)
    newBlocks.splice(newIndex, 0, removed)
    setContent({ ...content, blocks: newBlocks })
  }

  const handleAddBlock = (newBlock: Block) => {
    if (!content) return
    setContent({ ...content, blocks: [...content.blocks, newBlock] })
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading page content...</p>
        </div>
      </div>
    )
  }

  if (error && !content) {
    return (
      <div className="p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push('/admin')}
              className="text-gray-500 hover:text-gray-700 mb-2 flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Editing: {content?.pageTitle || pageSlug}
            </h1>
          </div>
          
          <SaveButton
            onClick={handleSave}
            saving={saving}
            hasChanges={hasChanges}
            lastSaved={lastSaved}
          />
        </div>

        {error && (
          <div className="px-8 py-3 bg-red-50 border-t border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Page Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={content?.pageTitle || ''}
                onChange={(e) => content && setContent({ ...content, pageTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Slug
              </label>
              <input
                type="text"
                value={content?.pageSlug || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Content Blocks ({content?.blocks.length || 0})
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Block
            </button>
          </div>

          {content?.blocks.length === 0 ? (
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blocks yet</h3>
              <p className="text-gray-500 mb-4">Add your first content block to get started.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Your First Block
              </button>
            </div>
          ) : (
            content?.blocks.map((block, index) => (
              <BlockEditor
                key={block.id}
                block={block}
                onChange={(updated) => handleBlockChange(index, updated)}
                onDelete={() => handleBlockDelete(index)}
                onMoveUp={() => handleBlockMove(index, 'up')}
                onMoveDown={() => handleBlockMove(index, 'down')}
                isFirst={index === 0}
                isLast={index === content.blocks.length - 1}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Block Modal */}
      <AddBlockModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddBlock}
      />
    </div>
  )
}
