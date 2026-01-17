'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQBlockData } from '@/lib/types'

interface FAQBlockProps {
  data: FAQBlockData
}

export function FAQBlock({ data }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {data.headline}
        </h2>
        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold hover:bg-gray-50"
              >
                <span>{item.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
