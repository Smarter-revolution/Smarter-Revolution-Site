import Link from 'next/link'
import { CTABlockData } from '@/src/lib/types'

interface CTABlockProps {
  data: CTABlockData
}

export function CTABlock({ data }: CTABlockProps) {
  const bgColor = data.backgroundColor || '#2563eb'
  const textColor = data.textColor || '#ffffff'

  // Calculate if background is light or dark for button styling
  const isLightBg = isLightColor(bgColor)

  return (
    <section 
      className="py-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: textColor }}
        >
          {data.headline}
        </h2>
        
        <p 
          className="text-xl mb-8 opacity-90"
          style={{ color: textColor }}
        >
          {data.body}
        </p>

        {data.buttonText && data.buttonLink && (
          <Link
            href={data.buttonLink}
            className={`
              inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all
              ${isLightBg 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
              }
              shadow-lg hover:shadow-xl hover:-translate-y-0.5
            `}
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

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  let r: number, g: number, b: number

  if (color.startsWith('#')) {
    const hex = color.slice(1)
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16)
      g = parseInt(hex[1] + hex[1], 16)
      b = parseInt(hex[2] + hex[2], 16)
    } else {
      r = parseInt(hex.slice(0, 2), 16)
      g = parseInt(hex.slice(2, 4), 16)
      b = parseInt(hex.slice(4, 6), 16)
    }
  } else {
    // Default to dark
    return false
  }

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
