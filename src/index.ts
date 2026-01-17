// ============================================
// SMART SITES ADMIN - MAIN EXPORTS
// ============================================

// Types
export * from './lib/types'

// Configuration
export { initConfig, getConfig, validateConfig, getEnvConfig, isGitHubConfigured, isBlobConfigured } from './lib/config'
export type { SmartSitesConfig } from './lib/config'

// Auth
export { verifyPassword, createSession, verifySession, destroySession, isAuthenticated, requireAuth } from './lib/auth'

// Adapters
export { GitHubAdapter, createGitHubAdapterFromEnv } from './lib/adapters/github'
export { LocalAdapter, createLocalAdapter } from './lib/adapters/local'
export { VercelBlobAdapter, createBlobAdapter, validateImageFile } from './lib/adapters/blob'
export { createStorageAdapter, createImageAdapter, createAdapters, isStorageConfigured, isImageUploadConfigured } from './lib/adapters/factory'

// API Handlers
export { createAuthHandler } from './lib/api/auth'
export { createSaveHandler } from './lib/api/save'
export { createUploadHandler } from './lib/api/upload'
export { createContentHandler, createPageContentRoute, createSiteConfigRoute, createPageListRoute } from './lib/api/content'

// Components
export * from './components/admin'
export * from './components/blocks'
