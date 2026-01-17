#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve))

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
}

async function main() {
  const command = process.argv[2]

  log.title('🚀 Smart Sites Admin CLI')

  if (command === 'init') {
    await initProject()
  } else if (command === 'help' || !command) {
    showHelp()
  } else {
    log.error(`Unknown command: ${command}`)
    showHelp()
  }

  rl.close()
}

function showHelp() {
  console.log(`
${colors.bright}Usage:${colors.reset}
  npx smart-sites-admin <command>

${colors.bright}Commands:${colors.reset}
  init    Initialize Smart Sites Admin in your project
  help    Show this help message

${colors.bright}Examples:${colors.reset}
  npx smart-sites-admin init
  `)
}

async function initProject() {
  log.info('Initializing Smart Sites Admin in your project...\n')

  // Check if we're in a Next.js project
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    log.error('No package.json found. Please run this command in a Next.js project.')
    process.exit(1)
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  if (!packageJson.dependencies?.next) {
    log.warn('This doesn\'t appear to be a Next.js project. Continuing anyway...')
  }

  // Gather configuration
  const siteName = await question('Site name: ') || 'My Website'
  const githubOwner = await question('GitHub owner (username/org): ') || ''
  const githubRepo = await question('GitHub repository name: ') || ''

  log.info('\nCreating directory structure...')

  // Create directories
  const directories = [
    'content',
    'content/pages',
    'app/admin',
    'app/admin/[pageSlug]',
    'app/api/admin/auth',
    'app/api/admin/save',
    'app/api/admin/upload',
    'app/api/content/[page]',
    'app/api/content/pages',
    'app/api/content/site',
  ]

  for (const dir of directories) {
    const fullPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
      log.success(`Created ${dir}/`)
    }
  }

  // Create config file
  log.info('Creating configuration file...')
  const configContent = generateConfig(siteName, githubOwner, githubRepo)
  fs.writeFileSync(path.join(process.cwd(), 'smart-sites.config.ts'), configContent)
  log.success('Created smart-sites.config.ts')

  // Create .env.local template
  if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    log.info('Creating environment template...')
    const envContent = generateEnvTemplate(githubOwner, githubRepo)
    fs.writeFileSync(path.join(process.cwd(), '.env.local.example'), envContent)
    log.success('Created .env.local.example')
  }

  // Create sample content
  log.info('Creating sample content...')
  
  const siteConfig = {
    siteName,
    logo: '',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: {
      copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
    },
  }
  fs.writeFileSync(
    path.join(process.cwd(), 'content/site.json'),
    JSON.stringify(siteConfig, null, 2)
  )
  log.success('Created content/site.json')

  const homePage = {
    pageSlug: 'home',
    pageTitle: 'Home',
    seo: {
      title: `Welcome to ${siteName}`,
      description: 'Welcome to our website.',
    },
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          headline: `Welcome to ${siteName}`,
          subheadline: 'Edit this content in the admin panel.',
          buttonText: 'Get Started',
          buttonLink: '/contact',
          backgroundImage: '',
          overlayOpacity: 0.5,
          textAlignment: 'center',
        },
      },
    ],
  }
  fs.writeFileSync(
    path.join(process.cwd(), 'content/pages/home.json'),
    JSON.stringify(homePage, null, 2)
  )
  log.success('Created content/pages/home.json')

  // Print next steps
  console.log(`
${colors.bright}${colors.green}✓ Smart Sites Admin initialized successfully!${colors.reset}

${colors.bright}Next steps:${colors.reset}

1. Install dependencies:
   ${colors.cyan}npm install @octokit/rest @vercel/blob${colors.reset}

2. Copy .env.local.example to .env.local and fill in your values:
   ${colors.cyan}cp .env.local.example .env.local${colors.reset}

3. Start your development server:
   ${colors.cyan}npm run dev${colors.reset}

4. Visit ${colors.cyan}http://localhost:3000/admin${colors.reset} to access the admin panel

${colors.bright}Documentation:${colors.reset}
  https://github.com/Smarter-revolution/smart-sites-admin

Happy editing! 🎉
`)
}

function generateConfig(siteName, githubOwner, githubRepo) {
  return `import type { SmartSitesConfig } from 'smart-sites-admin'

const config: SmartSitesConfig = {
  siteName: '${siteName}',
  
  storage: {
    type: 'github',
    github: {
      owner: process.env.GITHUB_OWNER || '${githubOwner}',
      repo: process.env.GITHUB_REPO || '${githubRepo}',
      branch: process.env.GITHUB_BRANCH || 'main',
      contentPath: 'content',
    },
    local: {
      basePath: './content',
    },
  },
  
  images: {
    type: 'vercel-blob',
    maxSize: 5 * 1024 * 1024,
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
    ],
    custom: [],
  },
  
  pages: {
    directory: 'content/pages',
    siteConfig: 'content/site.json',
  },
  
  auth: {
    type: 'password',
    sessionDuration: 7 * 24 * 60 * 60 * 1000,
  },
}

export default config
`
}

function generateEnvTemplate(githubOwner, githubRepo) {
  return `# Smart Sites Admin - Environment Variables

# Required: Admin panel password
ADMIN_PASSWORD=change-this-password

# GitHub Storage (for production)
GITHUB_TOKEN=
GITHUB_OWNER=${githubOwner}
GITHUB_REPO=${githubRepo}
GITHUB_BRANCH=main

# Image Uploads (Vercel Blob)
BLOB_READ_WRITE_TOKEN=

# Optional
NEXT_PUBLIC_BASE_URL=http://localhost:3000
`
}

main().catch(console.error)
