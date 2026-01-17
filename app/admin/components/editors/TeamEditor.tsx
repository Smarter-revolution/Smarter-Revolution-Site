'use client'

import { Plus, Trash2 } from 'lucide-react'
import { ImageUploader } from '../ImageUploader'
import type { TeamBlockData, TeamMember, EditorProps } from '@/lib/types'

export function TeamEditor({ data, onChange }: EditorProps<TeamBlockData>) {
  const updateField = (field: string, value: unknown) => {
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
