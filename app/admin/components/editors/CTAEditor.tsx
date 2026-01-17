'use client'

import type { CTABlockData, EditorProps } from '@/lib/types'

const colorPresets = [
  { name: 'Dark', bg: '#1a1a1a', text: '#ffffff' },
  { name: 'Blue', bg: '#1e40af', text: '#ffffff' },
  { name: 'Green', bg: '#166534', text: '#ffffff' },
  { name: 'Purple', bg: '#6b21a8', text: '#ffffff' },
  { name: 'Light', bg: '#f3f4f6', text: '#1a1a1a' },
]

export function CTAEditor({ data, onChange }: EditorProps<CTABlockData>) {
  const update = (field: keyof CTABlockData, value: string) => {
    onChange({ ...data, [field]: value })
  }
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => update('headline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Body Text</label>
        <textarea
          value={data.body}
          onChange={(e) => update('body', e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={data.buttonText}
            onChange={(e) => update('buttonText', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={data.buttonLink}
            onChange={(e) => update('buttonLink', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                update('backgroundColor', preset.bg)
                update('textColor', preset.text)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                data.backgroundColor === preset.bg 
                  ? 'border-blue-500' 
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: preset.bg, color: preset.text }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
