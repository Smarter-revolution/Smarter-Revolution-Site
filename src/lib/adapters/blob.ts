// ============================================
// VERCEL BLOB IMAGE ADAPTER
// ============================================

import { put, del } from '@vercel/blob'
import { ImageAdapter } from '../types'

interface BlobAdapterConfig {
  token?: string
}

export class VercelBlobAdapter implements ImageAdapter {
  private token?: string

  constructor(config?: BlobAdapterConfig) {
    this.token = config?.token || process.env.BLOB_READ_WRITE_TOKEN
  }

  /**
   * Upload an image to Vercel Blob
   */
  async upload(file: File, filename?: string): Promise<string> {
    // Generate unique filename if not provided
    const timestamp = Date.now()
    const safeName = (filename || file.name).replace(/[^a-zA-Z0-9.-]/g, '-')
    const uniqueFilename = `${timestamp}-${safeName}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: 'public',
      token: this.token,
    })

    return blob.url
  }

  /**
   * Delete an image from Vercel Blob
   */
  async delete(url: string): Promise<void> {
    try {
      await del(url, { token: this.token })
    } catch (error) {
      // Log but don't throw - image might already be deleted
      console.warn('Failed to delete blob:', error)
    }
  }
}

/**
 * Create a Vercel Blob adapter from environment
 */
export function createBlobAdapter(): VercelBlobAdapter | null {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null
  }
  return new VercelBlobAdapter()
}

/**
 * Validate image file before upload
 */
export function validateImageFile(
  file: File,
  options?: {
    maxSize?: number
    allowedTypes?: string[]
  }
): { valid: boolean; error?: string } {
  const maxSize = options?.maxSize || 5 * 1024 * 1024 // 5MB default
  const allowedTypes = options?.allowedTypes || [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ]

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    }
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    }
  }

  return { valid: true }
}
