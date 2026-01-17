# Smart Sites Admin

A standalone, reusable admin system for client-editable websites built with Next.js.

![Smart Sites Admin](https://via.placeholder.com/800x400?text=Smart+Sites+Admin)

## Features

- 🎯 **Block-Based Editing** - 8 pre-built content blocks (Hero, Text+Image, Services Grid, Testimonials, CTA, Team, Contact, FAQ)
- 📝 **JSON Content Storage** - Simple, Git-friendly content format
- 🔗 **GitHub Integration** - Auto-commits trigger Vercel rebuilds
- 🖼️ **Image Uploads** - Drag-and-drop to Vercel Blob storage
- 🔐 **Simple Auth** - Password-protected admin panel
- 📦 **Easy Integration** - NPM package or CLI setup

## Quick Start

### Option 1: NPM Package

```bash
npm install smart-sites-admin
```

```tsx
// app/admin/layout.tsx
import { AdminLayout } from 'smart-sites-admin/components'

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}
```

### Option 2: CLI Setup

```bash
npx smart-sites-admin init
```

This will:
1. Create the necessary directory structure
2. Generate a configuration file
3. Set up sample content
4. Create environment variable templates

## Configuration

Create `smart-sites.config.ts` in your project root:

```typescript
import type { SmartSitesConfig } from 'smart-sites-admin'

const config: SmartSitesConfig = {
  siteName: 'My Website',
  
  storage: {
    type: 'github',
    github: {
      owner: 'your-username',
      repo: 'your-repo',
      branch: 'main',
      contentPath: 'content',
    },
  },
  
  images: {
    type: 'vercel-blob',
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
  
  blocks: {
    enabled: ['hero', 'textImage', 'servicesGrid', 'testimonials', 'cta', 'team', 'contact', 'faq'],
    custom: [],
  },
  
  auth: {
    type: 'password',
    sessionDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}

export default config
```

## Environment Variables

```env
# Required
ADMIN_PASSWORD=your-secure-password

# GitHub Storage
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo
GITHUB_BRANCH=main

# Image Uploads
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## Content Structure

```
content/
├── site.json          # Global site configuration
└── pages/
    ├── home.json      # Home page content
    ├── about.json     # About page content
    └── contact.json   # Contact page content
```

### Page JSON Format

```json
{
  "pageSlug": "home",
  "pageTitle": "Home",
  "seo": {
    "title": "Welcome to My Website",
    "description": "A brief description for search engines."
  },
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "headline": "Welcome",
        "subheadline": "Your tagline here",
        "buttonText": "Get Started",
        "buttonLink": "/contact"
      }
    }
  ]
}
```

## Block Types

| Type | Description |
|------|-------------|
| `hero` | Full-width hero section with headline, subheadline, and CTA |
| `textImage` | Text content with image (left or right aligned) |
| `servicesGrid` | Grid of services/features with icons |
| `testimonials` | Customer testimonials with ratings |
| `cta` | Call-to-action section with customizable colors |
| `team` | Team member profiles with photos and social links |
| `contact` | Contact information with optional form |
| `faq` | Frequently asked questions (accordion or grid) |

## Integration Modes

### Same Codebase
Admin panel lives inside your Next.js project:
```
your-project/
├── app/
│   ├── admin/        # Admin pages
│   └── api/          # API routes
├── content/          # JSON content files
└── smart-sites.config.ts
```

### Separate Deployment
Admin hosted separately, connects to your site's GitHub repo:
1. Deploy this admin system to its own Vercel project
2. Configure it to point to your main site's GitHub repository
3. Changes made in admin auto-commit to your main site's repo

## API Reference

### Components

```tsx
import {
  // Admin Components
  LoginForm,
  AdminSidebar,
  SaveButton,
  ImageUploader,
  BlockEditor,
  AddBlockModal,
  
  // Block Display Components
  HeroBlock,
  TextImageBlock,
  ServicesGridBlock,
  TestimonialsBlock,
  CTABlock,
  TeamBlock,
  ContactBlock,
  FAQBlock,
  BlockRenderer,
  PageRenderer,
} from 'smart-sites-admin'
```

### Adapters

```tsx
import {
  createStorageAdapter,
  createImageAdapter,
  GitHubAdapter,
  LocalAdapter,
  VercelBlobAdapter,
} from 'smart-sites-admin'
```

### API Handlers

```tsx
import {
  createAuthHandler,
  createSaveHandler,
  createUploadHandler,
  createContentHandler,
} from 'smart-sites-admin'
```

## Development

```bash
# Clone the repository
git clone https://github.com/Smarter-revolution/smart-sites-admin.git

# Install dependencies
npm install

# Create .env.local
cp env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT © Smarter Revolution

## Support

- 📖 [Documentation](https://github.com/Smarter-revolution/smart-sites-admin)
- 🐛 [Issue Tracker](https://github.com/Smarter-revolution/smart-sites-admin/issues)
- 💬 [Discussions](https://github.com/Smarter-revolution/smart-sites-admin/discussions)
