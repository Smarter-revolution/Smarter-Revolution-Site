// Strapi API Response Types
export interface StrapiResponse<T> {
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

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, never>;
}

// Media Type
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

// SEO Component
export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogImage?: StrapiImage;
  noIndex: boolean;
}

// Author Collection Type
export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  bio?: string;
  photo?: StrapiImage;
}

// Category Collection Type
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

// Tag Collection Type
export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

// Blog Post Collection Type
export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  featuredImage?: StrapiImage;
  author?: Author;
  category?: Category;
  tags?: Tag[];
  publishedAt: string;
  featured: boolean;
  seo?: SEO;
  status: 'draft' | 'published';
}

// Feature Component
export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  link?: string;
}

// Benefit Component
export interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Service Page Collection Type
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
  content: unknown;
  seo?: SEO;
  order: number;
}

// UseCase Component
export interface UseCase {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

// Testimonial Collection Type
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

// Solution Page Collection Type
export interface SolutionPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  heroContent: unknown;
  useCases: UseCase[];
  testimonial?: Testimonial;
  relatedServices?: ServicePage[];
  seo?: SEO;
  published: boolean;
}

// Team Member Collection Type
export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  role: string;
  photo?: StrapiImage;
  bio: unknown;
  linkedIn?: string;
  email?: string;
  order: number;
  featured: boolean;
}

// Result Component
export interface Result {
  id: number;
  metric: string;
  value: string;
  description?: string;
}

// Case Study Collection Type
export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: unknown;
  solution: unknown;
  results: Result[];
  testimonial?: Testimonial;
  images?: StrapiImage[];
  seo?: SEO;
  published: boolean;
}

// MenuItem Component
export interface MenuItem {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
  children?: MenuItem[];
}

// SocialLink Component
export interface SocialLink {
  id: number;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  url: string;
  icon?: string;
}

// Global Settings Single Type
export interface GlobalSettings {
  id: number;
  documentId: string;
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

// Navigation Single Type
export interface Navigation {
  id: number;
  documentId: string;
  mainMenu: MenuItem[];
  footerServices: MenuItem[];
  footerSolutions: MenuItem[];
  footerResources: MenuItem[];
  footerCompany: MenuItem[];
}
