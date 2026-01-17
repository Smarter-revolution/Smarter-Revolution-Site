// ============================================
// ADAPTER FACTORY
// ============================================

import { StorageAdapter, ImageAdapter, SmartSitesConfig } from '../types'
import { GitHubAdapter, createGitHubAdapterFromEnv } from './github'
import { LocalAdapter, createLocalAdapter } from './local'
import { VercelBlobAdapter, createBlobAdapter } from './blob'
import { getConfig } from '../config'

/**
 * Create a storage adapter based on configuration
 */
export function createStorageAdapter(config?: SmartSitesConfig): StorageAdapter {
  const cfg = config || getConfig()

  switch (cfg.storage.type) {
    case 'github': {
      // Try to create from config first, then from env
      if (cfg.storage.github) {
        const token = cfg.storage.github.token || process.env.GITHUB_TOKEN
        if (!token) {
          throw new Error('GitHub token is required for GitHub storage adapter')
        }
        return new GitHubAdapter({
          token,
          owner: cfg.storage.github.owner,
          repo: cfg.storage.github.repo,
          branch: cfg.storage.github.branch,
        })
      }
      
      const adapter = createGitHubAdapterFromEnv()
      if (!adapter) {
        throw new Error('GitHub configuration is missing. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO')
      }
      return adapter
    }

    case 'local': {
      const basePath = cfg.storage.local?.basePath || './content'
      return createLocalAdapter(basePath)
    }

    case 'custom': {
      if (!cfg.storage.custom) {
        throw new Error('Custom storage adapter is not provided')
      }
      return cfg.storage.custom
    }

    default:
      // Default to local storage
      return createLocalAdapter('./content')
  }
}

/**
 * Create an image adapter based on configuration
 */
export function createImageAdapter(config?: SmartSitesConfig): ImageAdapter {
  const cfg = config || getConfig()

  switch (cfg.images.type) {
    case 'vercel-blob': {
      const adapter = createBlobAdapter()
      if (!adapter) {
        console.warn('Vercel Blob not configured, images will not be uploadable')
        // Return a mock adapter that throws on upload
        return {
          upload: async () => {
            throw new Error('Image upload not configured. Set BLOB_READ_WRITE_TOKEN')
          },
          delete: async () => {
            // No-op
          },
        }
      }
      return adapter
    }

    case 'cloudinary': {
      // Cloudinary adapter would be implemented here
      throw new Error('Cloudinary adapter not yet implemented')
    }

    case 'local': {
      // Local image storage would be implemented here
      throw new Error('Local image adapter not yet implemented')
    }

    case 'custom': {
      throw new Error('Custom image adapter must be provided in configuration')
    }

    default:
      throw new Error(`Unknown image adapter type: ${cfg.images.type}`)
  }
}

/**
 * Create both adapters at once
 */
export function createAdapters(config?: SmartSitesConfig): {
  storage: StorageAdapter
  images: ImageAdapter
} {
  return {
    storage: createStorageAdapter(config),
    images: createImageAdapter(config),
  }
}

/**
 * Check if storage is configured and available
 */
export function isStorageConfigured(config?: SmartSitesConfig): boolean {
  const cfg = config || getConfig()

  switch (cfg.storage.type) {
    case 'github':
      return !!(
        process.env.GITHUB_TOKEN &&
        (cfg.storage.github?.owner || process.env.GITHUB_OWNER) &&
        (cfg.storage.github?.repo || process.env.GITHUB_REPO)
      )
    case 'local':
      return true // Always available
    case 'custom':
      return !!cfg.storage.custom
    default:
      return false
  }
}

/**
 * Check if image upload is configured and available
 */
export function isImageUploadConfigured(config?: SmartSitesConfig): boolean {
  const cfg = config || getConfig()

  switch (cfg.images.type) {
    case 'vercel-blob':
      return !!process.env.BLOB_READ_WRITE_TOKEN
    case 'cloudinary':
      return !!(
        cfg.images.cloudinary?.cloudName &&
        cfg.images.cloudinary?.apiKey &&
        cfg.images.cloudinary?.apiSecret
      )
    case 'local':
      return true
    default:
      return false
  }
}
