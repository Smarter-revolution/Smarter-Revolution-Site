// ============================================
// LOCAL FILE STORAGE ADAPTER
// ============================================

import { promises as fs } from 'fs'
import path from 'path'
import { StorageAdapter } from '../types'

interface LocalAdapterConfig {
  basePath: string
}

export class LocalAdapter implements StorageAdapter {
  private basePath: string

  constructor(config: LocalAdapterConfig) {
    this.basePath = config.basePath
  }

  /**
   * Get full path for a file
   */
  private getFullPath(filePath: string): string {
    return path.join(process.cwd(), this.basePath, filePath)
  }

  /**
   * Read file content from local filesystem
   */
  async read(filePath: string): Promise<string | null> {
    try {
      const fullPath = this.getFullPath(filePath)
      const content = await fs.readFile(fullPath, 'utf-8')
      return content
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return null
      }
      throw error
    }
  }

  /**
   * Write file content to local filesystem
   */
  async write(filePath: string, content: string): Promise<void> {
    const fullPath = this.getFullPath(filePath)
    
    // Ensure directory exists
    const dir = path.dirname(fullPath)
    await fs.mkdir(dir, { recursive: true })
    
    // Write file
    await fs.writeFile(fullPath, content, 'utf-8')
  }

  /**
   * List files in a directory
   */
  async list(directory: string): Promise<string[]> {
    try {
      const fullPath = this.getFullPath(directory)
      const entries = await fs.readdir(fullPath, { withFileTypes: true })
      
      return entries
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return []
      }
      throw error
    }
  }

  /**
   * Check if file exists
   */
  async exists(filePath: string): Promise<boolean> {
    try {
      const fullPath = this.getFullPath(filePath)
      await fs.access(fullPath)
      return true
    } catch {
      return false
    }
  }

  /**
   * Delete a file
   */
  async delete(filePath: string): Promise<void> {
    try {
      const fullPath = this.getFullPath(filePath)
      await fs.unlink(fullPath)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return // File already doesn't exist
      }
      throw error
    }
  }
}

/**
 * Create a local adapter with default path
 */
export function createLocalAdapter(basePath: string = './content'): LocalAdapter {
  return new LocalAdapter({ basePath })
}
