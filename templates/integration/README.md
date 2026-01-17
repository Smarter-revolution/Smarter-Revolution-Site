# Smart Sites Admin - Integration Templates

These templates help you integrate Smart Sites Admin into your existing Next.js project.

## Quick Integration

### 1. Copy Required Files

Copy these folders to your project:
- `api-routes/` → Your `app/api/` directory
- `admin-pages/` → Your `app/admin/` directory

### 2. Install Dependencies

```bash
npm install @octokit/rest @vercel/blob
```

### 3. Set Environment Variables

Create or update your `.env.local`:

```env
# Required
ADMIN_PASSWORD=your-secure-password

# For GitHub storage (recommended for production)
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo
GITHUB_BRANCH=main

# For image uploads
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 4. Create Content Directory

Create a `content/` directory in your project root with:
- `site.json` - Global site configuration
- `pages/` - Directory for page JSON files

### 5. Import Components

Import the admin components in your pages:

```tsx
import { BlockRenderer } from 'smart-sites-admin/components'
import { PageContent } from 'smart-sites-admin'
```

## File Structure

```
your-project/
├── app/
│   ├── admin/          # Admin panel (copy from admin-pages/)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [pageSlug]/
│   │       └── page.tsx
│   └── api/
│       ├── admin/      # Admin API routes (copy from api-routes/admin/)
│       │   ├── auth/
│       │   ├── save/
│       │   └── upload/
│       └── content/    # Content API routes (copy from api-routes/content/)
│           ├── [page]/
│           ├── pages/
│           └── site/
├── content/
│   ├── site.json
│   └── pages/
│       ├── home.json
│       └── about.json
└── smart-sites.config.ts
```
