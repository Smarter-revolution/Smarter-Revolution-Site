import { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-utils';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Smarter Revolution',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smarterrevolution.com';
  const canonical = `${siteUrl}/blog/${slug}`;
  const ogImage = post.image || `${siteUrl}/images/blog/${slug}/hero.png`;

  return {
    title: `${post.title} | Smarter Revolution`,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: 'Smarter Revolution',
      type: 'article',
      publishedTime: post.pubDate,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          alt: post.imageAlt || post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostClient />;
}
