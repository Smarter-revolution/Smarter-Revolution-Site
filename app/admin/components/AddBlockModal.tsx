'use client'

import { X, Layout, Columns, Grid, Quote, Megaphone, Users, Mail, HelpCircle, Sparkles } from 'lucide-react'
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

const blockDescriptions: Record<BlockType, string> = {
  hero: 'Large banner with headline and CTA',
  textImage: 'Text content with image',
  servicesGrid: 'Grid of service cards',
  testimonials: 'Customer reviews carousel',
  cta: 'Call-to-action section',
  team: 'Team member profiles',
  contact: 'Contact information',
  faq: 'Frequently asked questions'
}

interface AddBlockModalProps {
  onSelect: (type: BlockType) => void
  onClose: () => void
}

export function AddBlockModal({ onSelect, onClose }: AddBlockModalProps) {
  const blockTypes: BlockType[] = ['hero', 'textImage', 'servicesGrid', 'testimonials', 'cta', 'team', 'contact', 'faq']
  
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add New Block</h2>
              <p className="text-sm text-slate-500">Choose a block type to add to your page</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Block Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
          {blockTypes.map((type) => {
            const Icon = blockTypeIcons[type]
            return (
              <button
                key={type}
                onClick={() => {
                  onSelect(type)
                  onClose()
                }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-slate-200 hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <Icon className="w-7 h-7 text-slate-500 group-hover:text-red-600 transition-colors" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors block">
                    {blockTypeLabels[type]}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {blockDescriptions[type]}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500 text-center">
            Click on a block type to add it to the bottom of your page
          </p>
        </div>
      </div>
    </div>
  )
}
