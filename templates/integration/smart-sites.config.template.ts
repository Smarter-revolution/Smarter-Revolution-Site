// import type { SmartSitesConfig } from 'smart-sites-admin'

/**
 * Smart Sites Admin Configuration
 * 
 * Copy this file to your project root as `smart-sites.config.ts`
 * and customize the settings for your specific project.
 * 
 * Uncomment the import above after installing smart-sites-admin:
 * npm install smart-sites-admin
 */

// @ts-ignore - This is a template file
const config = {
  // Site display name (shown in admin header)
  siteName: '{{SITE_NAME}}',
  
  // Storage configuration - where content is saved
  storage: {
    // Options: 'github' | 'local' | 'custom'
    type: 'github',
    
    // GitHub configuration (required if type is 'github')
    github: {
      owner: process.env.GITHUB_OWNER || '{{GITHUB_OWNER}}',
      repo: process.env.GITHUB_REPO || '{{GITHUB_REPO}}',
      branch: process.env.GITHUB_BRANCH || 'main',
      contentPath: 'content',
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
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
  
  // Block types available in the editor
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
    ],
    custom: [],
  },
  
  // Content file locations
  pages: {
    directory: 'content/pages',
    siteConfig: 'content/site.json',
  },
  
  // Authentication settings
  auth: {
    type: 'password',
    sessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}

export default config
