import Image from 'next/image'
import Link from 'next/link'
import { TeamBlockData } from '@/src/lib/types'

interface TeamBlockProps {
  data: TeamBlockData
}

export function TeamBlock({ data }: TeamBlockProps) {
  const isGrid = data.layout !== 'list'

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* Team Members */}
        {isGrid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.members.map((member, index) => (
              <div key={index} className="text-center group">
                {/* Photo */}
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                
                {member.bio && (
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                )}

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.email && (
                    <Link 
                      href={`mailto:${member.email}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {data.members.map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-gray-50 rounded-2xl">
                {/* Photo */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                  
                  {member.bio && (
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                  )}

                  {/* Contact */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {member.email && (
                      <Link 
                        href={`mailto:${member.email}`}
                        className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {member.email}
                      </Link>
                    )}
                    {member.linkedin && (
                      <Link 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        LinkedIn
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.members.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No team members to display.
          </div>
        )}
      </div>
    </section>
  )
}
