// /lib/types.ts - Complete TypeScript definitions for Smart Sites Lite

// ============================================
// SITE CONFIGURATION
// ============================================

export interface NavItem {
  label: string
  href: string
}

export interface FooterConfig {
  copyright: string
  phone: string
  email: string
  address?: string
  socialLinks?: {
    platform: string
    url: string
  }[]
}

export interface SiteConfig {
  siteName: string
  logo: string
  navigation: NavItem[]
  footer: FooterConfig
  primaryColor?: string
  secondaryColor?: string
}

// ============================================
// BLOCK DATA TYPES
// ============================================

export interface HeroBlockData {
  headline: string
  subheadline: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
  overlayOpacity?: number
}

export interface TextImageBlockData {
  headline: string
  body: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface ServicesGridBlockData {
  headline: string
  subheadline?: string
  services: ServiceItem[]
}

export interface Testimonial {
  quote: string
  author: string
  company: string
  photo?: string
}

export interface TestimonialsBlockData {
  headline: string
  testimonials: Testimonial[]
}

export interface CTABlockData {
  headline: string
  body: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
  textColor?: string
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  photo: string
}

export interface TeamBlockData {
  headline: string
  subheadline?: string
  members: TeamMember[]
}

export interface ContactBlockData {
  headline: string
  body: string
  email: string
  phone: string
  address?: string
  showForm: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQBlockData {
  headline: string
  questions: FAQItem[]
}

// ============================================
// BLOCK TYPE UNION
// ============================================

export type BlockType = 
  | 'hero' 
  | 'textImage' 
  | 'servicesGrid' 
  | 'testimonials' 
  | 'cta' 
  | 'team' 
  | 'contact' 
  | 'faq'

export type BlockData = 
  | HeroBlockData 
  | TextImageBlockData 
  | ServicesGridBlockData 
  | TestimonialsBlockData 
  | CTABlockData 
  | TeamBlockData 
  | ContactBlockData 
  | FAQBlockData

export interface Block<T extends BlockData = BlockData> {
  id: string
  type: BlockType
  data: T
}

// Type-safe block definitions
export interface HeroBlock extends Block<HeroBlockData> {
  type: 'hero'
}

export interface TextImageBlock extends Block<TextImageBlockData> {
  type: 'textImage'
}

export interface ServicesGridBlock extends Block<ServicesGridBlockData> {
  type: 'servicesGrid'
}

export interface TestimonialsBlock extends Block<TestimonialsBlockData> {
  type: 'testimonials'
}

export interface CTABlock extends Block<CTABlockData> {
  type: 'cta'
}

export interface TeamBlock extends Block<TeamBlockData> {
  type: 'team'
}

export interface ContactBlock extends Block<ContactBlockData> {
  type: 'contact'
}

export interface FAQBlock extends Block<FAQBlockData> {
  type: 'faq'
}

// ============================================
// PAGE CONTENT
// ============================================

export interface SEOConfig {
  title: string
  description: string
  ogImage?: string
}

export interface PageContent {
  pageSlug: string
  pageTitle: string
  seo: SEOConfig
  blocks: Block[]
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface SaveResponse {
  success: boolean
  message: string
  commitUrl?: string
}

export interface UploadResponse {
  url: string
}

export interface PageListItem {
  slug: string
  title: string
}

// ============================================
// ADMIN TYPES
// ============================================

export interface AdminSession {
  token: string
  expiresAt: number
}

export interface EditorProps<T extends BlockData> {
  data: T
  onChange: (data: T) => void
}

// ============================================
// DEFAULT BLOCK DATA
// ============================================

export const defaultBlockData: Record<BlockType, BlockData> = {
  hero: {
    headline: 'Your Headline Here',
    subheadline: 'Supporting text that explains your value proposition.',
    buttonText: 'Get Started',
    buttonLink: '/contact',
    backgroundImage: '',
    overlayOpacity: 0.5
  },
  textImage: {
    headline: 'Section Headline',
    body: 'Add your content here. Describe your services, tell your story, or share important information with your visitors.',
    image: '',
    imageAlt: 'Description of image',
    imagePosition: 'right'
  },
  servicesGrid: {
    headline: 'Our Services',
    subheadline: 'What we offer',
    services: [
      { title: 'Service One', description: 'Brief description of this service.', icon: 'star' },
      { title: 'Service Two', description: 'Brief description of this service.', icon: 'shield' },
      { title: 'Service Three', description: 'Brief description of this service.', icon: 'zap' }
    ]
  },
  testimonials: {
    headline: 'What Our Clients Say',
    testimonials: [
      { quote: 'Add a testimonial quote here.', author: 'Client Name', company: 'Company Name', photo: '' }
    ]
  },
  cta: {
    headline: 'Ready to Get Started?',
    body: 'Contact us today to learn more about how we can help.',
    buttonText: 'Contact Us',
    buttonLink: '/contact',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff'
  },
  team: {
    headline: 'Meet Our Team',
    subheadline: 'The people behind our success',
    members: [
      { name: 'Team Member', title: 'Position', bio: 'Brief bio about this team member.', photo: '' }
    ]
  },
  contact: {
    headline: 'Get In Touch',
    body: 'We would love to hear from you. Reach out using the information below.',
    email: 'hello@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, City, State 12345',
    showForm: true
  },
  faq: {
    headline: 'Frequently Asked Questions',
    questions: [
      { question: 'What is your question?', answer: 'Here is the answer to that question.' }
    ]
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateBlockId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function createNewBlock(type: BlockType): Block {
  return {
    id: generateBlockId(),
    type,
    data: { ...defaultBlockData[type] }
  }
}

export const blockTypeLabels: Record<BlockType, string> = {
  hero: 'Hero Section',
  textImage: 'Text & Image',
  servicesGrid: 'Features / Services Grid',
  testimonials: 'Testimonials',
  cta: 'Call to Action',
  team: 'Team Members',
  contact: 'Contact Info',
  faq: 'FAQ'
}

export const blockTypeDescriptions: Record<BlockType, string> = {
  hero: 'The main banner at the top of the page with headline, subheadline, and call-to-action button',
  textImage: 'A section with text content alongside an image',
  servicesGrid: 'A grid of features or services with icons and descriptions',
  testimonials: 'Customer quotes and reviews',
  cta: 'A prominent call-to-action section to drive conversions',
  team: 'Display team members with photos and bios',
  contact: 'Contact information and optional contact form',
  faq: 'Frequently asked questions with expandable answers'
}

export const blockTypeIcons: Record<BlockType, string> = {
  hero: 'layout',
  textImage: 'columns',
  servicesGrid: 'grid',
  testimonials: 'quote',
  cta: 'megaphone',
  team: 'users',
  contact: 'mail',
  faq: 'help-circle'
}
