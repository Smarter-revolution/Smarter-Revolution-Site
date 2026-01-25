# Strapi CMS Usage Summary
## Your Deployed Strapi Instance

**Admin Panel URL:** https://heroic-friends-044edb428d.strapiapp.com/admin  
**API Base URL:** https://heroic-friends-044edb428d.strapiapp.com

---

## 🎯 What is Strapi?

Strapi is your **Content Management System (CMS)** - a backend that allows you to manage website content without touching code. Think of it like WordPress, but modern and API-first.

**Key Benefits:**
- ✅ Edit blog posts, pages, and content through a web interface
- ✅ Upload and manage images/media files
- ✅ No code changes needed for content updates
- ✅ Changes automatically appear on your website
- ✅ Secure admin panel with user roles

---

## 🚀 Getting Started

### Step 1: Access Your Admin Panel

1. Go to: **https://heroic-friends-044edb428d.strapiapp.com/admin**
2. **Log in** with your admin credentials (created during initial setup)
3. If you haven't created an admin user yet, you'll see a registration form

### Step 2: First-Time Setup Checklist

Once logged in, complete these essential configurations:

#### ✅ Configure API Permissions

**Important:** There are TWO "Roles" sections in Settings. You need the one under **"Users & Permissions plugin"**, NOT the one under "Administration panel".

**Correct Path:**
1. Go to **Settings** (⚙️ gear icon in left sidebar)
2. Scroll down and click **Users & Permissions plugin** (NOT "Administration panel")
3. Click **Roles** (under Users & Permissions plugin)
4. Click **Public** role (this controls API access for your website)
5. Under **Permissions**, expand each content type and check:
   - ✅ `find` (allows reading lists)
   - ✅ `findOne` (allows reading single items)
6. Do this for: **Blog Post**, **Service Page**, **Solution Page**, **Team Member**, **Testimonial**, etc.
7. Click **Save**

**Why this matters:** Your Next.js website needs permission to read content from Strapi's API. The "Public" role controls what anonymous API requests can access.

**Note:** 
- **Administration panel → Roles** = Controls who can access the admin panel (different purpose)
- **Users & Permissions plugin → Roles** = Controls API permissions (this is what you need!)

#### ✅ Create an API Token
1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Configure:
   - **Name:** `NextJS Frontend (Read Only)`
   - **Description:** `Token for Next.js website to fetch content`
   - **Token duration:** Unlimited
   - **Token type:** Read-only
4. Click **Save**
5. **⚠️ COPY THE TOKEN IMMEDIATELY** - You won't see it again!

**Save this token** - you'll need to add it to your Next.js environment variables.

---

## 📝 Managing Content Types

Based on your website structure, you can manage these content types:

### 1. **Blog Posts** (Priority: HIGH)
- Create, edit, and publish blog articles
- Add featured images, categories, tags
- Set publication dates
- Rich text editor for content

**How to use:**
1. Go to **Content Manager** → **Blog Post**
2. Click **Create new entry**
3. Fill in: title, slug (auto-generated), excerpt, content, featured image
4. Click **Save** then **Publish**

### 2. **Service Pages** (Priority: HIGH)
- Manage service page content (Video Production, Web Development, etc.)
- Hero sections, features, benefits
- CTA buttons and links

**How to use:**
1. Go to **Content Manager** → **Service Page**
2. Edit existing entries or create new ones
3. Update hero headlines, descriptions, features
4. **Publish** to make changes live

### 3. **Solution Pages** (Priority: HIGH)
- Manage solution pages (Compliance Documentation, Custom Portals, etc.)
- Use cases, testimonials
- Related services

### 4. **Team Members** (Priority: MEDIUM)
- Add/edit team member profiles
- Photos, bios, roles, LinkedIn links
- Control display order

### 5. **Testimonials** (Priority: MEDIUM)
- Add client testimonials
- Author photos, quotes, company info
- Mark as "featured" for homepage display

### 6. **Case Studies** (Priority: MEDIUM)
- Create detailed case studies
- Challenge, solution, results
- Multiple images and testimonials

### 7. **Global Settings** (Priority: HIGH)
- Site-wide settings (logo, contact info, social links)
- Footer text, default CTAs
- **Single entry** - edit the one existing entry

### 8. **Navigation** (Priority: HIGH)
- Manage main menu and footer navigation
- Menu items, links, nested menus
- **Single entry** - edit the one existing entry

---

## 🔗 Connecting Strapi to Your Next.js Website

### Environment Variables Required

Add these to your Next.js project (`.env.local` or Vercel environment variables):

```bash
NEXT_PUBLIC_STRAPI_URL=https://heroic-friends-044edb428d.strapiapp.com
STRAPI_API_TOKEN=your_api_token_here
```

**Where to add:**
- **Local development:** Create/update `.env.local` in your project root
- **Vercel production:** Go to Vercel Dashboard → Your Project → Settings → Environment Variables

### How It Works

```
┌─────────────────┐         API Calls         ┌─────────────────┐
│                 │  ──────────────────────►  │                 │
│   Next.js       │                            │     Strapi      │
│   Website       │  ◄──────────────────────  │     CMS         │
│   (Vercel)      │       JSON Response        │   (Cloud)       │
│                 │                            │                 │
└─────────────────┘                            └─────────────────┘
```

1. **You edit content** in Strapi admin panel
2. **You publish** the content
3. **Next.js fetches** content via API (using the token)
4. **Website displays** the updated content

---

## 📋 Common Tasks

### Creating a New Blog Post

1. **Content Manager** → **Blog Post** → **Create new entry**
2. Fill in:
   - **Title:** Your blog post title
   - **Slug:** Auto-generated from title (or customize)
   - **Excerpt:** Short description (max 300 chars)
   - **Content:** Use the rich text editor
   - **Featured Image:** Upload or select from media library
   - **Category:** Select or create category
   - **Tags:** Add relevant tags
   - **Published At:** Set publication date
3. Click **Save** (saves as draft)
4. Click **Publish** (makes it live)

### Uploading Images

1. Go to **Media Library** (left sidebar)
2. Click **Add new assets** or drag & drop
3. Images are automatically optimized and stored on CDN
4. Use images in blog posts, pages, etc.

### Editing Existing Content

1. **Content Manager** → Select content type
2. Click on any entry to edit
3. Make changes
4. Click **Save** then **Publish**

### Draft vs Published

- **Draft:** Saved but not visible on website
- **Published:** Live and visible on website
- Always click **Publish** after making changes!

---

## ⚙️ Important Settings

### CORS Configuration

If your website can't fetch content, you may need to configure CORS:

1. This is typically done in your Strapi project's `config/middlewares.js`
2. Add your website domains to allowed origins
3. Redeploy Strapi for changes to take effect

**Common domains to allow:**
- `https://your-vercel-app.vercel.app`
- `https://smarterrevolution.com`
- `http://localhost:3000` (for local development)

### Webhooks (Optional - For Instant Updates)

Set up webhooks to trigger Next.js revalidation when content changes:

1. **Settings** → **Webhooks** → **Create new webhook**
2. **URL:** `https://your-vercel-app.vercel.app/api/revalidate`
3. **Events:** Select `entry.create`, `entry.update`, `entry.publish`
4. This makes content updates appear instantly (otherwise, wait for cache to expire)

---

## 🎨 Content Type Builder

**⚠️ Important:** Content types can only be modified in **local development**, not in the cloud admin panel.

**To add new fields or content types:**
1. Work in your local Strapi project
2. Use **Content-Type Builder** to create/modify types
3. Deploy changes: `npm run strapi deploy`
4. Content structure syncs to cloud automatically

**Content (actual data)** is created directly in the cloud admin panel.

---

## 🔐 User Management

### Creating Additional Users

1. **Settings** → **Administration Panel** → **Users**
2. Click **Invite user** or **Create new user**
3. Assign roles (Admin, Editor, Author, etc.)
4. Users can log in at the same admin URL

### Roles & Permissions

- **Super Admin:** Full access to everything
- **Editor:** Can create/edit/publish content
- **Author:** Can create own content, needs approval to publish
- **Public:** API access (configured in Settings → Users & Permissions plugin → Roles → Public)

---

## 📊 API Endpoints

Your Strapi API is available at:
**https://heroic-friends-044edb428d.strapiapp.com/api**

**Example endpoints:**
- `/api/blog-posts` - Get all blog posts
- `/api/blog-posts?filters[slug][$eq]=my-post` - Get specific post
- `/api/service-pages` - Get all service pages
- `/api/team-members` - Get all team members

**Test API access:**
```bash
curl https://heroic-friends-044edb428d.strapiapp.com/api/blog-posts \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

---

## 🚨 Troubleshooting

### Content Not Showing on Website

**Check:**
1. ✅ Is content **Published** (not just saved as draft)?
2. ✅ Are API permissions configured (Settings → Users & Permissions plugin → Roles → Public)?
3. ✅ Is API token correct in Next.js environment variables?
4. ✅ Is `NEXT_PUBLIC_STRAPI_URL` set correctly?

### 401 Unauthorized Errors

- Verify API token is correct
- Check token hasn't expired
- Ensure Public role has `find` and `findOne` permissions

### Images Not Loading

- Check image URLs are correct
- Verify CORS settings allow your domain
- Ensure images are uploaded to Strapi Media Library

### Can't Edit Content Types

**This is normal!** Content types can only be modified locally, then deployed. This prevents accidental schema changes in production.

---

## 📚 Next Steps

### Immediate Actions:

1. ✅ **Log in** to admin panel
2. ✅ **Configure API permissions** (Public role)
3. ✅ **Create API token** and save it
4. ✅ **Add environment variables** to Next.js project
5. ✅ **Test API connection** from your website

### Content Migration:

1. **Migrate existing blog posts** from markdown files to Strapi
2. **Create service page content** in Strapi
3. **Add team member profiles**
4. **Upload images** to Media Library
5. **Set up navigation** structure

### Ongoing Usage:

- **Create new blog posts** as needed
- **Update service pages** when services change
- **Add testimonials** from clients
- **Manage team member** profiles
- **Update global settings** (contact info, social links)

---

## 💡 Pro Tips

1. **Use Drafts:** Save work as drafts, publish when ready
2. **Media Library:** Organize images in folders
3. **Slugs:** Keep slugs URL-friendly (lowercase, hyphens)
4. **SEO:** Fill in SEO fields for better search visibility
5. **Backup:** Strapi Cloud includes automatic backups
6. **Version Control:** Content types are versioned via Git deployment

---

## 📞 Support Resources

- **Strapi Documentation:** https://docs.strapi.io
- **Strapi Discord:** https://discord.strapi.io
- **Your Integration Guide:** `Documents/STRAPI-INTEGRATION-GUIDE.md`

---

**Your Strapi is live and ready to use!** 🎉

Start by logging in, configuring permissions, and creating your first blog post or updating existing content.
