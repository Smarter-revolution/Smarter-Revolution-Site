import Link from 'next/link'
import Image from 'next/image'
import { TextImageBlockData } from '@/src/lib/types'

interface TextImageBlockProps {
  data: TextImageBlockData
}

export function TextImageBlock({ data }: TextImageBlockProps) {
  const isImageLeft = data.imagePosition === 'left'

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          {/* Image */}
          <div className="w-full lg:w-1/2">
            {data.image ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h2>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              {data.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {data.buttonText && data.buttonLink && (
              <Link
                href={data.buttonLink}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {data.buttonText}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
