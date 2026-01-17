'use client'

import { BlockType, blockTypeLabels, blockTypeIcons, createNewBlock } from '@/src/lib/types'

interface AddBlockModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (block: ReturnType<typeof createNewBlock>) => void
  enabledBlocks?: BlockType[]
}

const defaultEnabledBlocks: BlockType[] = [
  'hero',
  'textImage',
  'servicesGrid',
  'testimonials',
  'cta',
  'team',
  'contact',
  'faq',
]

export function AddBlockModal({ 
  isOpen, 
  onClose, 
  onAdd,
  enabledBlocks = defaultEnabledBlocks
}: AddBlockModalProps) {
  if (!isOpen) return null

  const handleAdd = (type: BlockType) => {
    const newBlock = createNewBlock(type)
    onAdd(newBlock)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Block</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Block types grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {enabledBlocks.map((type) => (
              <button
                key={type}
                onClick={() => handleAdd(type)}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {blockTypeIcons[type]}
                </span>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {blockTypeLabels[type]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Click on a block type to add it to your page
          </p>
        </div>
      </div>
    </div>
  )
}
