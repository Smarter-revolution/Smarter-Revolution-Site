import Image from 'next/image'
import type { TeamBlockData } from '@/lib/types'

interface TeamBlockProps {
  data: TeamBlockData
}

export function TeamBlock({ data }: TeamBlockProps) {
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
          {data.members.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <div className="text-gray-500 mb-3">{member.title}</div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
