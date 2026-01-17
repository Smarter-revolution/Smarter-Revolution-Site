'use client'

import { useState } from 'react'
import { FAQBlockData } from '@/src/lib/types'

interface FAQBlockProps {
  data: FAQBlockData
}

export function FAQBlock({ data }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const isAccordion = data.layout !== 'grid'

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-gray-600">
              {data.subheadline}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {isAccordion ? (
          <div className="space-y-4">
            {data.questions.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.questions.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {data.questions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No questions to display.
          </div>
        )}
      </div>
    </section>
  )
}
