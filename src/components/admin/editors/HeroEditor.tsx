'use client'

import { HeroBlockData, EditorProps } from '@/src/lib/types'
import { ImageUploader } from '../ImageUploader'

export function HeroEditor({ data, onChange }: EditorProps<HeroBlockData>) {
  const updateField = <K extends keyof HeroBlockData>(field: K, value: HeroBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

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
          placeholder="Your main headline"
        />
      </div>

      {/* Subheadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subheadline
        </label>
        <textarea
          value={data.subheadline}
          onChange={(e) => updateField('subheadline', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Supporting text for your headline"
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
            placeholder="Get Started"
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

      {/* Background Image */}
      <ImageUploader
        value={data.backgroundImage}
        onChange={(url) => updateField('backgroundImage', url)}
        label="Background Image"
        aspectRatio="21/9"
      />

      {/* Advanced Options */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Advanced Options</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Overlay Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overlay Opacity: {Math.round((data.overlayOpacity || 0.5) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={(data.overlayOpacity || 0.5) * 100}
              onChange={(e) => updateField('overlayOpacity', parseInt(e.target.value) / 100)}
              className="w-full"
            />
          </div>

          {/* Text Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Alignment
            </label>
            <select
              value={data.textAlignment || 'center'}
              onChange={(e) => updateField('textAlignment', e.target.value as 'left' | 'center' | 'right')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
