// ============================================
// GITHUB STORAGE ADAPTER
// ============================================

import { Octokit } from '@octokit/rest'
import { StorageAdapter } from '../types'

interface GitHubAdapterConfig {
  token: string
  owner: string
  repo: string
  branch?: string
}

export class GitHubAdapter implements StorageAdapter {
  private octokit: Octokit
  private owner: string
  private repo: string
  private branch: string

  constructor(config: GitHubAdapterConfig) {
    this.octokit = new Octokit({ auth: config.token })
    this.owner = config.owner
    this.repo = config.repo
    this.branch = config.branch || 'main'
  }

  /**
   * Read file content from GitHub
   */
  async read(path: string): Promise<string | null> {
    try {
      const response = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        ref: this.branch,
      })

      if (Array.isArray(response.data)) {
        return null // Path is a directory
      }

      if (response.data.type !== 'file' || !('content' in response.data)) {
        return null
      }

      // Decode base64 content
      return Buffer.from(response.data.content, 'base64').toString('utf-8')
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return null
      }
      throw error
    }
  }

  /**
   * Write file content to GitHub
   */
  async write(path: string, content: string, message?: string): Promise<void> {
    const commitMessage = message || `Update ${path}`
    
    // Get current file SHA if it exists
    let sha: string | undefined
    try {
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        ref: this.branch,
      })
      
      if (!Array.isArray(data) && data.type === 'file') {
        sha = data.sha
      }
    } catch (error: unknown) {
      // File doesn't exist yet, that's okay
      if (!(error && typeof error === 'object' && 'status' in error && error.status === 404)) {
        throw error
      }
    }

    // Create or update file
    await this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path,
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: this.branch,
    })
  }

  /**
   * List files in a directory
   */
  async list(directory: string): Promise<string[]> {
    try {
      const response = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: directory,
        ref: this.branch,
      })

      if (!Array.isArray(response.data)) {
        return []
      }

      return response.data
        .filter(item => item.type === 'file')
        .map(item => item.name)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return []
      }
      throw error
    }
  }

  /**
   * Check if file exists
   */
  async exists(path: string): Promise<boolean> {
    try {
      await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        ref: this.branch,
      })
      return true
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * Delete a file
   */
  async delete(path: string): Promise<void> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        ref: this.branch,
      })

      if (Array.isArray(data) || data.type !== 'file') {
        throw new Error('Cannot delete: path is not a file')
      }

      await this.octokit.repos.deleteFile({
        owner: this.owner,
        repo: this.repo,
        path,
        message: `Delete ${path}`,
        sha: data.sha,
        branch: this.branch,
      })
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return // File already doesn't exist
      }
      throw error
    }
  }

  /**
   * Commit multiple files at once
   */
  async commitMultiple(
    files: Array<{ path: string; content: string }>,
    message: string
  ): Promise<void> {
    // Get the current commit SHA
    const { data: refData } = await this.octokit.git.getRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${this.branch}`,
    })
    const currentCommitSha = refData.object.sha

    // Get the tree SHA
    const { data: commitData } = await this.octokit.git.getCommit({
      owner: this.owner,
      repo: this.repo,
      commit_sha: currentCommitSha,
    })
    const treeSha = commitData.tree.sha

    // Create blobs for each file
    const blobs = await Promise.all(
      files.map(async (file) => {
        const { data } = await this.octokit.git.createBlob({
          owner: this.owner,
          repo: this.repo,
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64',
        })
        return {
          path: file.path,
          sha: data.sha,
        }
      })
    )

    // Create a new tree
    const { data: newTree } = await this.octokit.git.createTree({
      owner: this.owner,
      repo: this.repo,
      base_tree: treeSha,
      tree: blobs.map((blob) => ({
        path: blob.path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blob.sha,
      })),
    })

    // Create a new commit
    const { data: newCommit } = await this.octokit.git.createCommit({
      owner: this.owner,
      repo: this.repo,
      message,
      tree: newTree.sha,
      parents: [currentCommitSha],
    })

    // Update the branch reference
    await this.octokit.git.updateRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${this.branch}`,
      sha: newCommit.sha,
    })
  }
}

/**
 * Create a GitHub adapter from environment variables
 */
export function createGitHubAdapterFromEnv(): GitHubAdapter | null {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!token || !owner || !repo) {
    return null
  }

  return new GitHubAdapter({ token, owner, repo, branch })
}
