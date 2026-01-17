// ============================================
// /components/blocks/HeroBlock.tsx
// ============================================

import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlockData } from '@/lib/types'

interface HeroBlockProps {
  data: HeroBlockData
}

export function HeroBlock({ data }: HeroBlockProps) {
  const overlayOpacity = data.overlayOpacity ?? 0.5
  
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center">
      {data.backgroundImage && (
        <Image
          src={data.backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {data.headline}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {data.subheadline}
        </p>
        {data.buttonText && (
          <Link 
            href={data.buttonLink}
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {data.buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/TextImageBlock.tsx
// ============================================

import Image from 'next/image'
import type { TextImageBlockData } from '@/lib/types'

interface TextImageBlockProps {
  data: TextImageBlockData
}

export function TextImageBlock({ data }: TextImageBlockProps) {
  const isImageLeft = data.imagePosition === 'left'
  
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
          <div className="w-full md:w-1/2">
            {data.image ? (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {data.headline}
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
              {data.body}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/ServicesGridBlock.tsx
// ============================================

import { Star, Shield, Zap, Target, Users, Lightbulb, TrendingUp, Award } from 'lucide-react'
import type { ServicesGridBlockData } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  star: Star,
  shield: Shield,
  zap: Zap,
  target: Target,
  users: Users,
  lightbulb: Lightbulb,
  trending: TrendingUp,
  award: Award,
}

interface ServicesGridBlockProps {
  data: ServicesGridBlockData
}

export function ServicesGridBlock({ data }: ServicesGridBlockProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data.subheadline}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Star
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/TestimonialsBlock.tsx
// ============================================

import Image from 'next/image'
import { Quote } from 'lucide-react'
import type { TestimonialsBlockData } from '@/lib/types'

interface TestimonialsBlockProps {
  data: TestimonialsBlockData
}

export function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {data.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6"
            >
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              <p className="text-gray-700 italic mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/CTABlock.tsx
// ============================================

import Link from 'next/link'
import type { CTABlockData } from '@/lib/types'

interface CTABlockProps {
  data: CTABlockData
}

export function CTABlock({ data }: CTABlockProps) {
  const bgColor = data.backgroundColor || '#1a1a1a'
  const textColor = data.textColor || '#ffffff'
  
  return (
    <section 
      className="py-16 md:py-20"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {data.headline}
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          {data.body}
        </p>
        <Link 
          href={data.buttonLink}
          className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {data.buttonText}
        </Link>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/TeamBlock.tsx
// ============================================

import Image from 'next/image'
import type { TeamBlockData } from '@/lib/types'

interface TeamBlockProps {
  data: TeamBlockData
}

export function TeamBlock({ data }: TeamBlockProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data.subheadline}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.members.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <div className="text-gray-500 mb-3">{member.title}</div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/ContactBlock.tsx
// ============================================

import { Mail, Phone, MapPin } from 'lucide-react'
import type { ContactBlockData } from '@/lib/types'

interface ContactBlockProps {
  data: ContactBlockData
}

export function ContactBlock({ data }: ContactBlockProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {data.body}
            </p>
            <div className="space-y-4">
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-gray-700 hover:text-black">
                  <Mail className="w-5 h-5" />
                  <span>{data.email}</span>
                </a>
              )}
              {data.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-black">
                  <Phone className="w-5 h-5" />
                  <span>{data.phone}</span>
                </a>
              )}
              {data.address && (
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 mt-1" />
                  <span>{data.address}</span>
                </div>
              )}
            </div>
          </div>
          {data.showForm && (
            <div className="bg-gray-50 rounded-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/FAQBlock.tsx
// ============================================

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQBlockData } from '@/lib/types'

interface FAQBlockProps {
  data: FAQBlockData
}

export function FAQBlock({ data }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {data.headline}
        </h2>
        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold hover:bg-gray-50"
              >
                <span>{item.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// /components/blocks/index.ts - Block Renderer
// ============================================

import type { Block } from '@/lib/types'

export { HeroBlock } from './HeroBlock'
export { TextImageBlock } from './TextImageBlock'
export { ServicesGridBlock } from './ServicesGridBlock'
export { TestimonialsBlock } from './TestimonialsBlock'
export { CTABlock } from './CTABlock'
export { TeamBlock } from './TeamBlock'
export { ContactBlock } from './ContactBlock'
export { FAQBlock } from './FAQBlock'

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'hero':
      return <HeroBlock data={block.data as any} />
    case 'textImage':
      return <TextImageBlock data={block.data as any} />
    case 'servicesGrid':
      return <ServicesGridBlock data={block.data as any} />
    case 'testimonials':
      return <TestimonialsBlock data={block.data as any} />
    case 'cta':
      return <CTABlock data={block.data as any} />
    case 'team':
      return <TeamBlock data={block.data as any} />
    case 'contact':
      return <ContactBlock data={block.data as any} />
    case 'faq':
      return <FAQBlock data={block.data as any} />
    default:
      return <div className="p-4 bg-red-100 text-red-600">Unknown block type</div>
  }
}