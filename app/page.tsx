'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SpotlightCard, ShinyText, GradientText, BlurText } from '@/components/reactbits';
import { ArrowRight, Blocks, Image as ImageIcon, Terminal, Shield, Zap, Code2, Github } from 'lucide-react';

// Dynamic imports for heavy components
const Aurora = dynamic(() => import('@/components/reactbits/Aurora'), { ssr: false });
const SplashCursor = dynamic(() => import('@/components/reactbits/SplashCursor'), { ssr: false });

const features = [
  {
    icon: Blocks,
    title: 'Block-Based Editing',
    description: '8 pre-built block types including Hero, Text+Image, Services Grid, Testimonials, CTA, Team, Contact, and FAQ.',
    color: 'rgba(99, 102, 241, 0.4)'
  },
  {
    icon: Github,
    title: 'GitHub Integration',
    description: 'Auto-commits content changes to GitHub, triggering automatic Vercel rebuilds for instant updates.',
    color: 'rgba(34, 197, 94, 0.4)'
  },
  {
    icon: ImageIcon,
    title: 'Image Uploads',
    description: 'Drag-and-drop image uploads to Vercel Blob storage with automatic optimization and CDN delivery.',
    color: 'rgba(168, 85, 247, 0.4)'
  },
  {
    icon: Shield,
    title: 'Secure Auth',
    description: 'Password-protected admin panel with session management and secure API endpoints.',
    color: 'rgba(239, 68, 68, 0.4)'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Next.js with optimized builds, static generation, and edge-ready deployment.',
    color: 'rgba(245, 158, 11, 0.4)'
  },
  {
    icon: Code2,
    title: 'Developer Friendly',
    description: 'TypeScript-first with full type safety, extensible architecture, and comprehensive documentation.',
    color: 'rgba(6, 182, 212, 0.4)'
  }
];

const integrationSteps = [
  { step: '01', title: 'Install Package', code: 'npm install smart-sites-admin' },
  { step: '02', title: 'Initialize Config', code: 'npx smart-sites-admin init' },
  { step: '03', title: 'Set Environment', code: 'Add ADMIN_PASSWORD & tokens' },
  { step: '04', title: 'Deploy & Edit', code: 'vercel deploy → /admin' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Splash Cursor Effect */}
      <SplashCursor 
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={5000}
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1.5}
        COLOR_UPDATE_SPEED={8}
      />

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora 
          colorStops={['#1e1b4b', '#7c3aed', '#0ea5e9']} 
          amplitude={1.2} 
          speed={0.5}
          blend={0.6}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              <ShinyText 
                text="Standalone CMS Admin System" 
                speed={3}
                color="#9ca3af"
                shineColor="#ffffff"
                className="text-sm font-medium"
              />
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <GradientText 
                colors={['#a855f7', '#3b82f6', '#10b981', '#a855f7']}
                animationSpeed={6}
                className="text-6xl md:text-8xl font-black"
              >
                Smart Sites Admin
              </GradientText>
            </h1>

            {/* Subtitle */}
            <BlurText 
              text="A powerful, reusable admin system for client-editable websites. Built with Next.js, designed for seamless integration into any project."
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12"
              delay={50}
              animateBy="words"
              direction="bottom"
            />

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/admin"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
              >
                Open Admin Panel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <ShinyText 
                  text="Everything You Need" 
                  speed={4}
                  color="#ffffff"
                  shineColor="#a855f7"
                  className="text-4xl md:text-5xl font-bold"
                />
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                A complete content management solution with powerful features built for modern web development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <SpotlightCard 
                  key={index} 
                  className="bg-black/40 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300"
                  spotlightColor={feature.color as `rgba(${number}, ${number}, ${number}, ${number})`}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <GradientText 
                  colors={['#10b981', '#3b82f6', '#a855f7', '#10b981']}
                  animationSpeed={5}
                  className="text-4xl md:text-5xl font-bold"
                >
                  Quick Integration
                </GradientText>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Get up and running in minutes with our simple setup process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrationSteps.map((item, index) => (
                <div 
                  key={index}
                  className="group relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="text-5xl font-black text-white/5 absolute top-4 right-4 group-hover:text-violet-500/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <code className="text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg font-mono block">
                      {item.code}
                    </code>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Preview */}
            <div className="mt-16 bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-sm text-slate-500 font-mono">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">$</span>
                  <span className="text-white">npx smart-sites-admin init</span>
                </div>
                <div className="mt-4 space-y-2 text-slate-500">
                  <p><span className="text-emerald-400">✓</span> Created smart-sites.config.ts</p>
                  <p><span className="text-emerald-400">✓</span> Created content/pages/home.json</p>
                  <p><span className="text-emerald-400">✓</span> Created content/site.json</p>
                  <p><span className="text-emerald-400">✓</span> Added API routes to app/api/</p>
                  <p><span className="text-emerald-400">✓</span> Added admin pages to app/admin/</p>
                  <p className="text-white mt-4">
                    <span className="text-emerald-400">✓</span> Smart Sites Admin initialized successfully!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <BlurText 
                text="Ready to Get Started?"
                className="text-4xl md:text-6xl font-bold justify-center"
                delay={100}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Transform your static websites into client-editable experiences with Smart Sites Admin.
            </p>
            
            <Link
              href="/admin"
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white text-xl font-bold rounded-2xl hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
            >
              Launch Admin Panel
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Blocks className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Smart Sites Admin</span>
              </div>
              <p className="text-slate-500 text-sm">
                Built with ❤️ by <span className="text-violet-400">Smarter Revolution</span>
              </p>
              <div className="flex items-center gap-6">
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Admin Panel
                </Link>
                <Link href="https://github.com/Smarter-revolution/smart-sites-admin" target="_blank" className="text-slate-400 hover:text-white transition-colors text-sm">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
