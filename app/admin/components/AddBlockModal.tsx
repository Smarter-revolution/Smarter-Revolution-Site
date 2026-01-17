'use client'

import { X, Layout, Columns, Grid, Quote, Megaphone, Users, Mail, HelpCircle } from 'lucide-react'
import type { BlockType } from '@/lib/types'
import { blockTypeLabels } from '@/lib/types'

const blockTypeIcons: Record<BlockType, React.ComponentType<{ className?: string }>> = {
  hero: Layout,
  textImage: Columns,
  servicesGrid: Grid,
  testimonials: Quote,
  cta: Megaphone,
  team: Users,
  contact: Mail,
  faq: HelpCircle
}

interface AddBlockModalProps {
  onSelect: (type: BlockType) => void
  onClose: () => void
}

export function AddBlockModal({ onSelect, onClose }: AddBlockModalProps) {
  const blockTypes: BlockType[] = ['hero', 'textImage', 'servicesGrid', 'testimonials', 'cta', 'team', 'contact', 'faq']
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Add New Block</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {blockTypes.map((type) => {
            const Icon = blockTypeIcons[type]
            return (
              <button
                key={type}
                onClick={() => {
                  onSelect(type)
                  onClose()
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-8 h-8 text-gray-700" />
                <span className="text-sm font-medium text-center">{blockTypeLabels[type]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
