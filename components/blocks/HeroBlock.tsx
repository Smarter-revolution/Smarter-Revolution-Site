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
