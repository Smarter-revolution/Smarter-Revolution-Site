import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/strapi';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog | Smarter Revolution',
  description: 'Insights on AI transformation, video production, and modern web infrastructure.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts({ pageSize: 100 });

  return <BlogListClient posts={posts} />;
}
