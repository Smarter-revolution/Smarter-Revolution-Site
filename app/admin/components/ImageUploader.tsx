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
