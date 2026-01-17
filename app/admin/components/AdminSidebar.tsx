'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Settings, LogOut, ExternalLink, LayoutDashboard, Sparkles } from 'lucide-react'
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
    <aside className="w-72 bg-slate-900 text-white fixed h-screen flex flex-col border-r border-slate-800">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">{siteName}</h1>
            <span className="text-slate-500 text-xs font-medium">Content Manager</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Dashboard Link */}
        <div className="mb-6">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              pathname === '/admin'
                ? 'bg-gradient-to-r from-red-500/20 to-red-600/10 text-white border border-red-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>
        
        {/* Pages Section */}
        <div className="mb-6">
          <h2 className="text-xs uppercase text-slate-600 font-semibold mb-3 px-4 tracking-wider">
            Pages
          </h2>
          <ul className="space-y-1">
            {pages.map((page) => {
              const href = `/admin/${page.slug}`
              const isActive = pathname === href
              
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-white text-slate-900 shadow-lg shadow-black/10' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-slate-100' 
                        : 'bg-slate-800 group-hover:bg-slate-700'
                    }`}>
                      <FileText className={`w-4 h-4 ${isActive ? 'text-slate-700' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate">{page.title}</span>
                      <span className={`text-xs ${isActive ? 'text-slate-500' : 'text-slate-600'}`}>
                        /{page.slug === 'home' ? '' : page.slug}
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        {/* Settings Section */}
        <div className="mb-6">
          <h2 className="text-xs uppercase text-slate-600 font-semibold mb-3 px-4 tracking-wider">
            Settings
          </h2>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname === '/admin/settings'
                    ? 'bg-white text-slate-900 shadow-lg shadow-black/10' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  pathname === '/admin/settings' ? 'bg-slate-100' : 'bg-slate-800'
                }`}>
                  <Settings className={`w-4 h-4 ${pathname === '/admin/settings' ? 'text-slate-700' : 'text-slate-500'}`} />
                </div>
                <span className="font-medium">Site Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center transition-colors">
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
          </div>
          <span className="font-medium">View Live Site</span>
        </a>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-400" />
          </div>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}
