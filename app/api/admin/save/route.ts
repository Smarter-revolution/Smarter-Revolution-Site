import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { commitContentFile, isGitHubConfigured, getGitHubConfigStatus } from '@/lib/github'
import { savePageContent, validatePageContent } from '@/lib/content'
import type { PageContent } from '@/lib/types'

// Trigger Vercel deploy hook to rebuild the site
async function triggerVercelDeploy(): Promise<{ success: boolean; error?: string }> {
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK
  
  if (!deployHookUrl) {
    console.log('[Deploy] No VERCEL_DEPLOY_HOOK configured, skipping deploy trigger')
    return { success: true } // Not an error, just not configured
  }
  
  try {
    console.log('[Deploy] Triggering Vercel deploy hook...')
    const response = await fetch(deployHookUrl, { method: 'POST' })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Deploy] Failed to trigger deploy:', response.status, errorText)
      return { success: false, error: `Deploy trigger failed: ${response.status}` }
    }
    
    const data = await response.json()
    console.log('[Deploy] Deploy triggered successfully:', data)
    return { success: true }
  } catch (error) {
    console.error('[Deploy] Error triggering deploy:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

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
      
      // Trigger Vercel deploy after successful GitHub commit
      const deployResult = await triggerVercelDeploy()
      
      // Even if deploy trigger fails, the content was saved to GitHub
      // So we still return success but note the deploy status
      const deployMessage = deployResult.success 
        ? 'Saved! Your changes will be live in about 60 seconds.'
        : 'Saved to GitHub! Auto-deploy may be delayed.'
      
      return NextResponse.json({
        success: true,
        message: deployMessage,
        commitUrl: result.commitUrl,
        deployTriggered: deployResult.success
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
