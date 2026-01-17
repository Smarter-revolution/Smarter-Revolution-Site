import { Mail, Phone, MapPin } from 'lucide-react'
import type { ContactBlockData } from '@/lib/types'

interface ContactBlockProps {
  data: ContactBlockData
}

export function ContactBlock({ data }: ContactBlockProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {data.body}
            </p>
            <div className="space-y-4">
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-gray-700 hover:text-black">
                  <Mail className="w-5 h-5" />
                  <span>{data.email}</span>
                </a>
              )}
              {data.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-black">
                  <Phone className="w-5 h-5" />
                  <span>{data.phone}</span>
                </a>
              )}
              {data.address && (
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 mt-1" />
                  <span className="whitespace-pre-wrap">{data.address}</span>
                </div>
              )}
            </div>
          </div>
          {data.showForm && (
            <div className="bg-gray-50 rounded-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
