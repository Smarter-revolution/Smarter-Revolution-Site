'use client'

import { useState } from 'react'
import { Block, BlockType, blockTypeLabels, blockTypeIcons } from '@/src/lib/types'
import { getEditorForBlockType } from './editors'

interface BlockEditorProps {
  block: Block
  onChange: (block: Block) => void
  onDelete: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isFirst?: boolean
  isLast?: boolean
}

export function BlockEditor({ 
  block, 
  onChange, 
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false
}: BlockEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const EditorComponent = getEditorForBlockType(block.type)
  const label = blockTypeLabels[block.type as BlockType] || block.type
  const icon = blockTypeIcons[block.type as BlockType] || '📦'

  const handleDataChange = (data: typeof block.data) => {
    onChange({ ...block, data })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-gray-800">{label}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Move buttons */}
          {onMoveUp && !isFirst && (
            <button
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
              title="Move up"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          
          {onMoveDown && !isLast && (
            <button
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
              title="Move down"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Delete button */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true); }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete block"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {/* Expand/collapse indicator */}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Editor content */}
      {isExpanded && (
        <div className="p-6">
          {EditorComponent ? (
            <EditorComponent data={block.data} onChange={handleDataChange} />
          ) : (
            <p className="text-gray-500 text-sm">No editor available for this block type.</p>
          )}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Block?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {label.toLowerCase()}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete(); setShowDeleteConfirm(false); }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
