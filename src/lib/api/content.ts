// ============================================
// CONTENT API HANDLER
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { createStorageAdapter } from '../adapters/factory'
import { PageContent, SiteConfig, PageListItem } from '../types'

/**
 * Create content API handler
 * Handles fetching page content, site config, and page lists
 */
export function createContentHandler() {
  return {
    /**
     * GET - Fetch page content by slug
     */
    async getPage(slug: string) {
      try {
        const storage = createStorageAdapter()
        const content = await storage.read(`pages/${slug}.json`)

        if (!content) {
          return NextResponse.json(
            { success: false, error: 'Page not found' },
            { status: 404 }
          )
        }

        const pageContent: PageContent = JSON.parse(content)

        return NextResponse.json({
          success: true,
          data: pageContent,
        })
      } catch (error) {
        console.error('Content fetch error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch content' 
          },
          { status: 500 }
        )
      }
    },

    /**
     * GET - Fetch site configuration
     */
    async getSiteConfig() {
      try {
        const storage = createStorageAdapter()
        const content = await storage.read('site.json')

        if (!content) {
          // Return default config if not found
          const defaultConfig: SiteConfig = {
            siteName: 'My Website',
            logo: '',
            navigation: [],
            footer: {
              copyright: `© ${new Date().getFullYear()} My Website`,
            },
          }
          return NextResponse.json({
            success: true,
            data: defaultConfig,
          })
        }

        const siteConfig: SiteConfig = JSON.parse(content)

        return NextResponse.json({
          success: true,
          data: siteConfig,
        })
      } catch (error) {
        console.error('Site config fetch error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch site config' 
          },
          { status: 500 }
        )
      }
    },

    /**
     * GET - Fetch list of all pages
     */
    async getPageList() {
      try {
        const storage = createStorageAdapter()
        const files = await storage.list('pages')

        const pages: PageListItem[] = []

        for (const file of files) {
          if (file.endsWith('.json')) {
            const slug = file.replace('.json', '')
            const content = await storage.read(`pages/${file}`)
            
            if (content) {
              try {
                const pageContent: PageContent = JSON.parse(content)
                pages.push({
                  slug,
                  title: pageContent.pageTitle,
                })
              } catch {
                // Skip invalid JSON files
                pages.push({
                  slug,
                  title: slug.charAt(0).toUpperCase() + slug.slice(1),
                })
              }
            }
          }
        }

        return NextResponse.json({
          success: true,
          data: pages,
        })
      } catch (error) {
        console.error('Page list fetch error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch page list' 
          },
          { status: 500 }
        )
      }
    },
  }
}

/**
 * Helper to create page content API route handler
 */
export function createPageContentRoute() {
  const handler = createContentHandler()
  
  return async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ page: string }> }
  ) {
    const { page } = await params
    return handler.getPage(page)
  }
}

/**
 * Helper to create site config API route handler
 */
export function createSiteConfigRoute() {
  const handler = createContentHandler()
  
  return async function GET() {
    return handler.getSiteConfig()
  }
}

/**
 * Helper to create page list API route handler
 */
export function createPageListRoute() {
  const handler = createContentHandler()
  
  return async function GET() {
    return handler.getPageList()
  }
}
