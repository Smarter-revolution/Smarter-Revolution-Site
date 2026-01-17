'use client'

import { Plus, Trash2 } from 'lucide-react'
import { ImageUploader } from '../ImageUploader'
import type { TestimonialsBlockData, Testimonial, EditorProps } from '@/lib/types'

export function TestimonialsEditor({ data, onChange }: EditorProps<TestimonialsBlockData>) {
  const updateField = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value })
  }
  
  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const newTestimonials = [...data.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    updateField('testimonials', newTestimonials)
  }
  
  const addTestimonial = () => {
    updateField('testimonials', [...data.testimonials, { quote: '', author: '', company: '', photo: '' }])
  }
  
  const removeTestimonial = (index: number) => {
    const newTestimonials = data.testimonials.filter((_, i) => i !== index)
    updateField('testimonials', newTestimonials)
  }
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials</label>
        <div className="space-y-4">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Testimonial {index + 1}</span>
                <button
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <textarea
                value={testimonial.quote}
                onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                placeholder="Testimonial quote"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={testimonial.author}
                  onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                  placeholder="Author name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={testimonial.company}
                  onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                  placeholder="Company"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Photo (optional)</label>
                <ImageUploader
                  currentImage={testimonial.photo || ''}
                  onUpload={(url) => updateTestimonial(index, 'photo', url)}
                  aspectRatio="square"
                />
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addTestimonial}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>
    </div>
  )
}
