import { Metadata } from 'next';
// TODO: Re-enable Strapi integration once environment variables are configured
// import { getBlogPosts } from '@/lib/strapi';
import { getAllBlogPosts } from '@/lib/blog-utils';
import type { BlogPost } from '@/types/strapi';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog | Smarter Revolution',
  description: 'Insights on AI transformation, video production, and modern web infrastructure.',
};

export const revalidate = 60;

export default async function BlogPage() {
  // TODO: Re-enable Strapi integration once environment variables are configured
  // const { data: posts } = await getBlogPosts({ pageSize: 100 });

  // Using local markdown blog posts while Strapi is paused
  const markdownPosts = getAllBlogPosts();

  // Transform markdown posts to match BlogListClient's expected format
  const posts: BlogPost[] = markdownPosts.map((post, index) => ({
    id: index + 1,
    documentId: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.description,
    content: post.content,
    featuredImage: post.image ? {
      id: index + 1,
      url: post.image,
      alternativeText: post.imageAlt || post.title,
      width: 1200,
      height: 630,
    } : undefined,
    author: {
      id: 1,
      documentId: 'author-1',
      name: post.author,
      slug: post.author.toLowerCase().replace(/\s+/g, '-'),
    },
    category: post.category ? {
      id: 1,
      documentId: `cat-${post.category}`,
      name: post.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: post.category,
    } : undefined,
    tags: post.tags.map((tag, tagIndex) => ({
      id: tagIndex + 1,
      documentId: `tag-${tagIndex}`,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-'),
    })),
    publishedAt: post.pubDate,
    featured: post.featured || false,
    status: 'published' as const,
  }));

  return <BlogListClient posts={posts} />;
}
