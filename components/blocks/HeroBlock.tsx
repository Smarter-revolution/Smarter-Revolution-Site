import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlockData } from '@/lib/types'

interface HeroBlockProps {
  data: HeroBlockData
}

export function HeroBlock({ data }: HeroBlockProps) {
  const overlayOpacity = data.overlayOpacity ?? 0.6
  
  // Check if there's a background image
  const hasBackgroundImage = data.backgroundImage && data.backgroundImage.trim() !== ''
  
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-gradient-to-b from-black via-gray-900 to-black">
      {hasBackgroundImage && (
        <>
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0 bg-black" 
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center w-full">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
          <span className="text-white">{data.headline.split(' ').slice(0, -2).join(' ')}</span>
          <br />
          <span className="text-red-600">{data.headline.split(' ').slice(-2).join(' ')}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {data.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.buttonText && (
            <Link 
              href={data.buttonLink}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-lg"
            >
              {data.buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
