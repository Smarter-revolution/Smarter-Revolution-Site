// ============================================
// /app/api/admin/auth/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { verifyPassword, createSession, getSessionCookieConfig, destroySession, getSessionFromCookie, getClearSessionCookieConfig } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }
    
    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create session and set cookie
    const token = createSession()
    const cookieConfig = getSessionCookieConfig(token)
    
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookieConfig)
    
    return response
    
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const token = await getSessionFromCookie()
    
    if (token) {
      destroySession(token)
    }
    
    const cookieConfig = getClearSessionCookieConfig()
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookieConfig)
    
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}

// Check auth status
export async function GET() {
  try {
    const token = await getSessionFromCookie()
    
    if (!token) {
      return NextResponse.json({ authenticated: false })
    }
    
    const { verifySession } = await import('@/lib/auth')
    const isValid = verifySession(token)
    
    return NextResponse.json({ authenticated: isValid })
    
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}


// ============================================
// /app/api/admin/save/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { commitContentFile, isGitHubConfigured } from '@/lib/github'
import { savePageContent, validatePageContent } from '@/lib/content'
import type { PageContent } from '@/lib/types'

export async function POST(request: Request) {
  // Check authentication
  const auth = await requireAuth()
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    const { pageSlug, content } = body as { pageSlug: string; content: PageContent }
    
    if (!pageSlug || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing pageSlug or content' },
        { status: 400 }
      )
    }
    
    if (!validatePageContent(content)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content structure' },
        { status: 400 }
      )
    }
    
    // Convert content to JSON string
    const jsonContent = JSON.stringify(content, null, 2)
    const filePath = `content/pages/${pageSlug}.json`
    const commitMessage = `Update ${content.pageTitle} page content`
    
    // If GitHub is configured, commit to repo
    if (isGitHubConfigured()) {
      const result = await commitContentFile(filePath, jsonContent, commitMessage)
      
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || 'Failed to save to GitHub' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        message: 'Saved! Your changes will be live in about 60 seconds.',
        commitUrl: result.commitUrl
      })
    }
    
    // Fallback: save locally (for development)
    await savePageContent(pageSlug, content)
    
    return NextResponse.json({
      success: true,
      message: 'Saved locally. Note: GitHub integration not configured.'
    })
    
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    )
  }
}


// ============================================
// /app/api/admin/upload/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireAuth } from '@/lib/auth'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  // Check authentication
  const auth = await requireAuth()
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }
    
    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      )
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
    const filename = `${timestamp}-${safeName}`
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    })
    
    return NextResponse.json({
      success: true,
      url: blob.url
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}


// ============================================
// /app/api/content/[page]/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { getPageContent } from '@/lib/content'

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  const { page } = params
  
  try {
    const content = await getPageContent(page)
    
    if (!content) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
    
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    )
  }
}


// ============================================
// /app/api/content/pages/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { getAllPages } from '@/lib/content'

export async function GET() {
  try {
    const pages = await getAllPages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Pages list error:', error)
    return NextResponse.json(
      { error: 'Failed to load pages' },
      { status: 500 }
    )
  }
}


// ============================================
// /app/api/content/site/route.ts
// ============================================

import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content'

export async function GET() {
  try {
    const config = await getSiteConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Site config error:', error)
    return NextResponse.json(
      { error: 'Failed to load site config' },
      { status: 500 }
    )
  }
}