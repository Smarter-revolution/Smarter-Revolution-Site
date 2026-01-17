'use client'

import { ImageUploader } from '../ImageUploader'
import type { TextImageBlockData, EditorProps } from '@/lib/types'

export function TextImageEditor({ data, onChange }: EditorProps<TextImageBlockData>) {
  const update = (field: keyof TextImageBlockData, value: string) => {
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
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Position</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={data.imagePosition === 'left'}
              onChange={() => update('imagePosition', 'left')}
              className="text-blue-600"
            />
            <span>Left</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={data.imagePosition === 'right'}
              onChange={() => update('imagePosition', 'right')}
              className="text-blue-600"
            />
            <span>Right</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <ImageUploader
          currentImage={data.image}
          onUpload={(url) => update('image', url)}
          aspectRatio="video"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
        <input
          type="text"
          value={data.imageAlt}
          onChange={(e) => update('imageAlt', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the image for accessibility"
        />
      </div>
    </div>
  )
}
