import { Metadata } from 'next';
import { getBlogPost } from '@/lib/blog-utils';
import BlogPostClient from './BlogPostClient';
import Script from 'next/script';

// Helper function to get author job title
function getAuthorJobTitle(author: string): string {
  if (author === 'Wolf Krammel') {
    return 'CEO & Co-Founder';
  }
  if (author === 'Mark Alouf') {
    return 'COO & Co-Founder';
  }
  // Default for other authors
  return 'Content Creator';
}

// Helper function to format date to ISO string (full format for OpenGraph)
function formatDateToISO(dateString: string): string {
  // Parse the date string
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString();
  }
  // If parsing fails, try to construct from YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(dateString + 'T00:00:00.000Z');
    return date.toISOString();
  }
  return dateString;
}

// Helper function to format date to YYYY-MM-DD (for JSON-LD)
function formatDateToYYYYMMDD(dateString: string): string {
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  // Try to parse and format
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return dateString;
}

// Helper function to extract FAQs from content
function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  // Pattern to match **Q: question** followed by A: answer
  // Handles both **A:** and plain A: formats
  const faqPattern = /\*\*Q:\s*(.+?)\*\*\s*\n\s*A:\s*(.+?)(?=\n\*\*Q:|##|$)/gs;
  let match;

  while ((match = faqPattern.exec(content)) !== null) {
    const answer = match[2].trim();
    // Remove markdown links and formatting for cleaner answer text
    const cleanAnswer = answer
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links, keep text
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    if (cleanAnswer) {
      faqs.push({
        question: match[1].trim(),
        answer: cleanAnswer,
      });
    }
  }

  return faqs;
}

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

  // Always use production domain for consistency
  const siteUrl = 'https://smarterrevolution.com';
  const canonical = `${siteUrl}/blog/${slug}`;
  const ogImage = post.image?.startsWith('http') 
    ? post.image.replace(/https?:\/\/[^\/]+/, siteUrl) // Replace any domain with production domain
    : `${siteUrl}${post.image || `/images/blog/${slug}/hero.png`}`;

  // Format dates properly - full ISO for OpenGraph, YYYY-MM-DD for JSON-LD
  const publishedDateISO = formatDateToISO(post.pubDate);
  const modifiedDateISO = formatDateToISO(post.pubDate); // Use published date if no modified date

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
      publishedTime: publishedDateISO,
      modifiedTime: modifiedDateISO,
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
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return <BlogPostClient />;
  }

  // Always use production domain for consistency
  const siteUrl = 'https://smarterrevolution.com';
  const canonical = `${siteUrl}/blog/${slug}`;
  const ogImage = post.image?.startsWith('http') 
    ? post.image.replace(/https?:\/\/[^\/]+/, siteUrl) // Replace any domain with production domain
    : `${siteUrl}${post.image || `/images/blog/${slug}/hero.png`}`;
  
  // Format dates - YYYY-MM-DD for JSON-LD
  const publishedDateYYYYMMDD = formatDateToYYYYMMDD(post.pubDate);
  const modifiedDateYYYYMMDD = formatDateToYYYYMMDD(post.pubDate); // Use published date if no modified date
  
  const authorJobTitle = getAuthorJobTitle(post.author);
  const faqs = extractFAQs(post.content);

  // Generate Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: ogImage,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: authorJobTitle,
      worksFor: {
        '@type': 'Organization',
        name: 'Smarter Revolution',
        url: 'https://smarterrevolution.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smarter Revolution',
      url: 'https://smarterrevolution.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smarterrevolution.com/images/logo.png',
      },
    },
    datePublished: publishedDateYYYYMMDD,
    dateModified: modifiedDateYYYYMMDD,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    keywords: post.tags,
  };

  // Generate FAQ JSON-LD if FAQs exist
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <BlogPostClient />
    </>
  );
}
