// ============================================
// /app/(public)/layout.tsx
// ============================================

import { getSiteConfig } from '@/lib/content'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getSiteConfig()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header siteConfig={siteConfig} />
      <main className="flex-1">
        {children}
      </main>
      <Footer siteConfig={siteConfig} />
    </div>
  )
}


// ============================================
// /app/(public)/page.tsx - Homepage
// ============================================

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageContent } from '@/lib/content'
import { BlockRenderer } from '@/components/blocks'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('home')
  
  if (!content) return { title: 'Home' }
  
  return {
    title: content.seo.title,
    description: content.seo.description,
  }
}

export default async function HomePage() {
  const content = await getPageContent('home')
  
  if (!content) {
    notFound()
  }
  
  return (
    <>
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}


// ============================================
// /app/(public)/[...slug]/page.tsx - Dynamic Pages
// ============================================

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageContent, getPageSlugs } from '@/lib/content'
import { BlockRenderer } from '@/components/blocks'

interface PageProps {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const slugs = await getPageSlugs()
  
  return slugs
    .filter(slug => slug !== 'home')
    .map(slug => ({
      slug: [slug]
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageSlug = params.slug[0]
  const content = await getPageContent(pageSlug)
  
  if (!content) {
    return { title: 'Page Not Found' }
  }
  
  return {
    title: content.seo.title,
    description: content.seo.description,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const pageSlug = params.slug[0]
  const content = await getPageContent(pageSlug)
  
  if (!content) {
    notFound()
  }
  
  return (
    <>
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}


// ============================================
// /components/ui/Header.tsx
// ============================================

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import type { SiteConfig } from '@/lib/types'

interface HeaderProps {
  siteConfig: SiteConfig
}

export function Header({ siteConfig }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {siteConfig.logo ? (
              <Image
                src={siteConfig.logo}
                alt={siteConfig.siteName}
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            ) : (
              <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                {siteConfig.siteName}
              </span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-gray-700 hover:text-gray-900 font-medium border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}


// ============================================
// /components/ui/Footer.tsx
// ============================================

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { SiteConfig } from '@/lib/types'

interface FooterProps {
  siteConfig: SiteConfig
}

export function Footer({ siteConfig }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteConfig.siteName}</h3>
            <p className="text-gray-400">
              Strategic consulting services that drive measurable results for growing businesses.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              {siteConfig.footer.email && (
                <a href={`mailto:${siteConfig.footer.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  {siteConfig.footer.email}
                </a>
              )}
              {siteConfig.footer.phone && (
                <a href={`tel:${siteConfig.footer.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  {siteConfig.footer.phone}
                </a>
              )}
              {siteConfig.footer.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>{siteConfig.footer.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>{siteConfig.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}


// ============================================
// /app/not-found.tsx
// ============================================

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}