'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { ServicesGridBlockData, ServiceItem, EditorProps } from '@/lib/types'

const iconOptions = ['star', 'shield', 'zap', 'target', 'users', 'lightbulb', 'trending', 'award']

export function ServicesGridEditor({ data, onChange }: EditorProps<ServicesGridBlockData>) {
  const updateField = (field: string, value: unknown) => {
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
