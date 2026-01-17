// ============================================
// SMART SITES ADMIN - CONFIGURATION SYSTEM
// ============================================

import { SmartSitesConfig, BlockType } from './types'

// --------------------------------------------
// Default Configuration
// --------------------------------------------

export const defaultConfig: SmartSitesConfig = {
  siteName: 'My Website',
  
  storage: {
    type: 'local',
    local: {
      basePath: './content',
    },
  },
  
  images: {
    type: 'vercel-blob',
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
  
  blocks: {
    enabled: [
      'hero',
      'textImage',
      'servicesGrid',
      'testimonials',
      'cta',
      'team',
      'contact',
      'faq',
    ] as BlockType[],
    custom: [],
  },
  
  pages: {
    directory: 'content/pages',
    siteConfig: 'content/site.json',
  },
  
  auth: {
    type: 'password',
    sessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}

// --------------------------------------------
// Configuration Manager
// --------------------------------------------

let currentConfig: SmartSitesConfig = defaultConfig

/**
 * Initialize the configuration
 */
export function initConfig(userConfig: Partial<SmartSitesConfig>): SmartSitesConfig {
  currentConfig = mergeConfig(defaultConfig, userConfig)
  return currentConfig
}

/**
 * Get the current configuration
 */
export function getConfig(): SmartSitesConfig {
  return currentConfig
}

/**
 * Deep merge configuration objects
 */
function mergeConfig(
  base: SmartSitesConfig,
  override: Partial<SmartSitesConfig>
): SmartSitesConfig {
  return {
    siteName: override.siteName ?? base.siteName,
    
    storage: {
      ...base.storage,
      ...override.storage,
      github: override.storage?.github 
        ? { ...base.storage.github, ...override.storage.github }
        : base.storage.github,
      local: override.storage?.local
        ? { ...base.storage.local, ...override.storage.local }
        : base.storage.local,
    },
    
    images: {
      ...base.images,
      ...override.images,
    },
    
    blocks: {
      enabled: override.blocks?.enabled ?? base.blocks.enabled,
      custom: [...(base.blocks.custom || []), ...(override.blocks?.custom || [])],
    },
    
    pages: {
      ...base.pages,
      ...override.pages,
    },
    
    auth: {
      ...base.auth,
      ...override.auth,
    },
  }
}

// --------------------------------------------
// Configuration Validation
// --------------------------------------------

export interface ConfigValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export function validateConfig(config: SmartSitesConfig): ConfigValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate storage configuration
  if (config.storage.type === 'github') {
    if (!config.storage.github?.owner) {
      errors.push('GitHub owner is required when using GitHub storage')
    }
    if (!config.storage.github?.repo) {
      errors.push('GitHub repo is required when using GitHub storage')
    }
    if (!process.env.GITHUB_TOKEN && !config.storage.github?.token) {
      warnings.push('GITHUB_TOKEN environment variable is not set')
    }
  }

  // Validate image configuration
  if (config.images.type === 'vercel-blob') {
    if (!process.env.BLOB_READ_WRITE_TOKEN && !config.images.vercelBlob?.token) {
      warnings.push('BLOB_READ_WRITE_TOKEN environment variable is not set')
    }
  }

  // Validate auth configuration
  if (config.auth.type === 'password') {
    if (!process.env.ADMIN_PASSWORD) {
      errors.push('ADMIN_PASSWORD environment variable is required')
    }
  }

  // Validate blocks configuration
  if (config.blocks.enabled.length === 0) {
    warnings.push('No block types are enabled')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// --------------------------------------------
// Environment Variable Helpers
// --------------------------------------------

export function getEnvConfig() {
  return {
    // Auth
    adminPassword: process.env.ADMIN_PASSWORD,
    
    // GitHub
    githubToken: process.env.GITHUB_TOKEN,
    githubOwner: process.env.GITHUB_OWNER,
    githubRepo: process.env.GITHUB_REPO,
    githubBranch: process.env.GITHUB_BRANCH || 'main',
    
    // Vercel Blob
    blobToken: process.env.BLOB_READ_WRITE_TOKEN,
    
    // App
    nodeEnv: process.env.NODE_ENV || 'development',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  }
}

/**
 * Check if GitHub is configured
 */
export function isGitHubConfigured(): boolean {
  const env = getEnvConfig()
  return !!(env.githubToken && env.githubOwner && env.githubRepo)
}

/**
 * Check if Vercel Blob is configured
 */
export function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

// --------------------------------------------
// Configuration File Loader
// --------------------------------------------

/**
 * Load configuration from smart-sites.config.ts file
 * This is used when integrating into a client project
 */
export async function loadConfigFile(): Promise<SmartSitesConfig | null> {
  try {
    // Try to import the config file
    const configModule = await import('../../../smart-sites.config')
    return initConfig(configModule.default)
  } catch {
    // Config file doesn't exist, use defaults
    return null
  }
}

// --------------------------------------------
// Export Configuration Type for Users
// --------------------------------------------

export type { SmartSitesConfig } from './types'
