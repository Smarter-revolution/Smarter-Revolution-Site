'use client'

import { ServicesGridBlockData, ServiceItem, EditorProps } from '@/src/lib/types'

export function ServicesGridEditor({ data, onChange }: EditorProps<ServicesGridBlockData>) {
  const updateField = <K extends keyof ServicesGridBlockData>(field: K, value: ServicesGridBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const updateService = (index: number, updates: Partial<ServiceItem>) => {
    const newServices = [...data.services]
    newServices[index] = { ...newServices[index], ...updates }
    updateField('services', newServices)
  }

  const addService = () => {
    updateField('services', [
      ...data.services,
      { title: 'New Service', description: 'Service description', icon: 'star' }
    ])
  }

  const removeService = (index: number) => {
    updateField('services', data.services.filter((_, i) => i !== index))
  }

  const iconOptions = [
    { value: 'star', label: '⭐ Star' },
    { value: 'shield', label: '🛡️ Shield' },
    { value: 'zap', label: '⚡ Zap' },
    { value: 'heart', label: '❤️ Heart' },
    { value: 'target', label: '🎯 Target' },
    { value: 'rocket', label: '🚀 Rocket' },
    { value: 'check', label: '✅ Check' },
    { value: 'globe', label: '🌐 Globe' },
    { value: 'users', label: '👥 Users' },
    { value: 'code', label: '💻 Code' },
    { value: 'chart', label: '📊 Chart' },
    { value: 'mail', label: '📧 Mail' },
  ]

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
            placeholder="Our Services"
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
            placeholder="What we offer"
          />
        </div>
      </div>

      {/* Columns */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grid Columns
        </label>
        <div className="flex space-x-2">
          {[2, 3, 4].map((cols) => (
            <button
              key={cols}
              type="button"
              onClick={() => updateField('columns', cols as 2 | 3 | 4)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                data.columns === cols
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {cols} Columns
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Services ({data.services.length})
          </label>
          <button
            type="button"
            onClick={addService}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Service
          </button>
        </div>

        <div className="space-y-4">
          {data.services.map((service, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Service {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(index, { icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(index, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Service title"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  value={service.description}
                  onChange={(e) => updateService(index, { description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Service description"
                />
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Link (optional)</label>
                <input
                  type="text"
                  value={service.link || ''}
                  onChange={(e) => updateService(index, { link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/services/service-name"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
