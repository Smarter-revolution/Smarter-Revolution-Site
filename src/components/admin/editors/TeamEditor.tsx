'use client'

import { TeamBlockData, TeamMember, EditorProps } from '@/src/lib/types'
import { ImageUploader } from '../ImageUploader'

export function TeamEditor({ data, onChange }: EditorProps<TeamBlockData>) {
  const updateField = <K extends keyof TeamBlockData>(field: K, value: TeamBlockData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const updateMember = (index: number, updates: Partial<TeamMember>) => {
    const newMembers = [...data.members]
    newMembers[index] = { ...newMembers[index], ...updates }
    updateField('members', newMembers)
  }

  const addMember = () => {
    updateField('members', [
      ...data.members,
      { name: 'Team Member', title: 'Position', photo: '', bio: '' }
    ])
  }

  const removeMember = (index: number) => {
    updateField('members', data.members.filter((_, i) => i !== index))
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
            placeholder="Meet Our Team"
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
            placeholder="The people behind our success"
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
            onClick={() => updateField('layout', 'list')}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              data.layout === 'list'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Team Members ({data.members.length})
          </label>
          <button
            type="button"
            onClick={addMember}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Member
          </button>
        </div>

        <div className="space-y-4">
          {data.members.map((member, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Member {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Photo */}
                <div>
                  <ImageUploader
                    value={member.photo}
                    onChange={(url) => updateMember(index, { photo: url })}
                    label="Photo"
                    aspectRatio="1/1"
                  />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(index, { name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={member.title}
                        onChange={(e) => updateMember(index, { title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="CEO"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Bio</label>
                    <textarea
                      value={member.bio || ''}
                      onChange={(e) => updateMember(index, { bio: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Short bio..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={member.email || ''}
                        onChange={(e) => updateMember(index, { email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={member.linkedin || ''}
                        onChange={(e) => updateMember(index, { linkedin: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.members.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No team members yet. Click &quot;Add Member&quot; to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
