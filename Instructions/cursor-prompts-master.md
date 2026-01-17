# Cursor AI Prompts: Smart Sites Lite Build Sequence

Copy and paste these prompts into Cursor in order. Each builds on the previous.

---

## PROMPT 1: Project Initialization

```
Create a new Next.js 14 project with the following specifications:

TECH STACK:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- No src directory (use root /app)

PROJECT STRUCTURE:
Create this exact folder structure:

/app
  /admin
    /[pageSlug]
      page.tsx
    /components
      (empty for now)
    layout.tsx
    page.tsx
  /(public)
    /[...slug]
      page.tsx
    page.tsx
    layout.tsx
  /api
    /admin
      /auth
        route.ts
      /save
        route.ts
      /upload
        route.ts
    /content
      /[page]
        route.ts
  layout.tsx
  globals.css
/components
  /blocks
    (empty for now)
  /ui
    (empty for now)
/content
  /pages
    home.json
    about.json
    services.json
    contact.json
  site.json
/lib
  content.ts
  github.ts
  auth.ts
  types.ts
/public
  /images
    (empty)

INITIAL FILES TO CREATE:

1. /content/site.json with placeholder site config (siteName, logo, navigation array, footer object)

2. /content/pages/home.json with this structure:
{
  "pageSlug": "home",
  "pageTitle": "Home", 
  "seo": { "title": "", "description": "" },
  "blocks": []
}

3. Create similar empty page JSON files for about, services, contact

4. /lib/types.ts with TypeScript interfaces for:
- SiteConfig
- PageContent
- Block (with id, type, data)
- All block data types (HeroBlockData, TextImageBlockData, etc.)

5. Basic /app/layout.tsx with Tailwind setup

6. Empty placeholder components

Do not add any content or functionality yet - just the structure.
```

---

## PROMPT 2: TypeScript Types & Interfaces

```
In /lib/types.ts, create comprehensive TypeScript types for the entire system:

SITE CONFIG TYPE:
interface SiteConfig {
  siteName: string
  logo: string
  navigation: { label: string; href: string }[]
  footer: {
    copyright: string
    phone: string
    email: string
    address?: string
  }
}

BLOCK DATA TYPES (create interface for each):

1. HeroBlockData:
   - headline: string
   - subheadline: string
   - buttonText: string
   - buttonLink: string
   - backgroundImage: string

2. TextImageBlockData:
   - headline: string
   - body: string
   - image: string
   - imageAlt: string
   - imagePosition: 'left' | 'right'

3. ServicesGridBlockData:
   - headline: string
   - subheadline?: string
   - services: { title: string; description: string; icon: string }[]

4. TestimonialsBlockData:
   - headline: string
   - testimonials: { quote: string; author: string; company: string; photo?: string }[]

5. CTABlockData:
   - headline: string
   - body: string
   - buttonText: string
   - buttonLink: string
   - backgroundColor?: string

6. TeamBlockData:
   - headline: string
   - subheadline?: string
   - members: { name: string; title: string; bio: string; photo: string }[]

7. ContactBlockData:
   - headline: string
   - body: string
   - email: string
   - phone: string
   - address?: string
   - showForm: boolean

8. FAQBlockData:
   - headline: string
   - questions: { question: string; answer: string }[]

BLOCK UNION TYPE:
type BlockType = 'hero' | 'textImage' | 'servicesGrid' | 'testimonials' | 'cta' | 'team' | 'contact' | 'faq'

interface Block {
  id: string
  type: BlockType
  data: HeroBlockData | TextImageBlockData | ServicesGridBlockData | TestimonialsBlockData | CTABlockData | TeamBlockData | ContactBlockData | FAQBlockData
}

PAGE CONTENT TYPE:
interface PageContent {
  pageSlug: string
  pageTitle: string
  seo: {
    title: string
    description: string
  }
  blocks: Block[]
}

Export all types.
```

---

## PROMPT 3: Content Loading Utilities

```
Create /lib/content.ts with utilities for loading and managing content:

REQUIREMENTS:
- Use Node.js fs module to read JSON files from /content directory
- All functions should be async
- Handle errors gracefully with try/catch
- Use the types from /lib/types.ts

FUNCTIONS TO CREATE:

1. getSiteConfig(): Promise<SiteConfig>
   - Reads /content/site.json
   - Returns parsed SiteConfig object

2. getPageContent(pageSlug: string): Promise<PageContent | null>
   - Reads /content/pages/{pageSlug}.json
   - Returns null if page doesn't exist
   - Returns parsed PageContent object

3. getAllPages(): Promise<{ slug: string; title: string }[]>
   - Reads all JSON files in /content/pages/
   - Returns array of { slug, title } for sidebar navigation

4. getPageSlugs(): Promise<string[]>
   - Returns array of all page slugs for static generation

IMPLEMENTATION NOTES:
- Use path.join with process.cwd() for file paths
- Use fs/promises for async file operations
- Cache results in development with a simple in-memory cache
- Export all functions

Example usage:
const site = await getSiteConfig()
const homePage = await getPageContent('home')
const allPages = await getAllPages()
```

---

## PROMPT 4: Display Block Components

```
Create all display block components in /components/blocks/. Each component should:
- Accept typed props using interfaces from /lib/types.ts
- Use Tailwind CSS for styling
- Be responsive (mobile-first)
- Use Next.js Image component for all images
- Be clean, modern, professional design

CREATE THESE COMPONENTS:

1. /components/blocks/HeroBlock.tsx
   - Full-width hero with background image
   - Centered headline, subheadline, CTA button
   - Dark overlay on image for text readability
   - Min-height: 500px on desktop, 400px mobile

2. /components/blocks/TextImageBlock.tsx
   - Two-column layout (stacks on mobile)
   - Image on left or right based on imagePosition prop
   - Headline, body text, image with alt
   - Generous padding and spacing

3. /components/blocks/ServicesGridBlock.tsx
   - Headline centered at top
   - 3-column grid (2 on tablet, 1 on mobile)
   - Each service: icon, title, description
   - Use Lucide React icons (map icon string to component)

4. /components/blocks/TestimonialsBlock.tsx
   - Headline at top
   - Testimonial cards in grid or carousel
   - Each: quote in italics, author name, company, optional photo
   - Quote marks styling

5. /components/blocks/CTABlock.tsx
   - Full-width colored background section
   - Centered headline, body, button
   - Support custom backgroundColor prop
   - High contrast, attention-grabbing

6. /components/blocks/TeamBlock.tsx
   - Headline and optional subheadline
   - Grid of team member cards
   - Each: photo (circular), name, title, short bio
   - 3 columns desktop, 2 tablet, 1 mobile

7. /components/blocks/ContactBlock.tsx
   - Two-column: info on left, optional form on right
   - Display email, phone, address with icons
   - If showForm is true, include basic contact form UI (no functionality yet)

8. /components/blocks/FAQBlock.tsx
   - Headline at top
   - Accordion-style Q&A
   - Click question to expand/collapse answer
   - Use React state for open/close

9. /components/blocks/index.ts
   - Export all blocks
   - Create BlockRenderer component that takes a Block and renders the correct component based on type

STYLING GUIDELINES:
- Use consistent spacing: py-16 or py-20 for sections
- Max-width container: max-w-6xl mx-auto px-4
- Headlines: text-3xl md:text-4xl font-bold
- Body text: text-lg text-gray-600
- Buttons: px-6 py-3 rounded-lg font-semibold with hover states
```

---

## PROMPT 5: Public Page Rendering

```
Set up the public-facing pages that render content from JSON files:

1. /app/(public)/layout.tsx
   - Fetch site config using getSiteConfig()
   - Include Header component with logo and navigation
   - Include Footer component with site info
   - Wrap children in main tag

2. /components/ui/Header.tsx
   - Display logo (Next.js Image)
   - Navigation links from site config
   - Mobile hamburger menu with slide-out drawer
   - Sticky header with background blur on scroll

3. /components/ui/Footer.tsx
   - Site name and copyright
   - Contact info (phone, email)
   - Navigation links repeated
   - Simple, clean design

4. /app/(public)/page.tsx (Homepage)
   - Fetch home page content using getPageContent('home')
   - Map through blocks array
   - Render each block using BlockRenderer
   - Add SEO metadata from page content

5. /app/(public)/[...slug]/page.tsx (Dynamic pages)
   - Catch-all route for all other pages
   - Extract slug from params
   - Fetch page content for that slug
   - Return 404 if page doesn't exist
   - Render blocks same as homepage

6. Generate static params:
   - Export generateStaticParams function
   - Use getPageSlugs() to pre-render all pages

7. Metadata:
   - Export generateMetadata function for each page
   - Use SEO title and description from page content

The public site should be fully functional with sample content after this step.
```

---

## PROMPT 6: Admin Authentication

```
Create the admin authentication system:

1. /lib/auth.ts
   - Create verifyPassword(password: string): boolean
     - Compare against process.env.ADMIN_PASSWORD
   - Create createSession(): string
     - Generate random session token
   - Create verifySession(token: string): boolean
     - Verify token (store valid tokens in memory for simplicity)
   - Session expires after 24 hours

2. /app/api/admin/auth/route.ts
   - POST handler for login
   - Accept { password } in body
   - Verify password using verifyPassword()
   - If valid, create session and return token
   - If invalid, return 401
   - Set HttpOnly cookie with session token

3. /app/admin/components/LoginForm.tsx
   - Simple login form with password field only
   - Submit button
   - Error message display for wrong password
   - Loading state while authenticating
   - Call /api/admin/auth on submit
   - On success, call onSuccess prop callback
   - Clean, centered design with card styling

4. Middleware or layout check:
   - In /app/admin/layout.tsx
   - Check for valid session cookie
   - If no valid session, show LoginForm
   - If valid session, show admin interface
   - Use client-side state to track auth status

ENVIRONMENT VARIABLE:
ADMIN_PASSWORD=your-secure-password

Keep it simple - this is protecting content editing, not nuclear codes. A single shared password stored in env vars is fine for this use case.
```

---

## PROMPT 7: Admin Layout & Navigation

```
Build the admin interface shell:

1. /app/admin/layout.tsx
   - Check authentication status
   - If not authenticated, render LoginForm
   - If authenticated, render admin shell:
     - Sidebar on left (fixed, 250px wide)
     - Main content area on right
   - Dark sidebar, light content area
   - Pass children to main content area

2. /app/admin/components/AdminSidebar.tsx
   - Logo/site name at top
   - "Pages" section header
   - List all pages from getAllPages()
   - Each page is a link to /admin/{pageSlug}
   - Active page highlighted
   - "Site Settings" link at bottom (future feature)
   - Logout button at very bottom
   - Styling: dark background (gray-900), white text

3. /app/admin/page.tsx (Dashboard)
   - Welcome message
   - Quick stats (number of pages, last edit date - placeholder for now)
   - "Select a page from the sidebar to start editing"
   - Clean, simple dashboard design

4. /app/admin/components/AdminHeader.tsx
   - Shows current page being edited
   - Save button (passed as prop or context)
   - "View Live Site" link that opens public page in new tab
   - Unsaved changes indicator

STYLING:
- Sidebar: bg-gray-900 text-white w-64 fixed h-screen
- Content: ml-64 bg-gray-50 min-h-screen p-8
- Use consistent spacing and typography
- Professional, clean admin aesthetic
```

---

## PROMPT 8: Block Editor Components

```
Create editor components for each block type in /app/admin/components/editors/:

PATTERN FOR ALL EDITORS:
- Accept props: { data: BlockDataType, onChange: (data: BlockDataType) => void }
- Render form fields for each editable property
- Call onChange with updated data on any field change
- Use consistent form styling

1. /app/admin/components/editors/HeroEditor.tsx
   - Text input for headline
   - Textarea for subheadline
   - Text inputs for buttonText and buttonLink
   - ImageUploader for backgroundImage

2. /app/admin/components/editors/TextImageEditor.tsx
   - Text input for headline
   - Textarea for body (larger, maybe 4 rows)
   - ImageUploader for image
   - Text input for imageAlt
   - Radio or select for imagePosition (left/right)

3. /app/admin/components/editors/ServicesGridEditor.tsx
   - Text input for headline
   - Textarea for subheadline
   - Dynamic list for services:
     - Each service: title input, description textarea, icon select
     - Add/remove service buttons
     - Drag to reorder (optional, use array index buttons if simpler)

4. /app/admin/components/editors/TestimonialsEditor.tsx
   - Text input for headline
   - Dynamic list for testimonials:
     - Each: quote textarea, author input, company input, optional photo uploader
     - Add/remove testimonial buttons

5. /app/admin/components/editors/CTAEditor.tsx
   - Text input for headline
   - Textarea for body
   - Text inputs for buttonText and buttonLink
   - Color picker or preset select for backgroundColor

6. /app/admin/components/editors/TeamEditor.tsx
   - Text input for headline
   - Textarea for subheadline
   - Dynamic list for team members:
     - Each: name, title, bio textarea, photo uploader
     - Add/remove member buttons

7. /app/admin/components/editors/ContactEditor.tsx
   - Text input for headline
   - Textarea for body
   - Text inputs for email, phone, address
   - Checkbox for showForm

8. /app/admin/components/editors/FAQEditor.tsx
   - Text input for headline
   - Dynamic list for Q&A pairs:
     - Each: question input, answer textarea
     - Add/remove buttons

9. /app/admin/components/editors/index.ts
   - Export all editors
   - Create getEditorForBlockType(type: BlockType) function that returns the correct editor component

FORM STYLING (use consistently):
- Labels: block text-sm font-medium text-gray-700 mb-1
- Inputs: w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
- Textareas: same as inputs, resize-y
- Sections: bg-white rounded-lg shadow p-6 space-y-4
- Field groups: space-y-4
```

---

## PROMPT 9: Page Editor & Block Editor Wrapper

```
Create the main page editing interface:

1. /app/admin/components/BlockEditor.tsx
   - Wrapper component for individual blocks
   - Props: { block: Block, onChange: (data: any) => void }
   - Collapsible card UI:
     - Header shows block type name and collapse toggle
     - Collapsed by default, click to expand
     - When expanded, render the appropriate editor component
   - Delete block button (with confirmation)
   - Visual indicator for block type (icon or color)

2. /app/admin/[pageSlug]/page.tsx
   - Fetch page content on mount using API route
   - Store content in state
   - Track hasChanges state (dirty flag)
   - Render:
     - Page title header
     - Save button with loading/disabled states
     - List of BlockEditor components for each block
     - "Add Block" button at bottom
   - Handle block changes: update state, set hasChanges true
   - Handle save: POST to /api/admin/save

3. /app/admin/components/AddBlockModal.tsx
   - Modal that appears when "Add Block" clicked
   - Grid of block type options with icons and names
   - Click block type to add new block with default/empty data
   - Generate unique ID for new block

4. /app/admin/components/SaveButton.tsx
   - Props: { onClick, saving, disabled, hasChanges }
   - Shows "Save Changes" normally
   - Shows spinner and "Saving..." when saving
   - Disabled when no changes or currently saving
   - Green color for enabled, gray for disabled

5. Add unsaved changes warning:
   - If hasChanges is true and user tries to navigate away
   - Use beforeunload event
   - Show browser confirmation dialog

IMPORTANT UX DETAILS:
- Show loading skeleton while fetching page content
- Show success toast/message after save completes
- Include "last saved" timestamp
- Smooth accordion animation for block expand/collapse
```

---

## PROMPT 10: Image Upload System

```
Implement the complete image upload pipeline with Vercel Blob:

1. Install @vercel/blob package:
   npm install @vercel/blob

2. /app/api/admin/upload/route.ts
   - Import { put } from '@vercel/blob'
   - POST handler accepts FormData with 'file' field
   - Validate file exists
   - Validate file type (image/jpeg, image/png, image/webp, image/gif only)
   - Validate file size (max 5MB)
   - Generate unique filename: timestamp-originalname
   - Upload to Vercel Blob with public access
   - Return { url: blob.url } on success
   - Return appropriate error responses

3. /app/admin/components/ImageUploader.tsx
   - Props: { currentImage: string, onUpload: (url: string) => void }
   - State: uploading, preview URL, error message
   - Hidden file input, triggered by button click
   - On file select:
     - Validate file type client-side
     - Show local preview immediately using URL.createObjectURL
     - Set uploading state true
     - Create FormData, POST to /api/admin/upload
     - On success: call onUpload with returned URL, update preview
     - On error: show error message, clear preview
   - UI:
     - If currentImage exists, show current image preview
     - Upload/Replace button
     - Loading overlay while uploading
     - Error message display
     - Drag and drop support (bonus)

4. Update all editor components to use ImageUploader:
   - HeroEditor: backgroundImage field
   - TextImageEditor: image field
   - TestimonialsEditor: photo field for each testimonial
   - TeamEditor: photo field for each team member

ENVIRONMENT VARIABLE (auto-added by Vercel):
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

IMAGE PREVIEW STYLING:
- Container: relative aspect-video or aspect-square depending on use
- Image: object-cover rounded-lg
- Loading overlay: absolute inset-0 bg-black/50 with spinner
- Replace button: absolute bottom-2 right-2 or below image
```

---

## PROMPT 11: GitHub Auto-Commit Integration

```
Implement the save-to-GitHub system:

1. Install Octokit:
   npm install @octokit/rest

2. /lib/github.ts
   - Import Octokit
   - Initialize with process.env.GITHUB_TOKEN
   - Constants: REPO_OWNER, REPO_NAME from env vars
   
   Export async function commitContentFile(
     filePath: string,
     content: string,
     commitMessage: string
   ): Promise<{ success: boolean; error?: string }>
   
   Implementation:
   - Try to get current file SHA (needed for updates)
   - If file doesn't exist, SHA will be undefined (new file)
   - Call octokit.repos.createOrUpdateFileContents with:
     - owner, repo, path
     - message: commitMessage
     - content: Base64 encoded content string
     - sha: if updating existing file
     - branch: 'main'
   - Return success/error status

3. /app/api/admin/save/route.ts
   - POST handler
   - Accept { pageSlug, content } in body
   - Convert content to pretty-printed JSON string
   - File path: content/pages/{pageSlug}.json
   - Commit message: "Update {pageTitle} page content"
   - Call commitContentFile
   - Return success with message about rebuild time
   - Handle errors gracefully

4. /app/api/admin/save-site/route.ts (for site.json)
   - Similar to above but for /content/site.json
   - Commit message: "Update site settings"

5. Add to page editor:
   - Call /api/admin/save on save button click
   - Show success message: "Saved! Your changes will be live in about 60 seconds."
   - Show error message if save fails
   - Reset hasChanges to false on success

ENVIRONMENT VARIABLES:
GITHUB_TOKEN=ghp_xxxxxxxxxx (personal access token with repo scope)
GITHUB_OWNER=your-github-username
GITHUB_REPO=client-site-repo-name

ERROR HANDLING:
- If GitHub API fails, show user-friendly error
- Log full error to console for debugging
- Don't lose user's changes on error (keep in state)
```

---

## PROMPT 12: Content API Routes

```
Create API routes for fetching content (used by admin interface):

1. /app/api/content/[page]/route.ts
   - GET handler
   - Extract page slug from params
   - Use getPageContent() from /lib/content.ts
   - Return JSON content
   - Return 404 if page doesn't exist

2. /app/api/content/site/route.ts
   - GET handler for site config
   - Use getSiteConfig()
   - Return JSON

3. /app/api/content/pages/route.ts
   - GET handler
   - Use getAllPages()
   - Return array of { slug, title }

Note: These API routes are needed because the admin interface runs client-side and can't directly use fs to read files. The public pages use server components and can read files directly.

Add authentication check to all admin-related API routes:
- Check for valid session cookie/token
- Return 401 if not authenticated
- Only /api/content/* routes used by public site should be accessible without auth

Update /lib/content.ts if needed to work both server-side (direct fs access) and via API (for client components).
```

---

## PROMPT 13: Sample Content & Styling Polish

```
Create complete sample content for a fictional client site:

1. /content/site.json - Complete site config:
   - siteName: "Meridian Consulting"
   - logo: placeholder or use a simple text logo initially
   - navigation: Home, About, Services, Contact
   - footer: copyright, phone, email

2. /content/pages/home.json - Full homepage:
   - Hero block: compelling headline about business consulting
   - TextImage block: brief intro to the company
   - ServicesGrid block: 3-4 services
   - Testimonials block: 2-3 testimonials
   - CTA block: contact call-to-action

3. /content/pages/about.json:
   - Hero block: about page header
   - TextImage block: company story
   - Team block: 3-4 team members
   - CTA block

4. /content/pages/services.json:
   - Hero block: services header
   - ServicesGrid block: detailed services (6 items)
   - FAQ block: common questions
   - CTA block

5. /content/pages/contact.json:
   - Hero block: contact header
   - Contact block: all info, showForm: true

For images, use placeholder URLs from:
- https://images.unsplash.com/photo-[id]?w=1920&h=1080&fit=crop
- Find appropriate business/professional stock photos

STYLING POLISH:
- Review all block components for consistent spacing
- Ensure responsive breakpoints work well
- Add subtle hover effects to buttons and links
- Add smooth transitions (transition-all duration-200)
- Ensure text is readable on all backgrounds
- Check color contrast for accessibility

Create /app/globals.css additions if needed for:
- Custom scrollbar styling
- Focus visible states
- Any animations
```

---

## PROMPT 14: Final Integration & Testing

```
Final integration tasks:

1. Create comprehensive .env.example file:
   ```
   # Admin Authentication
   ADMIN_PASSWORD=change-this-password
   
   # GitHub (for content auto-commit)
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_OWNER=your-username
   GITHUB_REPO=your-repo-name
   
   # Vercel Blob (auto-configured by Vercel)
   BLOB_READ_WRITE_TOKEN=
   ```

2. Create README.md with:
   - Project overview
   - Setup instructions
   - Environment variable documentation
   - Deployment steps
   - Client handoff checklist

3. Test the complete flow:
   - Build and run locally
   - Navigate all public pages
   - Log into admin
   - Edit a text field, verify state updates
   - Upload an image, verify it appears
   - Save changes, verify GitHub commit
   - Trigger Vercel rebuild, verify changes appear

4. Error boundary:
   - Add error boundary component for admin interface
   - Graceful error display if something breaks
   - "Something went wrong" with retry option

5. Loading states:
   - Skeleton loaders for page content
   - Button loading spinners
   - Image upload progress

6. Toast notifications:
   - Install a toast library or create simple custom one
   - Success: "Changes saved successfully"
   - Error: "Failed to save. Please try again."
   - Info: "Your site will update in about 60 seconds"

7. Create /app/not-found.tsx:
   - Custom 404 page matching site design
   - Link back to homepage

8. Verify mobile responsiveness:
   - Public site: all blocks stack properly
   - Admin: may be desktop-only with "Best viewed on desktop" message on mobile
```

---

## FINAL CHECKLIST

After running all prompts, verify:

- [ ] Public site loads and displays all sample content
- [ ] All block types render correctly
- [ ] Navigation works between pages
- [ ] Admin login works with env password
- [ ] Admin sidebar shows all pages
- [ ] Clicking page loads its content in editor
- [ ] All editor fields update state correctly
- [ ] Image upload works (Vercel Blob configured)
- [ ] Save button commits to GitHub
- [ ] Vercel auto-deploys on commit
- [ ] Changes appear on live site after rebuild
- [ ] Mobile public site looks good
- [ ] No console errors

---

*Copy each prompt in sequence. Each builds on the previous work. Total build time: 1-2 days with Cursor.*
