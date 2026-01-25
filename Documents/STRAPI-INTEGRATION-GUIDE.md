# Strapi CMS Integration Guide for Smarter Revolution

**Cursor AI Implementation Playbook**

---

## Project Overview

**Website:** https://website-update-smarter-revolution.vercel.app  
**Framework:** Next.js 14+ (App Router)  
**CMS:** Strapi v5 (Headless CMS)  
**Purpose:** Enable Wolf/Mark to manage blog content and create new pages without code changes

---

## ⚠️ IMPORTANT: Vercel + Strapi Compatibility

### Will This Conflict with Vercel?

**NO — There is NO conflict.** Here's why:

Strapi (backend/CMS) and your Next.js website (frontend) are **completely separate deployments**:

| Component | Where It Lives | Purpose |
|-----------|---------------|---------|
| **Strapi CMS** | Strapi Cloud | Content management, API, admin panel |
| **Next.js Website** | Vercel | Frontend, renders pages, fetches from Strapi API |

**Key Points:**
1. **Strapi CANNOT be deployed on Vercel** — Vercel is for serverless/static sites, Strapi needs a persistent Node.js process
2. **This is the recommended architecture** — Strapi on Strapi Cloud (or any Node.js host), Next.js frontend on Vercel
3. **They communicate via API** — Your Next.js app fetches content from Strapi's REST/GraphQL API
4. **No code conflicts** — They're separate repositories/projects

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR SETUP                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐         API Calls         ┌─────────────┐ │
│   │                 │  ──────────────────────►  │             │ │
│   │   VERCEL        │                           │   STRAPI    │ │
│   │   (Next.js)     │  ◄──────────────────────  │   CLOUD     │ │
│   │                 │       JSON Response       │             │ │
│   │   Frontend      │                           │   Backend   │ │
│   │   website-      │                           │   CMS +     │ │
│   │   update-       │                           │   API       │ │
│   │   smarter-      │                           │             │ │
│   │   revolution    │                           │   Admin     │ │
│   │   .vercel.app   │                           │   Panel     │ │
│   │                 │                           │             │ │
│   └─────────────────┘                           └─────────────┘ │
│                                                                  │
│   ✅ Renders pages          Webhooks            ✅ Manages      │
│   ✅ Handles routing       (optional)           ✅ content      │
│   ✅ SEO/Performance    ──────────────►         ✅ Media files  │
│                          Triggers rebuild       ✅ User roles   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### CORS Configuration (Required)

You'll need to allow your Vercel domain to access the Strapi API. This is configured in Strapi's middleware settings:

```javascript
// In your Strapi project: ./config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://website-update-smarter-revolution.vercel.app',
        'https://smarterrevolution.com', // production domain
        'http://localhost:3000', // local development
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## Hosting Recommendation

### Optimal Choice: **Strapi Cloud Essential Plan** ($18/month)

Based on the project scope, I recommend **Strapi Cloud** over self-hosting for these reasons:

| Factor | Strapi Cloud | Self-Hosted |
|--------|--------------|-------------|
| Setup Time | Minutes | Hours/Days |
| Maintenance | Zero | Ongoing |
| Backups | Automatic | Manual setup |
| Security | Managed | Your responsibility |
| SSL/CDN | Included | Configure yourself |
| Cost | $18/month | $5-20/month VPS + time |
| Scaling | Automatic | Manual |
| Media Storage | Included CDN | Configure separately |

**Why Essential Plan:**
- 50,000 API requests/month (plenty for a company website)
- Custom domain support
- 15GB asset storage
- Git-based deployments from GitHub
- Automatic backups
- No cold starts (instant response)

**Alternative:** If you prefer self-hosting later, Strapi Cloud makes it easy to export and migrate. Start managed, migrate if needed.

---

## Part A: Strapi Installation & Setup (From Official Docs)

### Prerequisites

Before installing Strapi, ensure you have:

- **Node.js**: Active LTS versions only (`v20`, `v22`, or `v24`)
  - Check: `node --version`
  - ❌ Odd-number versions (v23, v25) are NOT supported
- **Package Manager**: npm (v6+), yarn, or pnpm
- **Python**: Required if using SQLite database
- **Git**: For version control and Strapi Cloud deployment
- **GitHub Account**: Required for Strapi Cloud deployment

```bash
# Verify your setup
node --version    # Should be v20.x, v22.x, or v24.x
npm --version     # Should be v6+
git --version     # Any recent version
```

### Step 1: Create a New Strapi Project

Open your terminal and run:

```bash
npx create-strapi@latest smarter-revolution-cms
```

**What happens next:**

1. **Terminal prompts you to log in** — Select `Login/Sign up` and press Enter
2. **Browser opens** — Confirm the code matches what's in terminal, click **Confirm**
3. **Click "Continue with GitHub"** — Log in if needed
4. **Browser shows "Congratulations"** — Close the browser tab, return to terminal
5. **Answer terminal questions** — Press Enter to accept defaults:

```
? Do you want to use the default database (sqlite)? Yes
? Start with an example structure & data? No
? Start with Typescript? Yes
? Install dependencies with npm? Yes
? Initialize a git repository? Yes
```

**Wait for installation to complete.** This creates:
- A new folder: `smarter-revolution-cms/`
- A `.strapi-cloud.json` file linking to Strapi Cloud
- A local SQLite database for development

### Step 2: Start the Development Server

```bash
cd smarter-revolution-cms
npm run develop
```

**Your browser automatically opens** to `http://localhost:1337/admin`

### Step 3: Create Your First Admin User

Fill out the registration form:
- **First name:** Wolf (or your name)
- **Last name:** Krammel
- **Email:** wolf@smarterrevolution.com
- **Password:** (choose a strong password)

Click **Let's start** — You're now in the Strapi Admin Panel!

### Step 4: Create Content Types

Now we'll create the content structure. Go to **Content-Type Builder** in the left sidebar.

#### Create "Blog Post" Collection Type

1. Click **Create new collection type**
2. Display name: `Blog Post`
3. Click **Continue**
4. Add fields (click **Add another field** after each):

| Field Type | Name | Settings |
|------------|------|----------|
| Text | `title` | Required, Unique |
| UID | `slug` | Attached field: title |
| Text | `excerpt` | Max length: 300 |
| Rich text (Blocks) | `content` | — |
| Media | `featuredImage` | Single media |
| Datetime | `publishedAt` | — |
| Boolean | `featured` | Default: false |

5. Click **Finish**, then **Save**
6. Wait for Strapi to restart

#### Create "Category" Collection Type

1. Click **Create new collection type**
2. Display name: `Category`
3. Add fields:

| Field Type | Name | Settings |
|------------|------|----------|
| Text | `name` | Required, Unique |
| UID | `slug` | Attached field: name |
| Text | `description` | — |

4. Click **Finish**, then **Save**

#### Create "Author" Collection Type

1. Click **Create new collection type**
2. Display name: `Author`
3. Add fields:

| Field Type | Name | Settings |
|------------|------|----------|
| Text | `name` | Required |
| UID | `slug` | Attached field: name |
| Text | `bio` | Long text |
| Media | `photo` | Single media |

4. Click **Finish**, then **Save**

#### Add Relations

1. Go back to **Blog Post** in Content-Type Builder
2. Click **Add another field to this collection type**
3. Select **Relation**
4. Configure: `Blog Post` **belongs to many** `Categories`
5. Click **Finish**
6. Add another Relation: `Blog Post` **has one** `Author`
7. Click **Finish**, then **Save**

### Step 5: Configure API Permissions

1. Go to **Settings** (gear icon) → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Under **Permissions**, expand each content type and check:
   - ✅ `find` (get all)
   - ✅ `findOne` (get single)
4. Do this for: Blog Post, Category, Author
5. Click **Save**

### Step 6: Create an API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Configure:
   - **Name:** `NextJS Frontend (Read Only)`
   - **Description:** `Token for Next.js website to fetch content`
   - **Token duration:** Unlimited
   - **Token type:** Read-only
4. Click **Save**
5. **⚠️ COPY THE TOKEN NOW** — You won't see it again!

Save this token securely — you'll add it to your Next.js environment variables.

---

## Part B: Deploy Strapi to Strapi Cloud

### Step 1: Stop Local Server & Deploy

```bash
# Press Ctrl+C to stop the local server
# Make sure you're in the smarter-revolution-cms folder

npm run strapi deploy
```

### Step 2: Answer Deployment Questions

```
? Project name: smarter-revolution-cms (or press Enter for default)
? Node.js version: Choose the recommended version
? Region: Select closest to your location (US for most users)
```

**Wait a few minutes** — Your project is being deployed to Strapi Cloud!

### Step 3: Access Your Cloud Project

When complete, the terminal shows a URL like:
```
https://cloud.strapi.io/projects/smarter-revolution-cms-xxxxx
```

1. Click the link (or copy/paste to browser)
2. Click **Visit app** in the Strapi Cloud dashboard
3. **Create a new admin user** (cloud database is separate from local)

Your Strapi CMS is now live! 🚀

**Your API URL will be something like:**
```
https://smarter-revolution-cms-xxxxx.strapiapp.com
```

---

## Part C: Add More Content Types for the Website

Go back to your local development environment to add more content types, then redeploy:

```bash
cd smarter-revolution-cms
npm run develop
```

### Create Additional Content Types

Refer to the "Content Types to Create in Strapi" section below for the full schema. After creating content types locally:

```bash
# Stop the server (Ctrl+C), then deploy changes
npm run strapi deploy
```

Changes sync to Strapi Cloud automatically!

---

## Content Types to Create in Strapi

Based on the website analysis, here are the content types that need CMS management:

### 1. Blog Posts (Priority: HIGH)
```
Collection Type: blog-post
Fields:
├── title (Text, Required)
├── slug (UID, based on title)
├── excerpt (Text, max 300 chars)
├── content (Rich Text / Blocks)
├── featuredImage (Media, single)
├── author (Relation → Author)
├── category (Relation → Category)
├── tags (Relation → Tag, many)
├── publishedAt (Datetime)
├── seo (Component → SEO)
└── status (Enumeration: draft, published)
```

### 2. Service Pages (Priority: HIGH)
```
Collection Type: service-page
Fields:
├── title (Text, Required)
├── slug (UID)
├── heroHeadline (Text)
├── heroSubheadline (Text)
├── heroImage (Media)
├── features (Component → Feature, repeatable)
├── benefits (Component → Benefit, repeatable)
├── ctaText (Text)
├── ctaLink (Text)
├── content (Rich Text / Blocks)
├── seo (Component → SEO)
└── order (Number, for sorting)
```

### 3. Solution Pages (Priority: HIGH)
```
Collection Type: solution-page
Fields:
├── title (Text, Required)
├── slug (UID)
├── icon (Text, emoji or icon name)
├── shortDescription (Text, max 200 chars)
├── heroContent (Rich Text)
├── useCases (Component → UseCase, repeatable)
├── testimonial (Relation → Testimonial)
├── relatedServices (Relation → Service Page, many)
├── seo (Component → SEO)
└── published (Boolean)
```

### 4. Team Members (Priority: MEDIUM)
```
Collection Type: team-member
Fields:
├── name (Text, Required)
├── slug (UID)
├── role (Text)
├── photo (Media)
├── bio (Rich Text)
├── linkedIn (Text)
├── email (Email)
├── order (Number)
└── featured (Boolean)
```

### 5. Testimonials (Priority: MEDIUM)
```
Collection Type: testimonial
Fields:
├── quote (Text, Required)
├── authorName (Text, Required)
├── authorTitle (Text)
├── company (Text)
├── authorPhoto (Media)
├── featured (Boolean)
└── order (Number)
```

### 6. Case Studies (Priority: MEDIUM)
```
Collection Type: case-study
Fields:
├── title (Text, Required)
├── slug (UID)
├── client (Text)
├── industry (Text)
├── challenge (Rich Text)
├── solution (Rich Text)
├── results (Component → Result, repeatable)
├── testimonial (Relation → Testimonial)
├── images (Media, multiple)
├── seo (Component → SEO)
└── published (Boolean)
```

### 7. Global Settings (Priority: HIGH)
```
Single Type: global-settings
Fields:
├── siteName (Text)
├── siteDescription (Text)
├── logo (Media)
├── favicon (Media)
├── socialLinks (Component → SocialLink, repeatable)
├── footerText (Text)
├── contactEmail (Email)
├── contactPhone (Text)
├── ctaDefaultText (Text)
└── ctaDefaultLink (Text)
```

### 8. Navigation (Priority: HIGH)
```
Single Type: navigation
Fields:
├── mainMenu (Component → MenuItem, repeatable)
├── footerServices (Component → MenuItem, repeatable)
├── footerSolutions (Component → MenuItem, repeatable)
├── footerResources (Component → MenuItem, repeatable)
└── footerCompany (Component → MenuItem, repeatable)
```

### Reusable Components

```
Component: seo
├── metaTitle (Text)
├── metaDescription (Text, max 160)
├── ogImage (Media)
└── noIndex (Boolean)

Component: feature
├── icon (Text)
├── title (Text)
├── description (Text)
└── link (Text, optional)

Component: benefit
├── icon (Text)
├── title (Text)
└── description (Text)

Component: menu-item
├── label (Text)
├── url (Text)
├── openInNewTab (Boolean)
└── children (Component → MenuItem, repeatable)

Component: social-link
├── platform (Enumeration: linkedin, twitter, facebook, instagram, youtube)
├── url (Text)
└── icon (Text)

Component: result
├── metric (Text)
├── value (Text)
└── description (Text)
```

---

## Implementation Steps

### Phase 1: Strapi Setup (Day 1)

#### Step 1.1: Create Strapi Cloud Account
```bash
# Navigate to https://cloud.strapi.io
# Sign up with GitHub for easy deployment
# Select "Essential" plan ($18/month)
# Choose US region (closer to Vercel)
```

#### Step 1.2: Create New Project
```bash
# In Strapi Cloud dashboard:
# 1. Click "Create new project"
# 2. Name: smarter-revolution-cms
# 3. Select Strapi v5
# 4. Connect to GitHub repository (create new or use existing)
# 5. Deploy
```

#### Step 1.3: Configure Content Types
```bash
# In Strapi Admin Panel:
# 1. Go to Content-Type Builder
# 2. Create each collection type from the schema above
# 3. Create components first (they're dependencies)
# 4. Set up relations between types
```

#### Step 1.4: Configure API Permissions
```bash
# Settings → Users & Permissions → Roles → Public
# Enable find and findOne for:
# - blog-post
# - service-page
# - solution-page
# - team-member
# - testimonial
# - case-study
# - global-settings
# - navigation
```

#### Step 1.5: Create API Token
```bash
# Settings → API Tokens → Create new API Token
# Name: NextJS Frontend (Read Only)
# Type: Read-only
# Token duration: Unlimited
# Copy and save securely
```

---

### Phase 2: Next.js Integration (Day 2-3)

#### Step 2.1: Install Dependencies
```bash
# In your Next.js project root:
npm install qs
# qs is for building Strapi query strings
```

#### Step 2.2: Environment Variables
```bash
# Create/update .env.local
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your_read_only_api_token
```

#### Step 2.3: Create Strapi Client
```typescript
// lib/strapi.ts

import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

async function fetchStrapi<T>(
  endpoint: string,
  query?: object,
  options?: RequestInit
): Promise<T> {
  const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : '';
  
  const response = await fetch(`${STRAPI_URL}/api${endpoint}${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Strapi error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Blog Posts
export async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
}) {
  const query = {
    populate: ['featuredImage', 'author', 'category', 'tags', 'seo'],
    filters: {
      ...(params?.category && { category: { slug: { $eq: params.category } } }),
      ...(params?.tag && { tags: { slug: { $contains: params.tag } } }),
    },
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    },
    sort: ['publishedAt:desc'],
  };

  return fetchStrapi<StrapiResponse<any[]>>('/blog-posts', query);
}

export async function getBlogPost(slug: string) {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['featuredImage', 'author', 'category', 'tags', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<any[]>>('/blog-posts', query);
  return response.data[0] || null;
}

// Service Pages
export async function getServicePages() {
  const query = {
    populate: ['heroImage', 'features', 'benefits', 'seo'],
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<any[]>>('/service-pages', query);
}

export async function getServicePage(slug: string) {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['heroImage', 'features', 'benefits', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<any[]>>('/service-pages', query);
  return response.data[0] || null;
}

// Solution Pages
export async function getSolutionPages() {
  const query = {
    populate: ['useCases', 'testimonial', 'relatedServices', 'seo'],
    filters: { published: { $eq: true } },
  };

  return fetchStrapi<StrapiResponse<any[]>>('/solution-pages', query);
}

export async function getSolutionPage(slug: string) {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['useCases', 'testimonial', 'relatedServices', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<any[]>>('/solution-pages', query);
  return response.data[0] || null;
}

// Team Members
export async function getTeamMembers() {
  const query = {
    populate: ['photo'],
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<any[]>>('/team-members', query);
}

// Testimonials
export async function getTestimonials(featured?: boolean) {
  const query = {
    populate: ['authorPhoto'],
    filters: featured ? { featured: { $eq: true } } : {},
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<any[]>>('/testimonials', query);
}

// Global Settings
export async function getGlobalSettings() {
  const query = {
    populate: ['logo', 'favicon', 'socialLinks'],
  };

  return fetchStrapi<StrapiSingleResponse<any>>('/global-settings', query);
}

// Navigation
export async function getNavigation() {
  const query = {
    populate: {
      mainMenu: { populate: ['children'] },
      footerServices: { populate: '*' },
      footerSolutions: { populate: '*' },
      footerResources: { populate: '*' },
      footerCompany: { populate: '*' },
    },
  };

  return fetchStrapi<StrapiSingleResponse<any>>('/navigation', query);
}

// Case Studies
export async function getCaseStudies() {
  const query = {
    populate: ['images', 'testimonial', 'results', 'seo'],
    filters: { published: { $eq: true } },
  };

  return fetchStrapi<StrapiResponse<any[]>>('/case-studies', query);
}

export async function getCaseStudy(slug: string) {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['images', 'testimonial', 'results', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<any[]>>('/case-studies', query);
  return response.data[0] || null;
}
```

#### Step 2.4: Create TypeScript Types
```typescript
// types/strapi.ts

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogImage?: StrapiImage;
  noIndex: boolean;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  photo?: StrapiImage;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text blocks
  featuredImage?: StrapiImage;
  author?: Author;
  category?: Category;
  tags?: Tag[];
  publishedAt: string;
  seo?: SEO;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

export interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ServicePage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage?: StrapiImage;
  features: Feature[];
  benefits: Benefit[];
  ctaText: string;
  ctaLink: string;
  content: any;
  seo?: SEO;
  order: number;
}

export interface UseCase {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface SolutionPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  heroContent: any;
  useCases: UseCase[];
  testimonial?: Testimonial;
  relatedServices?: ServicePage[];
  seo?: SEO;
  published: boolean;
}

export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  authorPhoto?: StrapiImage;
  featured: boolean;
  order: number;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  role: string;
  photo?: StrapiImage;
  bio: any;
  linkedIn?: string;
  email?: string;
  order: number;
  featured: boolean;
}

export interface Result {
  id: number;
  metric: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: any;
  solution: any;
  results: Result[];
  testimonial?: Testimonial;
  images?: StrapiImage[];
  seo?: SEO;
  published: boolean;
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
  children?: MenuItem[];
}

export interface SocialLink {
  id: number;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  url: string;
  icon?: string;
}

export interface GlobalSettings {
  siteName: string;
  siteDescription: string;
  logo?: StrapiImage;
  favicon?: StrapiImage;
  socialLinks: SocialLink[];
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  ctaDefaultText: string;
  ctaDefaultLink: string;
}

export interface Navigation {
  mainMenu: MenuItem[];
  footerServices: MenuItem[];
  footerSolutions: MenuItem[];
  footerResources: MenuItem[];
  footerCompany: MenuItem[];
}
```

#### Step 2.5: Create Image Helper Component
```typescript
// components/StrapiImage.tsx

import Image from 'next/image';
import { StrapiImage as StrapiImageType } from '@/types/strapi';

interface StrapiImageProps {
  image: StrapiImageType;
  size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function StrapiImage({
  image,
  size = 'original',
  className,
  priority = false,
  fill = false,
  width,
  height,
}: StrapiImageProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
  
  // Get the appropriate image URL based on size
  let imageUrl = image.url;
  let imageWidth = image.width;
  let imageHeight = image.height;

  if (size !== 'original' && image.formats?.[size]) {
    const format = image.formats[size]!;
    imageUrl = format.url;
    imageWidth = format.width;
    imageHeight = format.height;
  }

  // Strapi Cloud serves images from CDN, local Strapi needs base URL
  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`;

  if (fill) {
    return (
      <Image
        src={fullUrl}
        alt={image.alternativeText || ''}
        fill
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={fullUrl}
      alt={image.alternativeText || ''}
      width={width || imageWidth}
      height={height || imageHeight}
      className={className}
      priority={priority}
    />
  );
}
```

#### Step 2.6: Create Rich Text Renderer
```typescript
// components/RichText.tsx

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

interface RichTextProps {
  content: BlocksContent;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p className="mb-4">{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            const styles: Record<number, string> = {
              1: 'text-4xl font-bold mb-6',
              2: 'text-3xl font-bold mb-5',
              3: 'text-2xl font-bold mb-4',
              4: 'text-xl font-bold mb-3',
              5: 'text-lg font-bold mb-2',
              6: 'text-base font-bold mb-2',
            };
            return <Tag className={styles[level]}>{children}</Tag>;
          },
          list: ({ children, format }) => {
            if (format === 'ordered') {
              return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
            }
            return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
          },
          'list-item': ({ children }) => <li>{children}</li>,
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
              <code className="text-sm text-gray-100">{children}</code>
            </pre>
          ),
          image: ({ image }) => {
            const url = image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
            return (
              <figure className="my-6">
                <Image
                  src={url}
                  alt={image.alternativeText || ''}
                  width={image.width}
                  height={image.height}
                  className="rounded-lg"
                />
                {image.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            );
          },
          link: ({ children, url }) => (
            <Link href={url} className="text-cyan-500 hover:text-cyan-400 underline">
              {children}
            </Link>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
          strikethrough: ({ children }) => <s className="line-through">{children}</s>,
          code: ({ children }) => (
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-400">{children}</code>
          ),
        }}
      />
    </div>
  );
}
```

**Install the blocks renderer:**
```bash
npm install @strapi/blocks-react-renderer
```

---

### Phase 3: Page Implementation (Day 3-5)

#### Step 3.1: Blog List Page
```typescript
// app/blog/page.tsx

import { getBlogPosts } from '@/lib/strapi';
import { StrapiImage } from '@/components/StrapiImage';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Smarter Revolution',
  description: 'Insights on AI transformation, video production, and modern web infrastructure.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { data: posts, meta } = await getBlogPosts({
    page,
    pageSize: 10,
    category: searchParams.category,
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-12">Blog</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-gray-900 rounded-xl overflow-hidden">
              {post.featuredImage && (
                <div className="relative h-48">
                  <StrapiImage
                    image={post.featuredImage}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  {post.category && (
                    <span className="bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">
                      {post.category.name}
                    </span>
                  )}
                  <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                </div>
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-500">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-400">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {meta.pagination && meta.pagination.pageCount > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: meta.pagination.pageCount }, (_, i) => (
              <Link
                key={i + 1}
                href={`/blog?page=${i + 1}`}
                className={`px-4 py-2 rounded ${
                  page === i + 1
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

#### Step 3.2: Blog Post Page
```typescript
// app/blog/[slug]/page.tsx

import { getBlogPost, getBlogPosts } from '@/lib/strapi';
import { StrapiImage } from '@/components/StrapiImage';
import { RichText } from '@/components/RichText';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: posts } = await getBlogPosts({ pageSize: 100 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo?.metaTitle || `${post.title} | Smarter Revolution`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.seo?.ogImage?.url || post.featuredImage?.url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="max-w-4xl mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="bg-cyan-500/10 text-cyan-500 px-3 py-1 rounded-full text-sm">
                {post.category.name}
              </span>
            )}
            <time className="text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
          {post.author && (
            <div className="flex items-center gap-4">
              {post.author.photo && (
                <StrapiImage
                  image={post.author.photo}
                  size="thumbnail"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{post.author.name}</p>
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
            <StrapiImage
              image={post.featuredImage}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <RichText content={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
```

#### Step 3.3: Dynamic Service Pages
```typescript
// app/[service]/page.tsx (for video-production, web-development, etc.)

import { getServicePage, getServicePages } from '@/lib/strapi';
import { StrapiImage } from '@/components/StrapiImage';
import { RichText } from '@/components/RichText';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

// Define which slugs are service pages
const SERVICE_SLUGS = ['video-production', 'web-development', 'guided-knowledge-hub'];

export async function generateStaticParams() {
  const { data: services } = await getServicePages();
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { service: string };
}): Promise<Metadata> {
  // Only process known service slugs
  if (!SERVICE_SLUGS.includes(params.service)) {
    return { title: 'Not Found' };
  }

  const service = await getServicePage(params.service);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seo?.metaTitle || `${service.title} | Smarter Revolution`,
    description: service.seo?.metaDescription || service.heroSubheadline,
  };
}

export default async function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  // Only handle service slugs
  if (!SERVICE_SLUGS.includes(params.service)) {
    notFound();
  }

  const service = await getServicePage(params.service);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">{service.heroHeadline}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            {service.heroSubheadline}
          </p>
          <a
            href={service.ctaLink}
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-lg"
          >
            {service.ctaText}
          </a>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.features.map((feature) => (
                <div key={feature.id} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.benefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-4 p-6 bg-gray-900 rounded-xl">
                  <div className="text-3xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      {service.content && (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4">
            <RichText content={service.content} />
          </div>
        </section>
      )}
    </main>
  );
}
```

---

### Phase 4: Webhooks & Revalidation (Day 5)

#### Step 4.1: Create Revalidation API Route
```typescript
// app/api/revalidate/route.ts

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-strapi-webhook-secret');
  
  // Verify webhook secret
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    // Revalidate based on content type
    switch (model) {
      case 'blog-post':
        revalidatePath('/blog');
        if (entry?.slug) {
          revalidatePath(`/blog/${entry.slug}`);
        }
        break;
      case 'service-page':
        if (entry?.slug) {
          revalidatePath(`/${entry.slug}`);
        }
        break;
      case 'solution-page':
        revalidatePath('/solutions');
        if (entry?.slug) {
          revalidatePath(`/solutions/${entry.slug}`);
        }
        break;
      case 'team-member':
        revalidatePath('/team');
        break;
      case 'testimonial':
        revalidatePath('/');
        break;
      case 'global-settings':
      case 'navigation':
        // Revalidate all pages for global changes
        revalidatePath('/', 'layout');
        break;
      default:
        // Revalidate home page for unknown types
        revalidatePath('/');
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
```

#### Step 4.2: Configure Strapi Webhook
```bash
# In Strapi Admin Panel:
# Settings → Webhooks → Create new webhook

# Name: Revalidate NextJS
# URL: https://website-update-smarter-revolution.vercel.app/api/revalidate
# Headers: x-strapi-webhook-secret = your_secret_here
# Events: entry.create, entry.update, entry.delete, entry.publish, entry.unpublish
```

#### Step 4.3: Add Environment Variable
```bash
# In Vercel Dashboard → Settings → Environment Variables
STRAPI_WEBHOOK_SECRET=generate_a_strong_secret_here
```

---

## Migration Checklist

### Understanding Local vs Cloud Databases

**⚠️ Important:** Local and Strapi Cloud databases are SEPARATE. Content created locally does NOT automatically sync to the cloud.

**Workflow:**
1. **Content Types** (schema) → Created locally, deployed via `npm run strapi deploy`
2. **Content** (actual data) → Created directly in Strapi Cloud admin panel
3. **OR** use Strapi's Data Transfer feature to move content between environments

### Data Transfer Between Environments

If you need to move content from local to cloud (or vice versa):

```bash
# Export data from local Strapi
npm run strapi export -- --file export-backup

# Import data to another Strapi instance
npm run strapi import -- --file export-backup.tar.gz
```

Or use the `strapi transfer` command for direct transfers:

```bash
# Transfer from local to remote
npm run strapi transfer -- --to https://your-strapi-cloud-url.strapiapp.com/admin
```

**Recommended Workflow for Smarter Revolution:**
1. Create content types locally (development)
2. Deploy schema to Strapi Cloud (`npm run strapi deploy`)
3. Create actual content directly in Strapi Cloud admin panel
4. This keeps production content in one place and avoids sync issues

---

## Pre-Migration
- [ ] Backup current website code
- [ ] Document all current pages and their content
- [ ] Export any existing blog posts or content
- [ ] Screenshot current page layouts for reference

### Strapi Setup
- [ ] Create Strapi Cloud account
- [ ] Create project and deploy
- [ ] Create all content types (see schema above)
- [ ] Configure API permissions
- [ ] Create API token for Next.js

### Next.js Integration
- [ ] Install dependencies (`qs`, `@strapi/blocks-react-renderer`)
- [ ] Add environment variables
- [ ] Create Strapi client library
- [ ] Create TypeScript types
- [ ] Create helper components (StrapiImage, RichText)
- [ ] Update pages to fetch from Strapi

### Content Migration
- [ ] Migrate blog posts to Strapi
- [ ] Migrate team member info
- [ ] Create service page content
- [ ] Create solution page content
- [ ] Upload and organize media assets
- [ ] Configure navigation structure
- [ ] Set up global settings

### Testing & Launch
- [ ] Test all pages render correctly
- [ ] Test content updates trigger revalidation
- [ ] Verify SEO metadata works
- [ ] Test image optimization
- [ ] Performance test with Lighthouse
- [ ] Deploy to production

---

## Strapi Commands Quick Reference

### Local Development

```bash
# Create new Strapi project
npx create-strapi@latest my-project-name

# Start development server (with auto-reload)
npm run develop
# or
yarn develop

# Start production server
npm run start
# or
yarn start

# Build admin panel
npm run build
# or
yarn build
```

### Strapi Cloud Deployment

```bash
# Deploy to Strapi Cloud (first time & updates)
npm run strapi deploy
# or
yarn strapi deploy

# Link existing project to Strapi Cloud
npx @strapi/cloud-cli link
```

### Data Management

```bash
# Export data (creates .tar.gz backup)
npm run strapi export -- --file my-backup

# Import data
npm run strapi import -- --file my-backup.tar.gz

# Transfer data between instances
npm run strapi transfer -- --to https://destination-url.strapiapp.com/admin

# Transfer with token (for automated transfers)
npm run strapi transfer -- --to https://destination-url.strapiapp.com/admin --to-token YOUR_TRANSFER_TOKEN
```

### TypeScript (if using)

```bash
# Generate TypeScript types from content types
npm run strapi ts:generate-types
```

---

## Next.js Dependencies to Install

```bash
# In your Next.js project root:

# Query string builder for Strapi API queries
npm install qs
npm install -D @types/qs

# Rich text renderer for Strapi Blocks content
npm install @strapi/blocks-react-renderer
```

---

## File Structure Summary

```
your-nextjs-project/
├── app/
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts          # Webhook handler
│   ├── blog/
│   │   ├── page.tsx              # Blog list
│   │   └── [slug]/
│   │       └── page.tsx          # Blog post
│   ├── solutions/
│   │   └── [slug]/
│   │       └── page.tsx          # Solution pages
│   ├── team/
│   │   └── page.tsx              # Team page
│   └── [service]/
│       └── page.tsx              # Service pages
├── components/
│   ├── RichText.tsx              # Strapi blocks renderer
│   └── StrapiImage.tsx           # Image helper
├── lib/
│   └── strapi.ts                 # API client
├── types/
│   └── strapi.ts                 # TypeScript types
└── .env.local                    # Environment variables
```

---

## Cost Summary

| Item | Monthly Cost |
|------|--------------|
| Strapi Cloud Essential | $18 |
| Vercel (Pro, if needed) | $20 |
| **Total** | **$38-58/month** |

This is significantly cheaper than WordPress hosting with plugins, and provides better performance, security, and developer experience.

---

## Support Resources

- **Strapi Documentation:** https://docs.strapi.io
- **Strapi v5 Quick Start:** https://docs.strapi.io/cms/quick-start
- **Strapi Discord:** https://discord.strapi.io
- **Strapi Forum:** https://forum.strapi.io
- **Next.js + Strapi Tutorial:** https://strapi.io/blog/how-to-build-a-strapi-nextjs-blog
- **Vercel + Strapi Integration:** https://strapi.io/integrations/vercel

---

## Troubleshooting

### Common Issues & Solutions

#### 1. CORS Errors
**Symptom:** `Access-Control-Allow-Origin` errors in browser console

**Solution:** Update `./config/middlewares.js` in your Strapi project:
```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-vercel-domain.vercel.app', 'http://localhost:3000'],
  },
},
```
Then redeploy: `npm run strapi deploy`

#### 2. 401 Unauthorized Errors
**Symptom:** API returns 401 when fetching content

**Solutions:**
- Check API token is correct in `.env.local`
- Verify permissions are set in Settings → Users & Permissions → Roles → Public
- Ensure `find` and `findOne` are checked for your content types

#### 3. Content Not Showing After Publish
**Symptom:** Created content in Strapi but not appearing on website

**Solutions:**
- Make sure content is **Published** (not just saved as draft)
- Check if your Next.js page uses revalidation: `export const revalidate = 60;`
- Trigger webhook manually or wait for cache to expire

#### 4. Images Not Loading
**Symptom:** Images show broken or 404

**Solutions:**
- Add Strapi Cloud domain to `next.config.js`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.strapiapp.com',
    },
    {
      protocol: 'https',
      hostname: '*.media.strapiapp.com',
    },
  ],
},
```
- Check image URL construction in your components

#### 5. TypeScript Errors with Strapi Response
**Symptom:** Type errors when accessing Strapi data

**Solution:** Use the TypeScript types from `/types/strapi.ts` provided in this guide, or generate them:
```bash
npm run strapi ts:generate-types
```

#### 6. Strapi Deploy Fails
**Symptom:** `npm run strapi deploy` errors

**Solutions:**
- Ensure you're logged in: Terminal will prompt if not
- Check Node.js version: Must be v20, v22, or v24
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

#### 7. Content-Type Builder Disabled in Production
**Symptom:** Can't create/edit content types in Strapi Cloud

**This is expected behavior!** Content types can only be modified in local development, then deployed. This prevents accidental schema changes in production.

**Workflow:**
1. Make changes locally (`npm run develop`)
2. Deploy to cloud (`npm run strapi deploy`)

---

*Document Version 1.1 — January 2026*
*Optimized for Cursor AI Implementation*
*Based on Strapi v5 Official Documentation: https://docs.strapi.io/cms/quick-start*
