'use client'

import { useState } from 'react'
import { ChevronDown, Trash2, GripVertical, Layout, Type, Image, Users, MessageSquare, Phone, HelpCircle, Megaphone, Grid3X3 } from 'lucide-react'
import type { Block, BlockData, BlockType } from '@/lib/types'
import { blockTypeLabels } from '@/lib/types'
import { getEditorForBlockType } from './editors'

interface BlockEditorProps {
  block: Block
  index?: number
  onChange: (data: BlockData) => void
  onDelete: () => void
}

const blockIcons: Record<BlockType, React.ReactNode> = {
  hero: <Layout className="w-5 h-5" />,
  textImage: <Image className="w-5 h-5" />,
  servicesGrid: <Grid3X3 className="w-5 h-5" />,
  testimonials: <MessageSquare className="w-5 h-5" />,
  cta: <Megaphone className="w-5 h-5" />,
  team: <Users className="w-5 h-5" />,
  contact: <Phone className="w-5 h-5" />,
  faq: <HelpCircle className="w-5 h-5" />,
}

export function BlockEditor({ block, index, onChange, onDelete }: BlockEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const EditorComponent = getEditorForBlockType(block.type)
  const label = blockTypeLabels[block.type] || block.type
  const icon = blockIcons[block.type] || <Type className="w-5 h-5" />
  
  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete()
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }
  
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
      expanded ? 'border-red-200 shadow-lg shadow-red-500/5' : 'border-slate-200 hover:border-slate-300'
    }`}>
      {/* Header */}
      <div 
        className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${
          expanded ? 'bg-red-50/50' : 'hover:bg-slate-50'
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <GripVertical className="w-5 h-5 cursor-grab" />
            {typeof index === 'number' && (
              <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded-md">
                #{index + 1}
              </span>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            expanded ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {icon}
          </div>
          <div>
            <span className="font-semibold text-slate-900">{label}</span>
            <p className="text-xs text-slate-500">Click to {expanded ? 'collapse' : 'expand'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              showDeleteConfirm 
                ? 'bg-red-500 text-white' 
                : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {showDeleteConfirm && <span>Confirm?</span>}
          </button>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
            expanded ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'
          }`}>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className={`transition-all duration-300 overflow-hidden ${
        expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 border-t border-slate-200 bg-white">
          {EditorComponent ? (
            <EditorComponent data={block.data as never} onChange={onChange} />
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500">No editor available for this block type.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
