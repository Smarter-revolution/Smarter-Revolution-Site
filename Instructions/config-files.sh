# ============================================
# .env.example
# ============================================

# Admin Authentication
# Set a secure password for the admin panel
ADMIN_PASSWORD=your-secure-password-here

# GitHub Integration (for auto-commit on save)
# Create a Personal Access Token at: https://github.com/settings/tokens
# Token needs 'repo' scope
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main

# Vercel Blob Storage (auto-configured when you add Blob storage in Vercel)
BLOB_READ_WRITE_TOKEN=


# ============================================
# package.json (key dependencies)
# ============================================

{
  "name": "smart-sites-lite",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@octokit/rest": "^20.0.0",
    "@vercel/blob": "^0.22.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}


# ============================================
# tailwind.config.ts
# ============================================

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config


# ============================================
# tsconfig.json
# ============================================

{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}


# ============================================
# next.config.mjs
# ============================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig


# ============================================
# .gitignore
# ============================================

# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts


# ============================================
# README.md
# ============================================

# Smart Sites Lite

A lightweight, client-editable website system built with Next.js. Clients can edit
their site content through a simple admin interface without any technical knowledge.

## Features

- **Simple Admin Panel**: Password-protected editing interface
- **Block-Based Editing**: Pre-built content blocks (Hero, Text+Image, Services, etc.)
- **Image Uploads**: Direct upload to Vercel Blob storage
- **Auto-Deploy**: Changes commit to GitHub and trigger Vercel rebuild
- **No Database**: Content stored as JSON files for simplicity

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values:
# - ADMIN_PASSWORD
# - GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO

# Run development server
npm run dev
```

## Environment Setup

### 1. Admin Password
Set a secure password in `ADMIN_PASSWORD`. This protects the /admin route.

### 2. GitHub Token
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Copy token to `GITHUB_TOKEN`

### 3. Vercel Blob
1. In Vercel dashboard, go to your project
2. Click Storage → Create Database → Blob
3. Token is auto-added to environment variables

## Deployment

```bash
# Deploy to Vercel
vercel

# Or connect GitHub repo for automatic deployments
```

## Client Handoff

1. Share admin URL: `https://yoursite.com/admin`
2. Share admin password (securely)
3. Brief training: show page selection, editing, saving
4. Explain ~60 second delay after saving for changes to appear

## Project Structure

```
├── app/
│   ├── admin/          # Admin interface
│   ├── (public)/       # Public-facing pages
│   └── api/            # API routes
├── components/
│   ├── blocks/         # Display components
│   └── ui/             # Shared UI components
├── content/
│   ├── pages/          # Page content JSON files
│   └── site.json       # Global site config
└── lib/                # Utilities
```

## Adding New Pages

1. Create new JSON file in `/content/pages/`
2. Follow the existing page structure
3. Add to navigation in `/content/site.json`

## License

Private - Smarter Revolution