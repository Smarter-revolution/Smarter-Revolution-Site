import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { commitContentFile, isGitHubConfigured, getGitHubConfigStatus } from '@/lib/github'
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
        // Return detailed error information for debugging
        return NextResponse.json(
          { 
            success: false, 
            error: result.error || 'Failed to save to GitHub',
            errorDetails: result.errorDetails,
            // Include config status (without sensitive data) for debugging
            configStatus: {
              ...getGitHubConfigStatus(),
              // Mask the token presence for security
              tokenSet: getGitHubConfigStatus().tokenSet
            }
          },
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to save content: ${errorMessage}`,
        errorDetails: {
          type: 'unknown',
          message: errorMessage,
          fix: 'Check the server logs for more details.'
        }
      },
      { status: 500 }
    )
  }
}
