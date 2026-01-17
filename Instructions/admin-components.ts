// ============================================
// /app/admin/components/LoginForm.tsx
// ============================================

'use client'

import { useState } from 'react'
import { Lock, Loader2 } from 'lucide-react'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        onSuccess()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-gray-500 text-center mb-6">Enter your password to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              placeholder="Enter admin password"
              disabled={loading}
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


// ============================================
// /app/admin/components/AdminSidebar.tsx
// ============================================

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Settings, LogOut, ExternalLink } from 'lucide-react'
import type { PageListItem } from '@/lib/types'

interface AdminSidebarProps {
  pages: PageListItem[]
  siteName: string
}

export function AdminSidebar({ pages, siteName }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.refresh()
  }
  
  return (
    <aside className="w-64 bg-gray-900 text-white fixed h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="font-bold text-lg">{siteName}</h1>
        <span className="text-gray-400 text-sm">Admin Panel</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Pages</h2>
          <ul className="space-y-1">
            {pages.map((page) => {
              const href = `/admin/${page.slug}`
              const isActive = pathname === href
              
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{page.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Settings</h2>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/admin/settings'
                    ? 'bg-white text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Site</span>
        </a>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}


// ============================================
// /app/admin/components/SaveButton.tsx
// ============================================

'use client'

import { Loader2, Check, Save } from 'lucide-react'

interface SaveButtonProps {
  onClick: () => void
  saving: boolean
  disabled: boolean
  hasChanges: boolean
  lastSaved?: string
}

export function SaveButton({ onClick, saving, disabled, hasChanges, lastSaved }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      {lastSaved && !hasChanges && (
        <span className="text-sm text-gray-500">
          Last saved: {lastSaved}
        </span>
      )}
      
      {hasChanges && !saving && (
        <span className="text-sm text-amber-600 font-medium">
          Unsaved changes
        </span>
      )}
      
      <button
        onClick={onClick}
        disabled={disabled || saving}
        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
          disabled || saving
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : hasChanges ? (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            Saved
          </>
        )}
      </button>
    </div>
  )
}


// ============================================
// /app/admin/components/ImageUploader.tsx
// ============================================

'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Loader2, X } from 'lucide-react'

interface ImageUploaderProps {
  currentImage: string
  onUpload: (url: string) => void
  aspectRatio?: 'video' | 'square' | 'portrait'
}

export function ImageUploader({ currentImage, onUpload, aspectRatio = 'video' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]'
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setError('')
    
    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Use JPG, PNG, WebP, or GIF.')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.')
      return
    }
    
    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)
    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setPreview(data.url)
        onUpload(data.url)
      } else {
        setError(data.error || 'Upload failed')
        setPreview(currentImage)
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
      setPreview(currentImage)
    } finally {
      setUploading(false)
      // Clean up local preview URL
      URL.revokeObjectURL(localPreview)
    }
  }
  
  const handleRemove = () => {
    setPreview('')
    onUpload('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  
  return (
    <div className="space-y-2">
      <div className={`relative ${aspectClasses[aspectRatio]} bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300`}>
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            {!uploading && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {preview ? 'Replace Image' : 'Upload Image'}
      </button>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}


// ============================================
// /app/admin/components/BlockEditor.tsx
// ============================================

'use client'

import { useState } from 'react'
import { ChevronDown, Trash2, GripVertical } from 'lucide-react'
import type { Block } from '@/lib/types'
import { blockTypeLabels, blockTypeIcons } from '@/lib/types'
import { getEditorForBlockType } from './editors'

interface BlockEditorProps {
  block: Block
  onChange: (data: any) => void
  onDelete: () => void
}

export function BlockEditor({ block, onChange, onDelete }: BlockEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const EditorComponent = getEditorForBlockType(block.type)
  const label = blockTypeLabels[block.type] || block.type
  
  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete()
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className={`p-1 rounded transition-colors ${
              showDeleteConfirm 
                ? 'bg-red-500 text-white' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {expanded && (
        <div className="p-6 border-t border-gray-200">
          {EditorComponent ? (
            <EditorComponent data={block.data as any} onChange={onChange} />
          ) : (
            <p className="text-gray-500">No editor available for this block type.</p>
          )}
        </div>
      )}
    </div>
  )
}


// ============================================
// /app/admin/components/AddBlockModal.tsx
// ============================================

'use client'

import { X, Layout, Columns, Grid, Quote, Megaphone, Users, Mail, HelpCircle } from 'lucide-react'
import type { BlockType } from '@/lib/types'
import { blockTypeLabels } from '@/lib/types'

const blockTypeIcons: Record<BlockType, React.ComponentType<{ className?: string }>> = {
  hero: Layout,
  textImage: Columns,
  servicesGrid: Grid,
  testimonials: Quote,
  cta: Megaphone,
  team: Users,
  contact: Mail,
  faq: HelpCircle
}

interface AddBlockModalProps {
  onSelect: (type: BlockType) => void
  onClose: () => void
}

export function AddBlockModal({ onSelect, onClose }: AddBlockModalProps) {
  const blockTypes: BlockType[] = ['hero', 'textImage', 'servicesGrid', 'testimonials', 'cta', 'team', 'contact', 'faq']
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Add New Block</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {blockTypes.map((type) => {
            const Icon = blockTypeIcons[type]
            return (
              <button
                key={type}
                onClick={() => {
                  onSelect(type)
                  onClose()
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-8 h-8 text-gray-700" />
                <span className="text-sm font-medium text-center">{blockTypeLabels[type]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}