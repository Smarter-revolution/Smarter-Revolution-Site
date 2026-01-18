// /lib/github.ts - GitHub API integration for auto-commit

import { Octokit } from '@octokit/rest'

// ============================================
// CONFIGURATION
// ============================================

const getOctokit = () => {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new GitHubConfigError(
      'GITHUB_TOKEN is not set',
      'Add GITHUB_TOKEN to your Vercel environment variables. Generate one at: GitHub → Settings → Developer Settings → Personal Access Tokens (with "repo" scope)'
    )
  }
  return new Octokit({ auth: token })
}

const getRepoConfig = () => {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  
  const missing: string[] = []
  if (!owner) missing.push('GITHUB_OWNER')
  if (!repo) missing.push('GITHUB_REPO')
  
  if (missing.length > 0) {
    throw new GitHubConfigError(
      `Missing environment variables: ${missing.join(', ')}`,
      'Add these variables in Vercel → Project Settings → Environment Variables'
    )
  }
  
  return { owner: owner!, repo: repo!, branch }
}

// ============================================
// CUSTOM ERROR CLASSES
// ============================================

class GitHubConfigError extends Error {
  public fix: string
  
  constructor(message: string, fix: string) {
    super(message)
    this.name = 'GitHubConfigError'
    this.fix = fix
  }
}

class GitHubAPIError extends Error {
  public status: number
  public fix: string
  public details: string
  
  constructor(message: string, status: number, fix: string, details: string = '') {
    super(message)
    this.name = 'GitHubAPIError'
    this.status = status
    this.fix = fix
    this.details = details
  }
}

// ============================================
// TYPES
// ============================================

export interface CommitResult {
  success: boolean
  error?: string
  errorDetails?: {
    type: 'config' | 'auth' | 'not_found' | 'permission' | 'network' | 'unknown'
    message: string
    fix: string
    details?: string
  }
  commitSha?: string
  commitUrl?: string
}

export interface GitHubConfigStatus {
  configured: boolean
  owner?: string
  repo?: string
  branch?: string
  tokenSet: boolean
  repoUrl?: string
  errors: string[]
}

// ============================================
// ERROR HELPERS
// ============================================

function parseGitHubError(error: unknown, context: { owner: string; repo: string; branch: string; filePath?: string }): CommitResult {
  const { owner, repo, branch, filePath } = context
  
  // Handle Octokit/GitHub API errors
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status
    const message = (error as { message?: string }).message || 'Unknown error'
    
    switch (status) {
      case 401:
        return {
          success: false,
          error: 'Authentication failed - Invalid or expired GitHub token',
          errorDetails: {
            type: 'auth',
            message: 'GitHub token is invalid or has expired',
            fix: 'Generate a new Personal Access Token at GitHub → Settings → Developer Settings → Personal Access Tokens. Make sure it has the "repo" scope. Then update GITHUB_TOKEN in Vercel environment variables.',
            details: `Token prefix: ${process.env.GITHUB_TOKEN?.substring(0, 7)}...`
          }
        }
        
      case 403:
        return {
          success: false,
          error: 'Permission denied - Token lacks required permissions',
          errorDetails: {
            type: 'permission',
            message: 'GitHub token does not have write access to this repository',
            fix: 'Ensure your Personal Access Token has the "repo" scope (full control of private repositories). If using a fine-grained token, grant "Contents" read and write access.',
            details: `Attempted to write to: ${owner}/${repo} (branch: ${branch})`
          }
        }
        
      case 404:
        // Determine what wasn't found
        const notFoundDetails = []
        notFoundDetails.push(`Repository: ${owner}/${repo}`)
        notFoundDetails.push(`Branch: ${branch}`)
        if (filePath) notFoundDetails.push(`File path: ${filePath}`)
        
        return {
          success: false,
          error: `Not Found - Repository, branch, or path does not exist`,
          errorDetails: {
            type: 'not_found',
            message: 'GitHub could not find the repository, branch, or file path',
            fix: `Check your Vercel environment variables:
• GITHUB_OWNER: Should be your GitHub username or organization (currently: "${owner}")
• GITHUB_REPO: Should be the exact repository name (currently: "${repo}")
• GITHUB_BRANCH: Should match your deployed branch (currently: "${branch}")

Common issues:
1. Repository name is misspelled
2. Branch doesn't exist (check if using "main" vs "master" vs feature branch)
3. Token doesn't have access to this repository (private repo?)`,
            details: notFoundDetails.join('\n')
          }
        }
        
      case 409:
        return {
          success: false,
          error: 'Conflict - File was modified by another process',
          errorDetails: {
            type: 'unknown',
            message: 'The file was modified since you loaded it',
            fix: 'Refresh the page and try again. If the problem persists, check if another user or automated process is modifying the same file.',
            details: message
          }
        }
        
      case 422:
        return {
          success: false,
          error: 'Invalid request - Check file path and content',
          errorDetails: {
            type: 'unknown',
            message: 'GitHub rejected the request as invalid',
            fix: 'This usually means the file path is invalid or the content encoding failed. Check server logs for more details.',
            details: message
          }
        }
        
      default:
        return {
          success: false,
          error: `GitHub API error (${status}): ${message}`,
          errorDetails: {
            type: 'unknown',
            message: `Unexpected GitHub API error with status ${status}`,
            fix: 'Check the Vercel function logs for more details. This may be a temporary GitHub issue.',
            details: message
          }
        }
    }
  }
  
  // Handle config errors
  if (error instanceof GitHubConfigError) {
    return {
      success: false,
      error: error.message,
      errorDetails: {
        type: 'config',
        message: error.message,
        fix: error.fix
      }
    }
  }
  
  // Handle network errors
  if (error instanceof Error && error.message.includes('fetch')) {
    return {
      success: false,
      error: 'Network error - Could not connect to GitHub',
      errorDetails: {
        type: 'network',
        message: 'Failed to connect to GitHub API',
        fix: 'This is usually a temporary network issue. Try again in a few moments.',
        details: error.message
      }
    }
  }
  
  // Generic error
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
  return {
    success: false,
    error: errorMessage,
    errorDetails: {
      type: 'unknown',
      message: errorMessage,
      fix: 'Check the Vercel function logs for more details.',
      details: String(error)
    }
  }
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Commit a content file to the repository
 */
export async function commitContentFile(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<CommitResult> {
  let owner = '', repo = '', branch = ''
  
  try {
    const octokit = getOctokit()
    const config = getRepoConfig()
    owner = config.owner
    repo = config.repo
    branch = config.branch
    
    console.log(`[GitHub] Attempting to save: ${filePath} to ${owner}/${repo}@${branch}`)
    
    // Get current file SHA if it exists (required for updates)
    let sha: string | undefined
    
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch
      })
      
      if (!Array.isArray(data) && 'sha' in data) {
        sha = data.sha
        console.log(`[GitHub] Found existing file with SHA: ${sha.substring(0, 7)}`)
      }
    } catch (error: unknown) {
      // File doesn't exist yet - that's okay for new files
      const e = error as { status?: number }
      if (e.status === 404) {
        console.log(`[GitHub] File doesn't exist yet, will create new`)
      } else {
        // Re-throw non-404 errors
        throw error
      }
    }
    
    // Create or update the file
    console.log(`[GitHub] ${sha ? 'Updating' : 'Creating'} file...`)
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch
    })
    
    const commitSha = response.data.commit.sha
    const commitUrl = response.data.commit.html_url
    
    console.log(`[GitHub] Success! Commit: ${commitSha}`)
    
    return {
      success: true,
      commitSha,
      commitUrl
    }
    
  } catch (error) {
    console.error('[GitHub] Commit error:', error)
    return parseGitHubError(error, { owner, repo, branch, filePath })
  }
}

/**
 * Commit multiple files in a single commit (more efficient)
 */
export async function commitMultipleFiles(
  files: { path: string; content: string }[],
  commitMessage: string
): Promise<CommitResult> {
  let owner = '', repo = '', branch = ''
  
  try {
    const octokit = getOctokit()
    const config = getRepoConfig()
    owner = config.owner
    repo = config.repo
    branch = config.branch
    
    console.log(`[GitHub] Multi-file commit: ${files.length} files to ${owner}/${repo}@${branch}`)
    
    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`
    })
    const latestCommitSha = refData.object.sha
    
    // Get the tree SHA from the latest commit
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha
    })
    const baseTreeSha = commitData.tree.sha
    
    // Create blobs for each file
    const blobs = await Promise.all(
      files.map(async (file) => {
        const { data } = await octokit.git.createBlob({
          owner,
          repo,
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64'
        })
        return {
          path: file.path,
          sha: data.sha
        }
      })
    )
    
    // Create a new tree
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: blobs.map(blob => ({
        path: blob.path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blob.sha
      }))
    })
    
    // Create the commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: treeData.sha,
      parents: [latestCommitSha]
    })
    
    // Update the branch reference
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    })
    
    console.log(`[GitHub] Multi-file commit success: ${newCommit.sha}`)
    
    return {
      success: true,
      commitSha: newCommit.sha,
      commitUrl: newCommit.html_url
    }
    
  } catch (error) {
    console.error('[GitHub] Multi-commit error:', error)
    return parseGitHubError(error, { owner, repo, branch })
  }
}

/**
 * Check if GitHub integration is properly configured
 */
export function isGitHubConfigured(): boolean {
  return !!(
    process.env.GITHUB_TOKEN &&
    process.env.GITHUB_OWNER &&
    process.env.GITHUB_REPO
  )
}

/**
 * Get detailed configuration status for debugging
 */
export function getGitHubConfigStatus(): GitHubConfigStatus {
  const errors: string[] = []
  
  const tokenSet = !!process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  
  if (!tokenSet) {
    errors.push('GITHUB_TOKEN is not set')
  }
  if (!owner) {
    errors.push('GITHUB_OWNER is not set')
  }
  if (!repo) {
    errors.push('GITHUB_REPO is not set')
  }
  
  const configured = tokenSet && !!owner && !!repo
  
  return {
    configured,
    owner: owner || undefined,
    repo: repo || undefined,
    branch,
    tokenSet,
    repoUrl: configured ? `https://github.com/${owner}/${repo}` : undefined,
    errors
  }
}

/**
 * Test the GitHub connection and permissions
 */
export async function testGitHubConnection(): Promise<{
  success: boolean
  message: string
  details: {
    authenticated: boolean
    repoAccessible: boolean
    branchExists: boolean
    canWrite: boolean
  }
}> {
  const details = {
    authenticated: false,
    repoAccessible: false,
    branchExists: false,
    canWrite: false
  }
  
  try {
    const octokit = getOctokit()
    const { owner, repo, branch } = getRepoConfig()
    
    // Test 1: Check authentication
    try {
      const { data: user } = await octokit.users.getAuthenticated()
      details.authenticated = true
      console.log(`[GitHub Test] Authenticated as: ${user.login}`)
    } catch (error) {
      return {
        success: false,
        message: 'Authentication failed. Check your GITHUB_TOKEN.',
        details
      }
    }
    
    // Test 2: Check repo access
    try {
      const { data: repoData } = await octokit.repos.get({ owner, repo })
      details.repoAccessible = true
      details.canWrite = repoData.permissions?.push || false
      console.log(`[GitHub Test] Repo accessible: ${repoData.full_name}, can write: ${details.canWrite}`)
    } catch (error) {
      return {
        success: false,
        message: `Cannot access repository ${owner}/${repo}. Check GITHUB_OWNER and GITHUB_REPO.`,
        details
      }
    }
    
    // Test 3: Check branch exists
    try {
      await octokit.repos.getBranch({ owner, repo, branch })
      details.branchExists = true
      console.log(`[GitHub Test] Branch exists: ${branch}`)
    } catch (error) {
      return {
        success: false,
        message: `Branch "${branch}" does not exist. Check GITHUB_BRANCH.`,
        details
      }
    }
    
    if (!details.canWrite) {
      return {
        success: false,
        message: 'Token does not have write permission to this repository.',
        details
      }
    }
    
    return {
      success: true,
      message: `Connected to ${owner}/${repo}@${branch} with write access`,
      details
    }
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      message: `Connection test failed: ${message}`,
      details
    }
  }
}

/**
 * Get the repository URL
 */
export function getRepoUrl(): string | null {
  try {
    const { owner, repo } = getRepoConfig()
    return `https://github.com/${owner}/${repo}`
  } catch {
    return null
  }
}
