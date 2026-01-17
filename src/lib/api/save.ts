// ============================================
// SAVE API HANDLER
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '../auth'
import { createStorageAdapter, isStorageConfigured } from '../adapters/factory'
import { PageContent } from '../types'

interface SaveRequest {
  pageSlug: string
  content: PageContent
}

/**
 * Create save API handler
 * Handles saving page content to storage
 */
export function createSaveHandler() {
  return {
    /**
     * POST - Save page content
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

        // Parse request body
        const body: SaveRequest = await request.json()
        const { pageSlug, content } = body

        if (!pageSlug || !content) {
          return NextResponse.json(
            { success: false, error: 'Missing pageSlug or content' },
            { status: 400 }
          )
        }

        // Validate content structure
        if (!content.pageTitle || !Array.isArray(content.blocks)) {
          return NextResponse.json(
            { success: false, error: 'Invalid content structure' },
            { status: 400 }
          )
        }

        // Check if storage is configured
        if (!isStorageConfigured()) {
          return NextResponse.json(
            { success: false, error: 'Storage not configured' },
            { status: 500 }
          )
        }

        // Get storage adapter
        const storage = createStorageAdapter()

        // Prepare content for storage
        const contentPath = `pages/${pageSlug}.json`
        const contentString = JSON.stringify(content, null, 2)

        // Save to storage
        await storage.write(
          contentPath,
          contentString,
          `Update ${pageSlug} page content`
        )

        return NextResponse.json({
          success: true,
          message: 'Content saved successfully',
        })
      } catch (error) {
        console.error('Save error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Save failed' 
          },
          { status: 500 }
        )
      }
    },
  }
}
