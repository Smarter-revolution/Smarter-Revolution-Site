'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GridPattern, 
  ScrollReveal, 
  Particles, 
  BlurText, 
  GradientText,
  SpotlightCard,
  AnimatedCard
} from '@/components/ui';

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
}

const categories = [
  'AI Transformation', 
  'Content Strategy', 
  'Team Empowerment', 
  'Automation Insights', 
  'Industry Trends', 
  'Case Studies'
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effect for hero
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  // Filter posts by category
  const filteredPosts = activeCategory 
    ? posts.filter(post => post.tags.some(tag => 
        tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
        activeCategory.toLowerCase().includes(tag.toLowerCase())
      ))
    : posts;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#0a0a0a]">
        <div className="relative">
          {/* Outer ring */}
          <motion.div 
            className="w-16 h-16 rounded-full border-2 border-red-600/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner spinner */}
          <motion.div 
            className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-red-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Center dot */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-3 h-3 rounded-full bg-red-600" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GridPattern className="opacity-20" squares={[[1, 3], [4, 2], [7, 5], [2, 7]]} />
          <Particles quantity={40} color="#dc2626" size={1.5} speed={0.3} />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Parallax Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <BlurText text="The Revolution" className="text-white" />
              <span className="block mt-2">
                <GradientText>Journal</GradientText>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Insights, strategies, and stories from the front lines of AI transformation.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-red-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Categories Filter */}
          <ScrollReveal>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              <motion.button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === null
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:border-red-500/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Posts
              </motion.button>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:border-red-500/50 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {filteredPosts.length === 0 ? (
            <ScrollReveal>
              <AnimatedCard className="text-center py-16 max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-xl mb-2">No blog posts found</p>
                <p className="text-gray-500">
                  {activeCategory ? `No posts in "${activeCategory}" category yet.` : 'Check back soon for new content.'}
                </p>
                {activeCategory && (
                  <motion.button
                    onClick={() => setActiveCategory(null)}
                    className="mt-6 text-red-500 hover:text-red-400 font-medium"
                    whileHover={{ x: -5 }}
                  >
                    ← View all posts
                  </motion.button>
                )}
              </AnimatedCard>
            </ScrollReveal>
          ) : (
            <>
              {/* Featured Post (First Post) */}
              {filteredPosts.length > 0 && (
                <ScrollReveal className="mb-12">
                  <Link href={`/blog/${filteredPosts[0].slug}`} className="block group">
                    <SpotlightCard className="overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                          {filteredPosts[0].image ? (
                            <Image
                              src={filteredPosts[0].image}
                              alt={filteredPosts[0].imageAlt || filteredPosts[0].title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-black flex items-center justify-center">
                              <svg className="w-20 h-20 text-red-600/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 md:block hidden" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden" />
                          {/* Featured badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                              Featured
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {filteredPosts[0].tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-gray-400 mb-6 text-lg line-clamp-3">
                            {filteredPosts[0].description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold">
                                {filteredPosts[0].author.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{filteredPosts[0].author}</p>
                                <p className="text-gray-500 text-sm">{formatDate(filteredPosts[0].pubDate)}</p>
                              </div>
                            </div>
                            <motion.span 
                              className="text-red-500 font-medium flex items-center gap-2"
                              whileHover={{ x: 5 }}
                            >
                              Read Article
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </ScrollReveal>
              )}

              {/* Rest of Posts Grid */}
              {filteredPosts.length > 1 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.slice(1).map((post, index) => (
                    <ScrollReveal key={post.slug} delay={index * 0.05}>
                      <Link href={`/blog/${post.slug}`} className="block h-full group">
                        <SpotlightCard className="h-full flex flex-col overflow-hidden">
                          {/* Image */}
                          <div className="relative h-52 overflow-hidden">
                            {post.image ? (
                              <Image
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center">
                                <svg className="w-16 h-16 text-red-600/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-red-600/20 text-red-500 text-xs font-medium rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                              {post.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-sm font-bold">
                                  {post.author.charAt(0)}
                                </div>
                                <span className="text-gray-500 text-sm">{post.author}</span>
                              </div>
                              <span className="text-gray-500 text-sm">{formatDate(post.pubDate)}</span>
                            </div>
                          </div>

                          {/* Hover Footer */}
                          <motion.div 
                            className="px-6 py-4 bg-red-600/10 border-t border-red-600/30 flex items-center justify-between"
                            initial={{ opacity: 0.5 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <span className="text-red-500 font-medium">Read More</span>
                            <motion.svg 
                              className="w-5 h-5 text-red-500" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              whileHover={{ x: 5 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                          </motion.div>
                        </SpotlightCard>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent" />
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center relative">
            <AnimatedCard className="p-10 md:p-14">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Ahead of the <GradientText>Revolution</GradientText>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Get the latest AI transformation insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
                />
                <motion.button
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 transition-colors shadow-lg shadow-red-600/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                No spam, unsubscribe anytime.
              </p>
            </AnimatedCard>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
