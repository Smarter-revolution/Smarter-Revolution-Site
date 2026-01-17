'use client'

import { TextImageBlockData, EditorProps } from '@/src/lib/types'
import { ImageUploader } from '../ImageUploader'

export function TextImageEditor({ data, onChange }: EditorProps<TextImageBlockData>) {
  const updateField = <K extends keyof TextImageBlockData>(field: K, value: TextImageBlockData[K]) => {
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
          placeholder="Section headline"
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
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Write your content here..."
        />
      </div>

      {/* Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImageUploader
          value={data.image}
          onChange={(url) => updateField('image', url)}
          label="Image"
          aspectRatio="4/3"
        />
        
        <div className="space-y-4">
          {/* Image Alt Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Alt Text
            </label>
            <input
              type="text"
              value={data.imageAlt}
              onChange={(e) => updateField('imageAlt', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the image"
            />
          </div>

          {/* Image Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Position
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => updateField('imagePosition', 'left')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  data.imagePosition === 'left'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Left
              </button>
              <button
                type="button"
                onClick={() => updateField('imagePosition', 'right')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  data.imagePosition === 'right'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Right
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Button */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Optional Button</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => updateField('buttonText', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Learn More"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={data.buttonLink || ''}
              onChange={(e) => updateField('buttonLink', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="/about"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
