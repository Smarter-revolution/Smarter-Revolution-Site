import Link from 'next/link'
import { HeroBlockData } from '@/src/lib/types'

interface HeroBlockProps {
  data: HeroBlockData
}

export function HeroBlock({ data }: HeroBlockProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      {data.backgroundImage && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: data.overlayOpacity ?? 0.5 }}
        />
      )}

      {/* Default gradient background if no image */}
      {!data.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col ${alignmentClasses[data.textAlignment || 'center']}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {data.headline}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          {data.subheadline}
        </p>

        {data.buttonText && data.buttonLink && (
          <Link
            href={data.buttonLink}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            {data.buttonText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
