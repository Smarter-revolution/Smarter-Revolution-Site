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
