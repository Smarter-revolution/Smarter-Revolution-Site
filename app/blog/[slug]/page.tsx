'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  category?: string;
  contentHtml: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog-posts/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-lg mb-4">Blog post not found.</p>
          <Link
            href="/blog"
            className="text-red-600 hover:text-red-500 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-red-600 hover:text-red-500 font-medium inline-flex items-center mb-4"
          >
            ← Back to Blog
          </Link>
        </div>

        <article className="bg-gray-900 border-2 border-red-600 rounded-lg overflow-hidden">
          {post.image && (
            <div className="relative w-full h-96 border-b-2 border-red-600 overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-red-600/20 text-red-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-gray-300 mb-8 pb-6 border-b-2 border-red-600">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-red-600">By {post.author}</span>
              </div>
              <div className="text-sm">
                <p>Published: {formatDate(post.pubDate)}</p>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-blockquote:border-red-600"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t-2 border-red-600 bg-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-gray-300 mb-6">
                Book a free strategy session and discover how AI can revolutionize your operations.
              </p>
              <a
                href="https://smarterrevolution.com/strategy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
              >
                Book Your Free Strategy Session
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

