// ============================================
// SMART SITES ADMIN - TYPE DEFINITIONS
// ============================================

// --------------------------------------------
// Configuration Types
// --------------------------------------------

export interface SmartSitesConfig {
  /** Site display name */
  siteName: string
  
  /** Storage configuration */
  storage: StorageConfig
  
  /** Image upload configuration */
  images: ImageConfig
  
  /** Block types configuration */
  blocks: BlocksConfig
  
  /** Pages configuration */
  pages: PagesConfig
  
  /** Authentication configuration */
  auth: AuthConfig
}

export interface StorageConfig {
  /** Storage adapter type */
  type: 'github' | 'local' | 'custom'
  
  /** GitHub-specific configuration */
  github?: {
    owner: string
    repo: string
    branch: string
    contentPath: string
    token?: string
  }
  
  /** Local storage configuration */
  local?: {
    basePath: string
  }
  
  /** Custom adapter */
  custom?: StorageAdapter
}

export interface ImageConfig {
  /** Image storage type */
  type: 'vercel-blob' | 'cloudinary' | 'local' | 'custom'
  
  /** Maximum file size in bytes */
  maxSize: number
  
  /** Allowed MIME types */
  allowedTypes: string[]
  
  /** Vercel Blob configuration */
  vercelBlob?: {
    token?: string
  }
  
  /** Cloudinary configuration */
  cloudinary?: {
    cloudName: string
    apiKey: string
    apiSecret: string
  }
}

export interface BlocksConfig {
  /** Enabled block types */
  enabled: BlockType[]
  
  /** Custom block definitions */
  custom: CustomBlockDefinition[]
}

export interface PagesConfig {
  /** Directory for page JSON files */
  directory: string
  
  /** Path to site config JSON */
  siteConfig: string
}

export interface AuthConfig {
  /** Authentication type */
  type: 'password' | 'oauth'
  
  /** Session duration in milliseconds */
  sessionDuration: number
}

// --------------------------------------------
// Storage Adapter Interface
// --------------------------------------------

export interface StorageAdapter {
  /** Read content from storage */
  read(path: string): Promise<string | null>
  
  /** Write content to storage */
  write(path: string, content: string, message?: string): Promise<void>
  
  /** List files in a directory */
  list(directory: string): Promise<string[]>
  
  /** Check if file exists */
  exists(path: string): Promise<boolean>
  
  /** Delete a file */
  delete(path: string): Promise<void>
}

export interface ImageAdapter {
  /** Upload an image */
  upload(file: File, filename?: string): Promise<string>
  
  /** Delete an image */
  delete(url: string): Promise<void>
}

// --------------------------------------------
// Site Configuration
// --------------------------------------------

export interface SiteConfig {
  siteName: string
  logo: string
  navigation: NavigationItem[]
  footer: FooterConfig
}

export interface NavigationItem {
  label: string
  href: string
}

export interface FooterConfig {
  copyright: string
  phone?: string
  email?: string
  address?: string
  socialLinks?: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

// --------------------------------------------
// Page Content
// --------------------------------------------

export interface PageContent {
  pageSlug: string
  pageTitle: string
  seo: SEOConfig
  blocks: Block[]
}

export interface SEOConfig {
  title: string
  description: string
  ogImage?: string
  keywords?: string[]
}

export interface PageListItem {
  slug: string
  title: string
}

// --------------------------------------------
// Block Types
// --------------------------------------------

export type BlockType = 
  | 'hero'
  | 'textImage'
  | 'servicesGrid'
  | 'testimonials'
  | 'cta'
  | 'team'
  | 'contact'
  | 'faq'

export interface Block {
  id: string
  type: BlockType
  data: BlockData
}

export type BlockData = 
  | HeroBlockData
  | TextImageBlockData
  | ServicesGridBlockData
  | TestimonialsBlockData
  | CTABlockData
  | TeamBlockData
  | ContactBlockData
  | FAQBlockData

// --------------------------------------------
// Block Data Types
// --------------------------------------------

export interface HeroBlockData {
  headline: string
  subheadline: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
  overlayOpacity?: number
  textAlignment?: 'left' | 'center' | 'right'
}

export interface TextImageBlockData {
  headline: string
  body: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  buttonText?: string
  buttonLink?: string
}

export interface ServicesGridBlockData {
  headline: string
  subheadline?: string
  services: ServiceItem[]
  columns?: 2 | 3 | 4
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
  link?: string
}

export interface TestimonialsBlockData {
  headline: string
  subheadline?: string
  testimonials: TestimonialItem[]
  layout?: 'grid' | 'carousel'
}

export interface TestimonialItem {
  quote: string
  author: string
  company?: string
  photo?: string
  rating?: number
}

export interface CTABlockData {
  headline: string
  body: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
  textColor?: string
}

export interface TeamBlockData {
  headline: string
  subheadline?: string
  members: TeamMember[]
  layout?: 'grid' | 'list'
}

export interface TeamMember {
  name: string
  title: string
  bio?: string
  photo: string
  email?: string
  linkedin?: string
}

export interface ContactBlockData {
  headline: string
  body?: string
  email: string
  phone?: string
  address?: string
  showForm?: boolean
  formFields?: FormField[]
  mapEmbed?: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required: boolean
  options?: string[]
}

export interface FAQBlockData {
  headline: string
  subheadline?: string
  questions: FAQItem[]
  layout?: 'accordion' | 'grid'
}

export interface FAQItem {
  question: string
  answer: string
}

// --------------------------------------------
// Custom Block Definition
// --------------------------------------------

export interface CustomBlockDefinition {
  type: string
  label: string
  icon: string
  defaultData: Record<string, unknown>
  editor: React.ComponentType<EditorProps<Record<string, unknown>>>
  display: React.ComponentType<{ data: Record<string, unknown> }>
}

// --------------------------------------------
// Editor Props
// --------------------------------------------

export interface EditorProps<T> {
  data: T
  onChange: (data: T) => void
}

// --------------------------------------------
// API Types
// --------------------------------------------

export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface SaveContentRequest {
  pageSlug: string
  content: PageContent
}

export interface SaveContentResponse {
  success: boolean
  message: string
  commitUrl?: string
}

export interface UploadImageResponse {
  success: boolean
  url?: string
  error?: string
}

export interface AuthRequest {
  password: string
}

export interface AuthResponse {
  success: boolean
  error?: string
}

// --------------------------------------------
// Utility Types
// --------------------------------------------

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// --------------------------------------------
// Block Metadata
// --------------------------------------------

export const blockTypeLabels: Record<BlockType, string> = {
  hero: 'Hero Section',
  textImage: 'Text & Image',
  servicesGrid: 'Services Grid',
  testimonials: 'Testimonials',
  cta: 'Call to Action',
  team: 'Team Members',
  contact: 'Contact Info',
  faq: 'FAQ Section',
}

export const blockTypeIcons: Record<BlockType, string> = {
  hero: '🎯',
  textImage: '📝',
  servicesGrid: '⚡',
  testimonials: '💬',
  cta: '📢',
  team: '👥',
  contact: '📧',
  faq: '❓',
}

// --------------------------------------------
// Utility Functions
// --------------------------------------------

export function generateBlockId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function createNewBlock(type: BlockType): Block {
  const defaultData: Record<BlockType, BlockData> = {
    hero: {
      headline: 'Your Headline Here',
      subheadline: 'Supporting text that explains your value proposition.',
      buttonText: 'Get Started',
      buttonLink: '/contact',
      backgroundImage: '',
      overlayOpacity: 0.5,
      textAlignment: 'center',
    },
    textImage: {
      headline: 'Section Headline',
      body: 'Add your content here. Describe your services, tell your story, or highlight key information.',
      image: '',
      imageAlt: 'Description of image',
      imagePosition: 'right',
    },
    servicesGrid: {
      headline: 'Our Services',
      subheadline: 'What we offer',
      services: [
        { title: 'Service 1', description: 'Description of service', icon: 'star' },
        { title: 'Service 2', description: 'Description of service', icon: 'shield' },
        { title: 'Service 3', description: 'Description of service', icon: 'zap' },
      ],
      columns: 3,
    },
    testimonials: {
      headline: 'What Our Clients Say',
      subheadline: 'Trusted by businesses worldwide',
      testimonials: [
        { quote: 'Amazing service!', author: 'John Doe', company: 'Company Inc.' },
      ],
      layout: 'grid',
    },
    cta: {
      headline: 'Ready to Get Started?',
      body: 'Contact us today to learn more about how we can help.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      backgroundColor: '#2563eb',
      textColor: '#ffffff',
    },
    team: {
      headline: 'Meet Our Team',
      subheadline: 'The people behind our success',
      members: [],
      layout: 'grid',
    },
    contact: {
      headline: 'Get in Touch',
      body: 'We\'d love to hear from you.',
      email: 'hello@example.com',
      phone: '',
      address: '',
      showForm: true,
    },
    faq: {
      headline: 'Frequently Asked Questions',
      subheadline: 'Find answers to common questions',
      questions: [
        { question: 'Sample question?', answer: 'Sample answer.' },
      ],
      layout: 'accordion',
    },
  }

  return {
    id: generateBlockId(),
    type,
    data: defaultData[type],
  }
}
