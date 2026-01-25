import qs from 'qs';
import type {
  BlogPost,
  ServicePage,
  SolutionPage,
  TeamMember,
  Testimonial,
  GlobalSettings,
  Navigation,
  CaseStudy,
} from '@/types/strapi';

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
  meta: object;
}

async function fetchStrapi<T>(
  endpoint: string,
  query?: object,
  options?: RequestInit
): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL is not configured');
  }

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
}): Promise<StrapiResponse<BlogPost[]>> {
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

  return fetchStrapi<StrapiResponse<BlogPost[]>>('/blog-posts', query);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['featuredImage', 'author', 'category', 'tags', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<BlogPost[]>>('/blog-posts', query);
  return response.data[0] || null;
}

// Service Pages
export async function getServicePages(): Promise<StrapiResponse<ServicePage[]>> {
  const query = {
    populate: ['heroImage', 'features', 'benefits', 'seo'],
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<ServicePage[]>>('/service-pages', query);
}

export async function getServicePage(slug: string): Promise<ServicePage | null> {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['heroImage', 'features', 'benefits', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<ServicePage[]>>('/service-pages', query);
  return response.data[0] || null;
}

// Solution Pages
export async function getSolutionPages(): Promise<StrapiResponse<SolutionPage[]>> {
  const query = {
    populate: ['useCases', 'testimonial', 'relatedServices', 'seo'],
    filters: { published: { $eq: true } },
  };

  return fetchStrapi<StrapiResponse<SolutionPage[]>>('/solution-pages', query);
}

export async function getSolutionPage(slug: string): Promise<SolutionPage | null> {
  const query = {
    filters: {
      slug: { $eq: slug },
      published: { $eq: true },
    },
    populate: ['useCases', 'testimonial', 'relatedServices', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<SolutionPage[]>>('/solution-pages', query);
  return response.data[0] || null;
}

// Team Members
export async function getTeamMembers(): Promise<StrapiResponse<TeamMember[]>> {
  const query = {
    populate: ['photo'],
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<TeamMember[]>>('/team-members', query);
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['photo'],
  };

  const response = await fetchStrapi<StrapiResponse<TeamMember[]>>('/team-members', query);
  return response.data[0] || null;
}

// Testimonials
export async function getTestimonials(featured?: boolean): Promise<StrapiResponse<Testimonial[]>> {
  const query = {
    populate: ['authorPhoto'],
    filters: featured ? { featured: { $eq: true } } : {},
    sort: ['order:asc'],
  };

  return fetchStrapi<StrapiResponse<Testimonial[]>>('/testimonials', query);
}

export async function getTestimonial(id: number): Promise<Testimonial | null> {
  const query = {
    populate: ['authorPhoto'],
  };

  const response = await fetchStrapi<StrapiSingleResponse<Testimonial>>(`/testimonials/${id}`, query);
  return response.data || null;
}

// Global Settings
export async function getGlobalSettings(): Promise<StrapiSingleResponse<GlobalSettings>> {
  const query = {
    populate: ['logo', 'favicon', 'socialLinks'],
  };

  return fetchStrapi<StrapiSingleResponse<GlobalSettings>>('/global-settings', query);
}

// Navigation
export async function getNavigation(): Promise<StrapiSingleResponse<Navigation>> {
  const query = {
    populate: {
      mainMenu: { populate: ['children'] },
      footerServices: { populate: '*' },
      footerSolutions: { populate: '*' },
      footerResources: { populate: '*' },
      footerCompany: { populate: '*' },
    },
  };

  return fetchStrapi<StrapiSingleResponse<Navigation>>('/navigation', query);
}

// Case Studies
export async function getCaseStudies(): Promise<StrapiResponse<CaseStudy[]>> {
  const query = {
    populate: ['images', 'testimonial', 'results', 'seo'],
    filters: { published: { $eq: true } },
  };

  return fetchStrapi<StrapiResponse<CaseStudy[]>>('/case-studies', query);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const query = {
    filters: { slug: { $eq: slug } },
    populate: ['images', 'testimonial', 'results', 'seo'],
  };

  const response = await fetchStrapi<StrapiResponse<CaseStudy[]>>('/case-studies', query);
  return response.data[0] || null;
}
