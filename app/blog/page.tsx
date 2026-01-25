import { Metadata } from 'next';
// TODO: Re-enable Strapi integration once environment variables are configured
// import { getBlogPosts } from '@/lib/strapi';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog | Smarter Revolution',
  description: 'Insights on AI transformation, video production, and modern web infrastructure.',
};

export const revalidate = 60;

export default async function BlogPage() {
  // TODO: Re-enable Strapi integration once environment variables are configured
  // Temporarily using empty array to allow build to succeed
  // const { data: posts } = await getBlogPosts({ pageSize: 100 });
  const posts: any[] = [];

  return <BlogListClient posts={posts} />;
}
