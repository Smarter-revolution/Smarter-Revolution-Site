'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import type { PageListItem } from '@/lib/types'

export default function AdminDashboard() {
  const [pages, setPages] = useState<PageListItem[]>([])
  
  useEffect(() => {
    fetch('/api/content/pages')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPages(data)
        }
      })
      .catch(() => setPages([]))
  }, [])
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome to Admin</h1>
      <p className="text-gray-600 mb-8">Select a page from the sidebar to start editing, or choose from below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/${page.slug}`}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h2 className="font-semibold">{page.title}</h2>
                  <p className="text-sm text-gray-500">/{page.slug === 'home' ? '' : page.slug}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
