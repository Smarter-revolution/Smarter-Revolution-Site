# Smart Sites Lite: Client-Editable Website Architecture

A lightweight, file-based CMS built on Next.js for Smarter Revolution client projects. Clients edit content through a simple admin interface—no technical knowledge required.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
├─────────────────────┬───────────────────────────────────────────┤
│   Public Website    │           /admin Interface                │
│   (Next.js SSG)     │     (Password Protected)                  │
└─────────┬───────────┴──────────────┬────────────────────────────┘
          │                          │
          │ reads                    │ writes
          ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     /content (JSON Files)                       │
│         pages/home.json, pages/about.json, etc.                 │
└─────────────────────────────────────────────────────────────────┘
          │                          │
          │                          ▼
          │               ┌─────────────────────┐
          │               │   GitHub API        │
          │               │   (auto-commit)     │
          │               └──────────┬──────────┘
          │                          │
          │                          ▼
          │               ┌─────────────────────┐
          │               │   Vercel Rebuild    │
          │               │   (30-60 seconds)   │
          │               └─────────────────────┘
          │
          │ images
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Vercel Blob Storage                       │
│              (client-uploaded images)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Project Structure

```
/project-root
├── /app
│   ├── /admin
│   │   ├── layout.tsx          # Admin shell with sidebar
│   │   ├── page.tsx            # Dashboard/page selector
│   │   ├── /[pageSlug]
│   │   │   └── page.tsx        # Edit interface for specific page
│   │   └── /components
│   │       ├── AdminSidebar.tsx
│   │       ├── BlockEditor.tsx
│   │       ├── ImageUploader.tsx
│   │       └── SaveButton.tsx
│   ├── /(public)
│   │   ├── page.tsx            # Homepage
│   │   ├── /about
│   │   ├── /services
│   │   └── /[...slug]          # Dynamic pages
│   ├── /api
│   │   ├── /admin
│   │   │   ├── auth/route.ts   # Password verification
│   │   │   ├── save/route.ts   # Save content + GitHub commit
│   │   │   └── upload/route.ts # Vercel Blob image upload
│   │   └── /content
│   │       └── [page]/route.ts # Fetch page content
│   └── layout.tsx
├── /components
│   ├── /blocks                 # Reusable content blocks
│   │   ├── HeroBlock.tsx
│   │   ├── TextImageBlock.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── TestimonialsBlock.tsx
│   │   ├── CTABlock.tsx
│   │   ├── TeamBlock.tsx
│   │   └── ContactBlock.tsx
│   └── /ui                     # Shared UI components
├── /content                    # JSON content files
│   ├── /pages
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── services.json
│   │   └── contact.json
│   └── site.json               # Global settings (logo, nav, footer)
├── /lib
│   ├── content.ts              # Content loading utilities
│   ├── github.ts               # GitHub API integration
│   └── auth.ts                 # Admin auth helpers
└── /public
    └── /images                 # Static assets (logo, icons)
```

---

## 2. Content Schema Design

### Global Site Config (`/content/site.json`)

```json
{
  "siteName": "Client Company Name",
  "logo": "https://blob.vercel-storage.com/logo-abc123.png",
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/about" },
    { "label": "Services", "href": "/services" },
    { "label": "Contact", "href": "/contact" }
  ],
  "footer": {
    "copyright": "© 2025 Client Company",
    "phone": "(555) 123-4567",
    "email": "hello@client.com"
  }
}
```

### Page Content (`/content/pages/home.json`)

```json
{
  "pageSlug": "home",
  "pageTitle": "Home",
  "seo": {
    "title": "Client Company | Tagline Here",
    "description": "Meta description for search engines."
  },
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "data": {
        "headline": "Your Powerful Headline Here",
        "subheadline": "Supporting text that explains the value.",
        "buttonText": "Get Started",
        "buttonLink": "/contact",
        "backgroundImage": "https://blob.vercel-storage.com/hero-bg-xyz.jpg"
      }
    },
    {
      "id": "text-image-1",
      "type": "textImage",
      "data": {
        "headline": "About Our Company",
        "body": "Paragraph text goes here. Can be multiple sentences.",
        "image": "https://blob.vercel-storage.com/about-photo.jpg",
        "imageAlt": "Team working together",
        "imagePosition": "right"
      }
    },
    {
      "id": "services-1",
      "type": "servicesGrid",
      "data": {
        "headline": "What We Offer",
        "services": [
          {
            "title": "Service One",
            "description": "Brief description.",
            "icon": "shield"
          },
          {
            "title": "Service Two",
            "description": "Brief description.",
            "icon": "chart"
          }
        ]
      }
    },
    {
      "id": "cta-1",
      "type": "cta",
      "data": {
        "headline": "Ready to Get Started?",
        "body": "Contact us today for a free consultation.",
        "buttonText": "Contact Us",
        "buttonLink": "/contact"
      }
    }
  ]
}
```

### Block Type Reference

| Block Type | Editable Fields | Use Case |
|------------|-----------------|----------|
| `hero` | headline, subheadline, buttonText, buttonLink, backgroundImage | Page headers |
| `textImage` | headline, body, image, imageAlt, imagePosition | About sections, features |
| `servicesGrid` | headline, services[] (title, description, icon) | Service listings |
| `testimonials` | headline, testimonials[] (quote, author, company, photo) | Social proof |
| `cta` | headline, body, buttonText, buttonLink, backgroundColor | Conversion sections |
| `team` | headline, members[] (name, title, bio, photo) | Team pages |
| `contact` | headline, body, email, phone, address | Contact info |
| `faq` | headline, questions[] (question, answer) | FAQ sections |

---

## 3. Block Component Pattern

Each block follows a consistent pattern with separate display and editor components.

### Display Component (`/components/blocks/HeroBlock.tsx`)

```tsx
import Image from 'next/image'
import Link from 'next/link'

interface HeroBlockProps {
  data: {
    headline: string
    subheadline: string
    buttonText: string
    buttonLink: string
    backgroundImage: string
  }
}

export function HeroBlock({ data }: HeroBlockProps) {
  return (
    <section className="relative h-[600px] flex items-center">
      <Image
        src={data.backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{data.headline}</h1>
        <p className="text-xl mb-8">{data.subheadline}</p>
        <Link 
          href={data.buttonLink}
          className="bg-white text-black px-8 py-3 rounded font-semibold"
        >
          {data.buttonText}
        </Link>
      </div>
    </section>
  )
}
```

### Editor Component (`/app/admin/components/editors/HeroEditor.tsx`)

```tsx
import { ImageUploader } from '../ImageUploader'

interface HeroEditorProps {
  data: HeroBlockData
  onChange: (data: HeroBlockData) => void
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Subheadline</label>
        <textarea
          value={data.subheadline}
          onChange={(e) => updateField('subheadline', e.target.value)}
          rows={2}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Button Text</label>
          <input
            type="text"
            value={data.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Button Link</label>
          <input
            type="text"
            value={data.buttonLink}
            onChange={(e) => updateField('buttonLink', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Background Image</label>
        <ImageUploader
          currentImage={data.backgroundImage}
          onUpload={(url) => updateField('backgroundImage', url)}
        />
      </div>
    </div>
  )
}
```

---

## 4. Admin Interface Architecture

### Authentication Flow

```
Client visits /admin
        │
        ▼
┌─────────────────┐     No      ┌─────────────────┐
│ Check session   │────────────▶│ Show login form │
│ cookie exists?  │             └────────┬────────┘
└────────┬────────┘                      │
         │ Yes                           │ Submit password
         ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│ Show admin      │◀────────────│ POST /api/admin │
│ dashboard       │   Set       │ /auth           │
└─────────────────┘   cookie    │ Verify against  │
                                │ ADMIN_PASSWORD  │
                                └─────────────────┘
```

### Admin Layout (`/app/admin/layout.tsx`)

```tsx
'use client'
import { useState, useEffect } from 'react'
import { AdminSidebar } from './components/AdminSidebar'
import { LoginForm } from './components/LoginForm'

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [pages, setPages] = useState([])
  
  useEffect(() => {
    // Check auth status and load page list
    checkAuth().then(setAuthenticated)
    loadPageList().then(setPages)
  }, [])
  
  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar pages={pages} />
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
```

### Page Editor (`/app/admin/[pageSlug]/page.tsx`)

```tsx
'use client'
import { useState, useEffect } from 'react'
import { BlockEditor } from '../components/BlockEditor'
import { SaveButton } from '../components/SaveButton'

export default function PageEditor({ params }) {
  const [content, setContent] = useState(null)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  useEffect(() => {
    fetch(`/api/content/${params.pageSlug}`)
      .then(r => r.json())
      .then(setContent)
  }, [params.pageSlug])
  
  const handleBlockChange = (blockId, newData) => {
    setContent(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === blockId ? { ...block, data: newData } : block
      )
    }))
    setHasChanges(true)
  }
  
  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pageSlug: params.pageSlug,
        content
      })
    })
    setSaving(false)
    setHasChanges(false)
  }
  
  if (!content) return <div>Loading...</div>
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Edit: {content.pageTitle}</h1>
        <SaveButton 
          onClick={handleSave} 
          saving={saving}
          disabled={!hasChanges}
        />
      </div>
      
      <div className="space-y-6">
        {content.blocks.map(block => (
          <BlockEditor
            key={block.id}
            block={block}
            onChange={(newData) => handleBlockChange(block.id, newData)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## 5. Image Upload Pipeline

### Vercel Blob Integration (`/app/api/admin/upload/route.ts`)

```ts
import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
  }
  
  // Generate unique filename
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
  
  // Upload to Vercel Blob
  const blob = await put(filename, file, {
    access: 'public',
  })
  
  return NextResponse.json({ url: blob.url })
}
```

### ImageUploader Component (`/app/admin/components/ImageUploader.tsx`)

```tsx
'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  currentImage: string
  onUpload: (url: string) => void
}

export function ImageUploader({ currentImage, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Show local preview immediately
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    
    const { url } = await response.json()
    onUpload(url)
    setPreview(url)
    setUploading(false)
  }
  
  return (
    <div className="border-2 border-dashed rounded-lg p-4">
      {preview && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white">Uploading...</span>
            </div>
          )}
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full py-2 border rounded hover:bg-gray-50"
      >
        {preview ? 'Replace Image' : 'Upload Image'}
      </button>
    </div>
  )
}
```

---

## 6. GitHub Commit Automation

### Save API Route (`/app/api/admin/save/route.ts`)

```ts
import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const REPO_OWNER = process.env.GITHUB_OWNER!
const REPO_NAME = process.env.GITHUB_REPO!
const BRANCH = 'main'

export async function POST(request: Request) {
  const { pageSlug, content } = await request.json()
  
  const filePath = `content/pages/${pageSlug}.json`
  const fileContent = JSON.stringify(content, null, 2)
  
  try {
    // Get current file SHA (required for updates)
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
        ref: BRANCH
      })
      if (!Array.isArray(data)) {
        sha = data.sha
      }
    } catch (e) {
      // File doesn't exist yet, that's okay
    }
    
    // Commit the updated content
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Update ${pageSlug} page content`,
      content: Buffer.from(fileContent).toString('base64'),
      sha,
      branch: BRANCH
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'Content saved. Site will update in ~60 seconds.'
    })
    
  } catch (error) {
    console.error('GitHub commit error:', error)
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    )
  }
}
```

---

## 7. Environment Variables

```bash
# .env.local (development)
# .env on Vercel (production)

# Admin Authentication
ADMIN_PASSWORD=your-secure-password-here

# GitHub Integration (for auto-commit)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=smarter-revolution
GITHUB_REPO=client-site-name

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxx
```

### GitHub Token Setup
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic) with `repo` scope
3. Add to Vercel environment variables

### Vercel Blob Setup
1. In Vercel dashboard, go to project → Storage → Create Database
2. Select Blob, create store
3. Token auto-added to environment variables

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Day 1-2)
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up project structure and folder organization
- [ ] Configure Tailwind CSS
- [ ] Create base layout components
- [ ] Set up Vercel deployment

### Phase 2: Content System (Day 2-3)
- [ ] Define JSON schema for all block types
- [ ] Create content loading utilities
- [ ] Build all display block components (Hero, TextImage, Services, etc.)
- [ ] Create dynamic page renderer
- [ ] Set up sample content files

### Phase 3: Admin Interface (Day 3-5)
- [ ] Build login form and auth middleware
- [ ] Create admin layout with sidebar navigation
- [ ] Build BlockEditor wrapper component
- [ ] Create editor components for each block type
- [ ] Implement save functionality (local state)

### Phase 4: Persistence Layer (Day 5-6)
- [ ] Set up Vercel Blob for image uploads
- [ ] Build ImageUploader component
- [ ] Implement GitHub API integration
- [ ] Create save API route with auto-commit
- [ ] Add success/error feedback UI

### Phase 5: Polish & Testing (Day 6-7)
- [ ] Add loading states throughout
- [ ] Implement unsaved changes warning
- [ ] Test full save/deploy cycle
- [ ] Mobile-responsive admin (basic)
- [ ] Document client handoff process

### Phase 6: Template & Reuse (Day 7+)
- [ ] Extract as reusable starter template
- [ ] Create setup script for new projects
- [ ] Write client user guide
- [ ] Build block type library

---

## 9. Client Handoff Checklist

### Pre-Handoff
- [ ] All pages created and content populated
- [ ] Images uploaded and optimized
- [ ] Admin password set and shared securely
- [ ] Test full edit → save → deploy cycle
- [ ] Verify mobile display of public site

### Client Training (15-20 minutes)
1. Walk through admin login
2. Show page selection sidebar
3. Demonstrate editing a text field
4. Demonstrate uploading/replacing an image
5. Explain save button and ~60 second delay
6. Show how to view changes on live site

### Documentation to Provide
- Admin URL and password
- List of pages and what each contains
- Image size recommendations (e.g., "Hero images: 1920x1080")
- Contact info for support requests
- Brief PDF or video walkthrough

---

## 10. Future Enhancements (Post-MVP)

**Nice to Have:**
- Preview mode before committing
- Revision history with rollback
- Scheduled publishing
- SEO field editing per page
- Multi-user with separate logins

**Potential Expansion:**
- Blog/news section with post creation
- Form submission handling
- Basic analytics dashboard
- A/B testing for blocks

---

## Quick Start Commands

```bash
# Create new project
npx create-next-app@latest client-site --typescript --tailwind --app

# Install dependencies
npm install @octokit/rest @vercel/blob

# Run development server
npm run dev

# Deploy to Vercel
vercel
```

---

*Architecture Version 1.0 | Smarter Revolution Smart Sites Lite*
