'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GridPattern, 
  Particles, 
  ScrollReveal, 
  GradientText,
  SpotlightCard,
  GlowButton,
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
  contentHtml: string;
}

export default function BlogPostClient() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    if (params.slug) {
      setImageError(false);
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

  const heroImagePath = params.slug ? `/images/blog/${params.slug}/hero.png` : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate reading time
  const getReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#0a0a0a]">
        <div className="relative">
          <motion.div 
            className="w-16 h-16 rounded-full border-2 border-red-600/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-red-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
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

  if (!post) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridPattern className="opacity-10" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedCard className="p-12">
            <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">
              The article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>
          </AnimatedCard>
        </div>
      </div>
    );
  }

  const readingTime = getReadingTime(post.contentHtml);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section with Parallax Image */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image with Parallax */}
        {heroImagePath && !imageError ? (
          <motion.div 
            className="absolute inset-0"
            style={{ y, scale }}
          >
            <Image
              src={heroImagePath}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              onError={() => setImageError(true)}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black">
            <Particles quantity={50} color="#dc2626" size={2} speed={0.2} />
          </div>
        )}

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />

        {/* Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto w-full">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-red-500 font-medium mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Blog
              </Link>
            </motion.div>

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 bg-red-600/30 backdrop-blur-sm text-red-400 text-sm font-medium rounded-full border border-red-600/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-sm text-gray-400">{formatDate(post.pubDate)}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridPattern className="opacity-5" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <SpotlightCard className="p-8 md:p-12 lg:p-16">
              {/* Article Body */}
              <article
                className="prose prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:marker:text-red-500 prose-blockquote:border-red-600 prose-blockquote:text-gray-400 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-code:text-red-400 prose-code:bg-white/10 prose-code:rounded prose-code:px-1 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Tags Section */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/5 text-gray-300 text-sm rounded-full border border-white/10 hover:border-red-500/50 hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Share this article</h3>
                <div className="flex gap-3">
                  <motion.a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://smarterrevolution.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://smarterrevolution.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://smarterrevolution.com/blog/${post.slug}`);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Copy link"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={0.1}>
            <AnimatedCard className="mt-12 p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your <GradientText>Business?</GradientText>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Book a free strategy session and discover how AI can revolutionize your operations.
              </p>
              <GlowButton href="/contact" size="lg">
                Book Your Free Strategy Session
              </GlowButton>
            </AnimatedCard>
          </ScrollReveal>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
