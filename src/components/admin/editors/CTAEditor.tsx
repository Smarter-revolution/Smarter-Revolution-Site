'use client'

import { CTABlockData, EditorProps } from '@/src/lib/types'

export function CTAEditor({ data, onChange }: EditorProps<CTABlockData>) {
  const updateField = <K extends keyof CTABlockData>(field: K, value: CTABlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const presetColors = [
    { bg: '#2563eb', text: '#ffffff', name: 'Blue' },
    { bg: '#059669', text: '#ffffff', name: 'Green' },
    { bg: '#7c3aed', text: '#ffffff', name: 'Purple' },
    { bg: '#dc2626', text: '#ffffff', name: 'Red' },
    { bg: '#ea580c', text: '#ffffff', name: 'Orange' },
    { bg: '#0891b2', text: '#ffffff', name: 'Cyan' },
    { bg: '#1e293b', text: '#ffffff', name: 'Dark' },
    { bg: '#f1f5f9', text: '#1e293b', name: 'Light' },
  ]

  return (
    <div className="space-y-6">
      {/* Headline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Headline
        </label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ready to Get Started?"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body Text
        </label>
        <textarea
          value={data.body}
          onChange={(e) => updateField('body', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Encourage visitors to take action..."
        />
      </div>

      {/* Button */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={data.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contact Us"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Link
          </label>
          <input
            type="text"
            value={data.buttonLink}
            onChange={(e) => updateField('buttonLink', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="/contact"
          />
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Color Theme
        </label>
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                updateField('backgroundColor', preset.bg)
                updateField('textColor', preset.text)
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                data.backgroundColor === preset.bg
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: preset.bg }}
            >
              <span style={{ color: preset.text }} className="text-sm font-medium">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={data.backgroundColor || '#2563eb'}
              onChange={(e) => updateField('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.backgroundColor || '#2563eb'}
              onChange={(e) => updateField('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="#2563eb"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={data.textColor || '#ffffff'}
              onChange={(e) => updateField('textColor', e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={data.textColor || '#ffffff'}
              onChange={(e) => updateField('textColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview
        </label>
        <div 
          className="p-6 rounded-lg text-center"
          style={{ 
            backgroundColor: data.backgroundColor || '#2563eb',
            color: data.textColor || '#ffffff'
          }}
        >
          <h3 className="text-xl font-bold mb-2">{data.headline || 'Your Headline'}</h3>
          <p className="mb-4 opacity-90">{data.body || 'Your body text here'}</p>
          <button className="px-6 py-2 bg-white/20 rounded-lg font-medium hover:bg-white/30 transition-colors">
            {data.buttonText || 'Button'}
          </button>
        </div>
      </div>
    </div>
  )
}
