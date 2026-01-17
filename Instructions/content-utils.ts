// /lib/content.ts - Utilities for loading and managing JSON content

import { promises as fs } from 'fs'
import path from 'path'
import type { SiteConfig, PageContent, PageListItem } from './types'

// ============================================
// FILE PATHS
// ============================================

const CONTENT_DIR = path.join(process.cwd(), 'content')
const PAGES_DIR = path.join(CONTENT_DIR, 'pages')
const SITE_CONFIG_PATH = path.join(CONTENT_DIR, 'site.json')

// ============================================
// SIMPLE IN-MEMORY CACHE (dev only)
// ============================================

const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5000 // 5 seconds in development

function getCached<T>(key: string): T | null {
  if (process.env.NODE_ENV === 'production') return null
  
  const cached = cache.get(key)
  if (!cached) return null
  
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  
  return cached.data as T
}

function setCache<T>(key: string, data: T): void {
  if (process.env.NODE_ENV === 'production') return
  cache.set(key, { data, timestamp: Date.now() })
}

// ============================================
// SITE CONFIG
// ============================================

export async function getSiteConfig(): Promise<SiteConfig> {
  const cacheKey = 'site-config'
  const cached = getCached<SiteConfig>(cacheKey)
  if (cached) return cached

  try {
    const raw = await fs.readFile(SITE_CONFIG_PATH, 'utf-8')
    const config = JSON.parse(raw) as SiteConfig
    setCache(cacheKey, config)
    return config
  } catch (error) {
    console.error('Error loading site config:', error)
    // Return default config if file doesn't exist
    return {
      siteName: 'My Site',
      logo: '',
      navigation: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ],
      footer: {
        copyright: `© ${new Date().getFullYear()} My Site`,
        phone: '',
        email: ''
      }
    }
  }
}

// ============================================
// PAGE CONTENT
// ============================================

export async function getPageContent(pageSlug: string): Promise<PageContent | null> {
  const cacheKey = `page-${pageSlug}`
  const cached = getCached<PageContent>(cacheKey)
  if (cached) return cached

  const filePath = path.join(PAGES_DIR, `${pageSlug}.json`)
  
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const content = JSON.parse(raw) as PageContent
    setCache(cacheKey, content)
    return content
  } catch (error) {
    // File doesn't exist or is invalid
    console.error(`Error loading page "${pageSlug}":`, error)
    return null
  }
}

// ============================================
// PAGE LISTING
// ============================================

export async function getAllPages(): Promise<PageListItem[]> {
  const cacheKey = 'all-pages'
  const cached = getCached<PageListItem[]>(cacheKey)
  if (cached) return cached

  try {
    const files = await fs.readdir(PAGES_DIR)
    const jsonFiles = files.filter(f => f.endsWith('.json'))
    
    const pages: PageListItem[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const slug = file.replace('.json', '')
        const content = await getPageContent(slug)
        return {
          slug,
          title: content?.pageTitle || slug
        }
      })
    )
    
    // Sort with home first, then alphabetically
    pages.sort((a, b) => {
      if (a.slug === 'home') return -1
      if (b.slug === 'home') return 1
      return a.title.localeCompare(b.title)
    })
    
    setCache(cacheKey, pages)
    return pages
  } catch (error) {
    console.error('Error listing pages:', error)
    return []
  }
}

export async function getPageSlugs(): Promise<string[]> {
  const pages = await getAllPages()
  return pages.map(p => p.slug)
}

// ============================================
// WRITE OPERATIONS (for local dev testing)
// ============================================

export async function savePageContent(pageSlug: string, content: PageContent): Promise<void> {
  const filePath = path.join(PAGES_DIR, `${pageSlug}.json`)
  const json = JSON.stringify(content, null, 2)
  await fs.writeFile(filePath, json, 'utf-8')
  
  // Clear cache for this page
  cache.delete(`page-${pageSlug}`)
  cache.delete('all-pages')
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const json = JSON.stringify(config, null, 2)
  await fs.writeFile(SITE_CONFIG_PATH, json, 'utf-8')
  
  // Clear cache
  cache.delete('site-config')
}

// ============================================
// VALIDATION
// ============================================

export function validatePageContent(content: unknown): content is PageContent {
  if (!content || typeof content !== 'object') return false
  
  const c = content as Record<string, unknown>
  
  if (typeof c.pageSlug !== 'string') return false
  if (typeof c.pageTitle !== 'string') return false
  if (!c.seo || typeof c.seo !== 'object') return false
  if (!Array.isArray(c.blocks)) return false
  
  return true
}

export function validateSiteConfig(config: unknown): config is SiteConfig {
  if (!config || typeof config !== 'object') return false
  
  const c = config as Record<string, unknown>
  
  if (typeof c.siteName !== 'string') return false
  if (!Array.isArray(c.navigation)) return false
  if (!c.footer || typeof c.footer !== 'object') return false
  
  return true
}

// ============================================
// ENSURE DIRECTORIES EXIST
// ============================================

export async function ensureContentDirs(): Promise<void> {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true })
    await fs.mkdir(PAGES_DIR, { recursive: true })
  } catch (error) {
    // Directories already exist
  }
}
