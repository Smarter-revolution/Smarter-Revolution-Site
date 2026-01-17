'use client'

import { ContactBlockData, EditorProps } from '@/src/lib/types'

export function ContactEditor({ data, onChange }: EditorProps<ContactBlockData>) {
  const updateField = <K extends keyof ContactBlockData>(field: K, value: ContactBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Headline
        </label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Get in Touch"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body Text
        </label>
        <textarea
          value={data.body || ''}
          onChange={(e) => updateField('body', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="We'd love to hear from you..."
        />
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="hello@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Main St, City"
          />
        </div>
      </div>

      {/* Contact Form Toggle */}
      <div className="flex items-center space-x-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.showForm ?? true}
            onChange={(e) => updateField('showForm', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm font-medium text-gray-700">Show Contact Form</span>
      </div>

      {/* Map Embed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Maps Embed URL (optional)
        </label>
        <input
          type="text"
          value={data.mapEmbed || ''}
          onChange={(e) => updateField('mapEmbed', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Paste the embed URL from Google Maps (not the share link)
        </p>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preview
        </label>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{data.headline || 'Get in Touch'}</h3>
          {data.body && <p className="text-gray-600 mb-4">{data.body}</p>}
          
          <div className="space-y-2 text-sm">
            {data.email && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">📧</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">📞</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.address && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">📍</span>
                <span>{data.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
