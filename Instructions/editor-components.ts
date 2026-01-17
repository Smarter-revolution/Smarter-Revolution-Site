// ============================================
// /app/admin/components/editors/HeroEditor.tsx
// ============================================

'use client'

import { ImageUploader } from '../ImageUploader'
import type { HeroBlockData, EditorProps } from '@/lib/types'

export function HeroEditor({ data, onChange }: EditorProps<HeroBlockData>) {
  const update = (field: keyof HeroBlockData, value: any) => {
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


// ============================================
// /app/admin/components/editors/TextImageEditor.tsx
// ============================================

'use client'

import { ImageUploader } from '../ImageUploader'
import type { TextImageBlockData, EditorProps } from '@/lib/types'

export function TextImageEditor({ data, onChange }: EditorProps<TextImageBlockData>) {
  const update = (field: keyof TextImageBlockData, value: any) => {
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


// ============================================
// /app/admin/components/editors/ServicesGridEditor.tsx
// ============================================

'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { ServicesGridBlockData, ServiceItem, EditorProps } from '@/lib/types'

const iconOptions = ['star', 'shield', 'zap', 'target', 'users', 'lightbulb', 'trending', 'award']

export function ServicesGridEditor({ data, onChange }: EditorProps<ServicesGridBlockData>) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }
  
  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    const newServices = [...data.services]
    newServices[index] = { ...newServices[index], [field]: value }
    updateField('services', newServices)
  }
  
  const addService = () => {
    updateField('services', [...data.services, { title: '', description: '', icon: 'star' }])
  }
  
  const removeService = (index: number) => {
    const newServices = data.services.filter((_, i) => i !== index)
    updateField('services', newServices)
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline (optional)</label>
        <input
          type="text"
          value={data.subheadline || ''}
          onChange={(e) => updateField('subheadline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
        <div className="space-y-4">
          {data.services.map((service, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Service {index + 1}</span>
                <button
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={service.title}
                onChange={(e) => updateService(index, 'title', e.target.value)}
                placeholder="Service title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <textarea
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                placeholder="Service description"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <select
                value={service.icon}
                onChange={(e) => updateService(index, 'icon', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        <button
          onClick={addService}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>
    </div>
  )
}


// ============================================
// /app/admin/components/editors/TestimonialsEditor.tsx
// ============================================

'use client'

import { Plus, Trash2 } from 'lucide-react'
import { ImageUploader } from '../ImageUploader'
import type { TestimonialsBlockData, Testimonial, EditorProps } from '@/lib/types'

export function TestimonialsEditor({ data, onChange }: EditorProps<TestimonialsBlockData>) {
  const updateField = (field: string, value: any) => {
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


// ============================================
// /app/admin/components/editors/CTAEditor.tsx
// ============================================

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
  const update = (field: keyof CTABlockData, value: any) => {
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


// ============================================
// /app/admin/components/editors/TeamEditor.tsx
// ============================================

'use client'

import { Plus, Trash2 } from 'lucide-react'
import { ImageUploader } from '../ImageUploader'
import type { TeamBlockData, TeamMember, EditorProps } from '@/lib/types'

export function TeamEditor({ data, onChange }: EditorProps<TeamBlockData>) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }
  
  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...data.members]
    newMembers[index] = { ...newMembers[index], [field]: value }
    updateField('members', newMembers)
  }
  
  const addMember = () => {
    updateField('members', [...data.members, { name: '', title: '', bio: '', photo: '' }])
  }
  
  const removeMember = (index: number) => {
    const newMembers = data.members.filter((_, i) => i !== index)
    updateField('members', newMembers)
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline (optional)</label>
        <input
          type="text"
          value={data.subheadline || ''}
          onChange={(e) => updateField('subheadline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
        <div className="space-y-4">
          {data.members.map((member, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Member {index + 1}</span>
                <button
                  onClick={() => removeMember(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={member.title}
                  onChange={(e) => updateMember(index, 'title', e.target.value)}
                  placeholder="Title/Position"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              
              <textarea
                value={member.bio}
                onChange={(e) => updateMember(index, 'bio', e.target.value)}
                placeholder="Short bio"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Photo</label>
                <ImageUploader
                  currentImage={member.photo}
                  onUpload={(url) => updateMember(index, 'photo', url)}
                  aspectRatio="square"
                />
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addMember}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>
    </div>
  )
}


// ============================================
// /app/admin/components/editors/ContactEditor.tsx
// ============================================

'use client'

import type { ContactBlockData, EditorProps } from '@/lib/types'

export function ContactEditor({ data, onChange }: EditorProps<ContactBlockData>) {
  const update = (field: keyof ContactBlockData, value: any) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address (optional)</label>
        <input
          type="text"
          value={data.address || ''}
          onChange={(e) => update('address', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.showForm}
            onChange={(e) => update('showForm', e.target.checked)}
            className="rounded text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Show Contact Form</span>
        </label>
      </div>
    </div>
  )
}


// ============================================
// /app/admin/components/editors/FAQEditor.tsx
// ============================================

'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { FAQBlockData, FAQItem, EditorProps } from '@/lib/types'

export function FAQEditor({ data, onChange }: EditorProps<FAQBlockData>) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }
  
  const updateQuestion = (index: number, field: keyof FAQItem, value: string) => {
    const newQuestions = [...data.questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    updateField('questions', newQuestions)
  }
  
  const addQuestion = () => {
    updateField('questions', [...data.questions, { question: '', answer: '' }])
  }
  
  const removeQuestion = (index: number) => {
    const newQuestions = data.questions.filter((_, i) => i !== index)
    updateField('questions', newQuestions)
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Questions & Answers</label>
        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Q&A {index + 1}</span>
                <button
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                placeholder="Question"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              
              <textarea
                value={item.answer}
                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                placeholder="Answer"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={addQuestion}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>
    </div>
  )
}


// ============================================
// /app/admin/components/editors/index.ts
// ============================================

import type { BlockType } from '@/lib/types'
import { HeroEditor } from './HeroEditor'
import { TextImageEditor } from './TextImageEditor'
import { ServicesGridEditor } from './ServicesGridEditor'
import { TestimonialsEditor } from './TestimonialsEditor'
import { CTAEditor } from './CTAEditor'
import { TeamEditor } from './TeamEditor'
import { ContactEditor } from './ContactEditor'
import { FAQEditor } from './FAQEditor'

export { HeroEditor } from './HeroEditor'
export { TextImageEditor } from './TextImageEditor'
export { ServicesGridEditor } from './ServicesGridEditor'
export { TestimonialsEditor } from './TestimonialsEditor'
export { CTAEditor } from './CTAEditor'
export { TeamEditor } from './TeamEditor'
export { ContactEditor } from './ContactEditor'
export { FAQEditor } from './FAQEditor'

const editorMap: Record<BlockType, React.ComponentType<any>> = {
  hero: HeroEditor,
  textImage: TextImageEditor,
  servicesGrid: ServicesGridEditor,
  testimonials: TestimonialsEditor,
  cta: CTAEditor,
  team: TeamEditor,
  contact: ContactEditor,
  faq: FAQEditor
}

export function getEditorForBlockType(type: BlockType) {
  return editorMap[type] || null
}
                