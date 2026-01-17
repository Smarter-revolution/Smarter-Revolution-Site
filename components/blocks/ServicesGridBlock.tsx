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
