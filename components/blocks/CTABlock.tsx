import Link from 'next/link'
import type { CTABlockData } from '@/lib/types'

interface CTABlockProps {
  data: CTABlockData
}

export function CTABlock({ data }: CTABlockProps) {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          {data.headline.includes('Transform') ? (
            <>
              {data.headline.split('Transform')[0]}
              <span className="text-red-600">Transform</span>
              {data.headline.split('Transform')[1]}
            </>
          ) : (
            data.headline
          )}
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {data.body}
        </p>
        <Link 
          href={data.buttonLink}
          className="inline-block bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg text-lg"
        >
          {data.buttonText}
        </Link>
      </div>
    </section>
  )
}
