// /lib/github.ts - GitHub API integration for auto-commit

import { Octokit } from '@octokit/rest'

// ============================================
// CONFIGURATION
// ============================================

const getOctokit = () => {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set')
  }
  return new Octokit({ auth: token })
}

const getRepoConfig = () => {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  
  if (!owner || !repo) {
    throw new Error('GITHUB_OWNER and GITHUB_REPO environment variables must be set')
  }
  
  return { owner, repo, branch }
}

// ============================================
// TYPES
// ============================================

export interface CommitResult {
  success: boolean
  error?: string
  commitSha?: string
  commitUrl?: string
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
  try {
    const octokit = getOctokit()
    const { owner, repo, branch } = getRepoConfig()
    
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
      }
    } catch (error: unknown) {
      // File doesn't exist yet - that's okay for new files
      const e = error as { status?: number }
      if (e.status !== 404) {
        throw error
      }
    }
    
    // Create or update the file
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
    
    return {
      success: true,
      commitSha,
      commitUrl
    }
    
  } catch (error) {
    console.error('GitHub commit error:', error)
    
    const message = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred'
    
    return {
      success: false,
      error: message
    }
  }
}

/**
 * Commit multiple files in a single commit (more efficient)
 */
export async function commitMultipleFiles(
  files: { path: string; content: string }[],
  commitMessage: string
): Promise<CommitResult> {
  try {
    const octokit = getOctokit()
    const { owner, repo, branch } = getRepoConfig()
    
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
    
    return {
      success: true,
      commitSha: newCommit.sha,
      commitUrl: newCommit.html_url
    }
    
  } catch (error) {
    console.error('GitHub multi-commit error:', error)
    
    const message = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred'
    
    return {
      success: false,
      error: message
    }
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
