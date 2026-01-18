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
    <section className="py-16 md:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {data.headline.includes('AI Marketing Pro') ? (
              <>
                {data.headline.split('AI Marketing Pro')[0]}
                <span className="text-red-600">AI Marketing Pro</span>
                {data.headline.split('AI Marketing Pro')[1]}
              </>
            ) : (
              data.headline
            )}
          </h2>
          {data.subheadline && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
              {data.subheadline}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => {
            // Check if icon is an emoji (starts with a non-ASCII character)
            const isEmoji = /^\p{Emoji}/u.test(service.icon)
            const IconComponent = !isEmoji ? iconMap[service.icon] : null
            
            return (
              <div 
                key={index}
                className="bg-gray-900 border-2 border-red-600 rounded-lg p-8 hover:border-red-500 transition-colors"
              >
                {isEmoji ? (
                  <div className="text-4xl mb-4">{service.icon}</div>
                ) : IconComponent ? (
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="text-4xl mb-4">⭐</div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-red-600">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
