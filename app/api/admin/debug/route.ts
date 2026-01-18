import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getGitHubConfigStatus, testGitHubConnection, isGitHubConfigured } from '@/lib/github'

/**
 * Debug endpoint to check GitHub configuration and connection
 * Only accessible to authenticated admins
 */
export async function GET() {
  // Check authentication
  const auth = await requireAuth()
  if (!auth.authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    // Get configuration status
    const configStatus = getGitHubConfigStatus()
    
    // If not configured, return early with helpful message
    if (!isGitHubConfigured()) {
      return NextResponse.json({
        success: false,
        configured: false,
        configStatus: {
          ...configStatus,
          // Show what's missing
          missingVariables: configStatus.errors
        },
        message: 'GitHub integration is not fully configured',
        fix: `Add the following environment variables in Vercel → Project Settings → Environment Variables:
${configStatus.errors.map(e => `• ${e}`).join('\n')}

Required variables:
• GITHUB_TOKEN - Personal Access Token with "repo" scope
• GITHUB_OWNER - Your GitHub username or organization
• GITHUB_REPO - Repository name (e.g., "Smarter-Revolution-Site")
• GITHUB_BRANCH - Branch to commit to (optional, defaults to "main")`
      })
    }
    
    // Test the connection
    const connectionTest = await testGitHubConnection()
    
    return NextResponse.json({
      success: connectionTest.success,
      configured: true,
      configStatus: {
        owner: configStatus.owner,
        repo: configStatus.repo,
        branch: configStatus.branch,
        repoUrl: configStatus.repoUrl,
        tokenSet: configStatus.tokenSet
      },
      connectionTest: {
        ...connectionTest,
        details: connectionTest.details
      },
      message: connectionTest.message,
      ...(connectionTest.success ? {} : {
        fix: `Based on the test results:
${!connectionTest.details.authenticated ? '• Check GITHUB_TOKEN - it may be invalid or expired' : ''}
${!connectionTest.details.repoAccessible ? `• Check GITHUB_OWNER ("${configStatus.owner}") and GITHUB_REPO ("${configStatus.repo}") - repository not found` : ''}
${!connectionTest.details.branchExists ? `• Check GITHUB_BRANCH ("${configStatus.branch}") - branch does not exist` : ''}
${!connectionTest.details.canWrite ? '• Token does not have write permission - regenerate with "repo" scope' : ''}`
      })
    })
    
  } catch (error) {
    console.error('Debug endpoint error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        success: false, 
        error: `Debug check failed: ${errorMessage}`,
        configured: isGitHubConfigured()
      },
      { status: 500 }
    )
  }
}
