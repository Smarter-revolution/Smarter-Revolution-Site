// ============================================
// UPLOAD API HANDLER
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '../auth'
import { createImageAdapter, isImageUploadConfigured } from '../adapters/factory'
import { validateImageFile } from '../adapters/blob'
import { getConfig } from '../config'

/**
 * Create upload API handler
 * Handles image uploads
 */
export function createUploadHandler() {
  return {
    /**
     * POST - Upload image
     */
    async POST(request: NextRequest) {
      try {
        // Check authentication
        const authenticated = await isAuthenticated()
        if (!authenticated) {
          return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
          )
        }

        // Check if image upload is configured
        if (!isImageUploadConfigured()) {
          return NextResponse.json(
            { success: false, error: 'Image upload not configured' },
            { status: 500 }
          )
        }

        // Parse form data
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
          return NextResponse.json(
            { success: false, error: 'No file provided' },
            { status: 400 }
          )
        }

        // Get config for validation
        const config = getConfig()

        // Validate file
        const validation = validateImageFile(file, {
          maxSize: config.images.maxSize,
          allowedTypes: config.images.allowedTypes,
        })

        if (!validation.valid) {
          return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 }
          )
        }

        // Get image adapter and upload
        const imageAdapter = createImageAdapter()
        const url = await imageAdapter.upload(file)

        return NextResponse.json({
          success: true,
          url,
        })
      } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Upload failed' 
          },
          { status: 500 }
        )
      }
    },
  }
}
