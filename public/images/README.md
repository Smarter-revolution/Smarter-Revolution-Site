# Images & Media Organization

This directory contains all images and media assets for the Smarter Revolution website.

## Directory Structure

```
public/images/
├── blog/              # Blog post images
│   └── [slug]/       # Individual blog post folders
│       └── hero.png  # Hero image for each blog post
├── pages/            # Page-specific images (home, about, services, etc.)
├── shared/           # Shared images used across multiple pages
└── archive/          # Archived/unused images (not referenced in code)
```

## Folder Purpose

### `blog/<slug>/`
- **Purpose**: Blog post-specific images
- **Structure**: Each blog post has its own folder named after the slug
- **Automatic Resolution**: Hero images are automatically resolved from the slug at `/images/blog/[slug]/hero.png`
- **Example**: `blog/30-days-content-30-minutes/hero.png`

### `pages/<route>/`
- **Purpose**: Images specific to individual pages
- **Structure**: Create subdirectories for each route (e.g., `home/`, `about/`, `solutions/`, `contact/`)
- **Usage**: Page-specific hero images, illustrations, or content images
- **Example**: `pages/home/hero-image.jpg`, `pages/about/team-photo.jpg`

### `shared/`
- **Purpose**: Images used across multiple pages or components
- **Usage**: Logos, icons, backgrounds, common UI elements, or reusable assets
- **Example**: `shared/logo.svg`, `shared/background-pattern.png`

### `archive/`
- **Purpose**: Unused or deprecated images kept for reference
- **Note**: These images are not referenced in the codebase and can be safely removed if not needed

## Naming Conventions

### Blog Hero Images
- **Required Name**: `hero.png` (or `hero.jpg` if no transparency needed)
- **Location**: Must be placed in `blog/[slug]/hero.png`
- **Why**: The blog system automatically resolves hero images using this exact filename

### General File Naming
- **Format**: Lowercase letters only
- **Separators**: Use hyphens to separate words (e.g., `team-photo.jpg`, not `teamPhoto.jpg` or `team_photo.jpg`)
- **Descriptive**: Use clear, descriptive names that indicate the image's purpose
- **Examples**:
  - ✅ `hero-image.jpg`
  - ✅ `team-member-john.jpg`
  - ✅ `product-screenshot.png`
  - ❌ `IMG_1234.jpg`
  - ❌ `Hero Image.png`
  - ❌ `teamPhoto.jpg`

## Format Guidelines

### JPG/JPEG
- **Use for**: Photographs, complex images, images without transparency
- **When**: Most photos, product images, team photos
- **Compression**: Use quality settings between 80-90% for web

### PNG
- **Use for**: Images requiring transparency, screenshots, graphics with text overlays
- **When**: Logos with transparency, UI mockups, images with alpha channels
- **Note**: PNG files are larger; only use when transparency is needed

### SVG
- **Use for**: Icons, logos, simple graphics, scalable illustrations
- **When**: Vector graphics that need to scale without quality loss
- **Best for**: Icons in navigation, logos, simple illustrations

### WebP (Optional)
- **Use for**: Optimized web images when browser support is sufficient
- **Note**: Next.js Image component can handle WebP conversion automatically

## Size Guidelines

### Hero Images
- **Max Width**: 1600-2000px (recommended: 1920px)
- **Aspect Ratio**: Maintain consistent aspect ratios across similar image types
- **File Size**: Aim for under 300KB after compression
- **Why**: Balances visual quality with page load performance

### General Images
- **Max Width**: Match the maximum display size (don't upload 4000px images for 800px displays)
- **Compression**: Always compress images before adding to the repository
- **Avoid**: Uncompressed exports from design tools (e.g., Photoshop, Figma)
- **Tools**: Use image optimization tools (e.g., ImageOptim, Squoosh, TinyPNG) before committing

### Optimization Checklist
- [ ] Image is compressed/optimized
- [ ] File size is reasonable for web use (< 500KB for most images)
- [ ] Dimensions match intended display size
- [ ] Format is appropriate (JPG for photos, PNG for transparency, SVG for icons)
- [ ] Filename follows naming conventions (lowercase, hyphenated)

## Image References

All images in the `public/` directory are served from the root path:
- `public/images/blog/slug/hero.png` → `/images/blog/slug/hero.png`
- `public/images/pages/home/hero.png` → `/images/pages/home/hero.png`
- `public/images/shared/logo.png` → `/images/shared/logo.png`

## Quick Reference

### Adding a New Blog Post Image
1. Create folder: `blog/[your-slug]/`
2. Add hero image: `blog/[your-slug]/hero.png` (or `.jpg` if no transparency)
3. Optimize image to 1600-2000px width, < 300KB
4. The image will automatically be used by the blog system

### Adding a Page Image
1. Create subdirectory in `pages/` if needed: `pages/[route-name]/`
2. Use descriptive, lowercase, hyphenated filename
3. Choose appropriate format (JPG for photos, PNG for transparency)
4. Optimize before committing

### Adding a Shared Image
1. Place directly in `shared/` directory
2. Use clear, descriptive name
3. Consider if it truly needs to be shared (vs. page-specific)

## Current Blog Posts

The following blog posts have hero images:
- `30-days-content-30-minutes`
- `ai-tools-gathering-dust`
- `ai-video-production-is-the-future`
- `cinematic-audio-revolution`
- `the-geo-revolution`

