'use client'

import { useState } from 'react'
import { ChevronDown, Trash2, GripVertical } from 'lucide-react'
import type { Block, BlockData } from '@/lib/types'
import { blockTypeLabels } from '@/lib/types'
import { getEditorForBlockType } from './editors'

interface BlockEditorProps {
  block: Block
  onChange: (data: BlockData) => void
  onDelete: () => void
}

export function BlockEditor({ block, onChange, onDelete }: BlockEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const EditorComponent = getEditorForBlockType(block.type)
  const label = blockTypeLabels[block.type] || block.type
  
  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete()
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className={`p-1 rounded transition-colors ${
              showDeleteConfirm 
                ? 'bg-red-500 text-white' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {expanded && (
        <div className="p-6 border-t border-gray-200">
          {EditorComponent ? (
            <EditorComponent data={block.data as never} onChange={onChange} />
          ) : (
            <p className="text-gray-500">No editor available for this block type.</p>
          )}
        </div>
      )}
    </div>
  )
}
