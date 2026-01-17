// ============================================
// SMART SITES ADMIN - STORAGE ADAPTERS
// ============================================

export { GitHubAdapter } from './github'
export { LocalAdapter } from './local'
export { VercelBlobAdapter } from './blob'
export { createStorageAdapter, createImageAdapter } from './factory'
export type { StorageAdapter, ImageAdapter } from '../types'
