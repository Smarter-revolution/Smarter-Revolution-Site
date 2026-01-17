'use client'

import { ImageUploader } from '../ImageUploader'
import type { HeroBlockData, EditorProps } from '@/lib/types'

export function HeroEditor({ data, onChange }: EditorProps<HeroBlockData>) {
  const update = (field: keyof HeroBlockData, value: string | number) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
        <textarea
          value={data.subheadline}
          onChange={(e) => update('subheadline', e.target.value)}
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
            placeholder="/contact"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
        <ImageUploader
          currentImage={data.backgroundImage}
          onUpload={(url) => update('backgroundImage', url)}
          aspectRatio="video"
        />
      </div>
    </div>
  )
}
