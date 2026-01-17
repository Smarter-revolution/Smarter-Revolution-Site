import type { SmartSitesConfig } from './src/lib/types'

/**
 * Smart Sites Admin Configuration
 * 
 * This file configures the Smart Sites Admin system.
 * Customize these settings for your specific project.
 */
const config: SmartSitesConfig = {
  // Site display name (shown in admin header)
  siteName: 'My Client Website',
  
  // Storage configuration - where content is saved
  storage: {
    // Options: 'github' | 'local' | 'custom'
    type: 'github',
    
    // GitHub configuration (required if type is 'github')
    github: {
      owner: process.env.GITHUB_OWNER || 'your-github-username',
      repo: process.env.GITHUB_REPO || 'your-repo-name',
      branch: process.env.GITHUB_BRANCH || 'main',
      contentPath: 'content', // Where JSON files are stored in the repo
    },
    
    // Local configuration (for development)
    local: {
      basePath: './content',
    },
  },
  
  // Image upload configuration
  images: {
    // Options: 'vercel-blob' | 'cloudinary' | 'local' | 'custom'
    type: 'vercel-blob',
    
    // Maximum file size (5MB default)
    maxSize: 5 * 1024 * 1024,
    
    // Allowed image types
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
  
  // Block types available in the editor
  blocks: {
    // Enable/disable specific block types
    enabled: [
      'hero',
      'textImage',
      'servicesGrid',
      'testimonials',
      'cta',
      'team',
      'contact',
      'faq',
    ],
    
    // Custom block definitions (advanced)
    custom: [],
  },
  
  // Content file locations
  pages: {
    directory: 'content/pages',
    siteConfig: 'content/site.json',
  },
  
  // Authentication settings
  auth: {
    // Options: 'password' | 'oauth' (oauth coming soon)
    type: 'password',
    
    // Session duration: 7 days
    sessionDuration: 7 * 24 * 60 * 60 * 1000,
  },
}

export default config
