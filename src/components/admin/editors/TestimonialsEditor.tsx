'use client'

import { TestimonialsBlockData, TestimonialItem, EditorProps } from '@/src/lib/types'
import { ImageUploader } from '../ImageUploader'

export function TestimonialsEditor({ data, onChange }: EditorProps<TestimonialsBlockData>) {
  const updateField = <K extends keyof TestimonialsBlockData>(field: K, value: TestimonialsBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const updateTestimonial = (index: number, updates: Partial<TestimonialItem>) => {
    const newTestimonials = [...data.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], ...updates }
    updateField('testimonials', newTestimonials)
  }

  const addTestimonial = () => {
    updateField('testimonials', [
      ...data.testimonials,
      { quote: 'Great experience!', author: 'Customer Name', company: 'Company', rating: 5 }
    ])
  }

  const removeTestimonial = (index: number) => {
    updateField('testimonials', data.testimonials.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Headline
          </label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => updateField('headline', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What Our Clients Say"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subheadline
          </label>
          <input
            type="text"
            value={data.subheadline || ''}
            onChange={(e) => updateField('subheadline', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Trusted by businesses worldwide"
          />
        </div>
      </div>

      {/* Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Layout
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => updateField('layout', 'grid')}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              data.layout === 'grid'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => updateField('layout', 'carousel')}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              data.layout === 'carousel'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Carousel
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Testimonials ({data.testimonials.length})
          </label>
          <button
            type="button"
            onClick={addTestimonial}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Testimonial
          </button>
        </div>

        <div className="space-y-4">
          {data.testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Testimonial {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              {/* Quote */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(index, { quote: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="What the customer said..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Author */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Author</label>
                  <input
                    type="text"
                    value={testimonial.author}
                    onChange={(e) => updateTestimonial(index, { author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                  <input
                    type="text"
                    value={testimonial.company || ''}
                    onChange={(e) => updateTestimonial(index, { company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Company Inc."
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
                  <select
                    value={testimonial.rating || 5}
                    onChange={(e) => updateTestimonial(index, { rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4)</option>
                    <option value={3}>⭐⭐⭐ (3)</option>
                    <option value={2}>⭐⭐ (2)</option>
                    <option value={1}>⭐ (1)</option>
                  </select>
                </div>
              </div>

              {/* Photo */}
              <div className="mt-4">
                <ImageUploader
                  value={testimonial.photo || ''}
                  onChange={(url) => updateTestimonial(index, { photo: url })}
                  label="Photo (optional)"
                  aspectRatio="1/1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
