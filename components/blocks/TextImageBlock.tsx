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
