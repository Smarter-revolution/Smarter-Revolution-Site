'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author: string;
  tags: string[];
  image?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            The Revolution <span className="text-red-600">Journal</span>
          </h1>
          <p className="text-xl text-gray-300">
            Insights, strategies, and stories from the front lines of AI transformation.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {['AI Transformation', 'Content Strategy', 'Team Empowerment', 'Automation Insights', 'Industry Trends', 'Case Studies'].map((category) => (
            <span
              key={category}
              className="px-4 py-2 bg-gray-900 border border-red-600 rounded-full text-sm text-gray-300"
            >
              {category}
            </span>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 border-2 border-red-600 rounded-lg">
            <p className="text-gray-300 text-lg mb-4">No blog posts yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-gray-900 border-2 border-red-600 rounded-lg hover:border-red-500 transition-colors overflow-hidden flex flex-col group"
              >
                {post.image && (
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Image Placeholder</span>
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-red-600/20 text-red-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="font-medium text-red-600">By {post.author}</span>
                    <span>{formatDate(post.pubDate)}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-black border-t-2 border-red-600">
                  <span className="text-red-600 font-medium group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
