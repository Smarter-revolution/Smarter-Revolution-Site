'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Settings, LogOut, ExternalLink } from 'lucide-react'
import type { PageListItem } from '@/lib/types'

interface AdminSidebarProps {
  pages: PageListItem[]
  siteName: string
}

export function AdminSidebar({ pages, siteName }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.refresh()
  }
  
  return (
    <aside className="w-64 bg-gray-900 text-white fixed h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="font-bold text-lg">{siteName}</h1>
        <span className="text-gray-400 text-sm">Admin Panel</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Pages</h2>
          <ul className="space-y-1">
            {pages.map((page) => {
              const href = `/admin/${page.slug}`
              const isActive = pathname === href
              
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{page.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Settings</h2>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/admin/settings'
                    ? 'bg-white text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Site</span>
        </a>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}
