'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Lock, Eye, EyeOff, Fingerprint, Shield, Sparkles } from 'lucide-react'
import { SpotlightCard, ShinyText, GradientText, BlurText } from '@/components/reactbits'

// Dynamic imports for heavy components
const Aurora = dynamic(() => import('@/components/reactbits/Aurora'), { ssr: false })

interface LoginFormProps {
  onSuccess: () => void
  title?: string
  subtitle?: string
}

export function LoginForm({ 
  onSuccess, 
  title = 'Smart Sites Admin',
  subtitle = 'Enter your password to manage content'
}: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        onSuccess()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora 
          colorStops={['#0f172a', '#7c3aed', '#ec4899']} 
          amplitude={1.5} 
          speed={0.4}
          blend={0.7}
        />
      </div>

      {/* Animated Grid Pattern */}
      <div 
        className="fixed inset-0 z-[1] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 z-[2] overflow-hidden pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Glowing Orb Behind Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        <SpotlightCard 
          className="bg-black/60 backdrop-blur-xl border-white/10 hover:border-violet-500/30 transition-all duration-500"
          spotlightColor="rgba(139, 92, 246, 0.25)"
        >
          {/* Header */}
          <div className="text-center mb-8">
            {/* Animated Icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/30">
                <Shield className="w-10 h-10 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
            </div>

            {/* Title with Gradient */}
            <h1 className="text-3xl font-black mb-3">
              <GradientText 
                colors={['#a855f7', '#ec4899', '#3b82f6', '#a855f7']}
                animationSpeed={4}
                className="text-3xl font-black"
              >
                {title}
              </GradientText>
            </h1>

            {/* Subtitle with Blur Animation */}
            <BlurText 
              text={subtitle}
              className="text-slate-400 text-sm"
              delay={30}
              animateBy="words"
              direction="bottom"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="flex items-center gap-2 text-sm font-medium text-slate-300"
              >
                <Fingerprint className="w-4 h-4 text-violet-400" />
                <ShinyText 
                  text="Access Code" 
                  speed={3}
                  color="#cbd5e1"
                  shineColor="#a855f7"
                  className="text-sm font-medium"
                />
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-violet-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="relative overflow-hidden p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
                <div className="relative flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="group relative w-full overflow-hidden py-4 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <GradientText 
                      colors={['#ffffff', '#e9d5ff', '#ffffff']}
                      animationSpeed={2}
                      className="font-bold"
                    >
                      Authenticating...
                    </GradientText>
                  </>
                ) : (
                  <>
                    <span>Access Dashboard</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-center text-sm text-slate-500">
              Protected by{' '}
              <ShinyText 
                text="Smart Sites Admin" 
                speed={4}
                color="#64748b"
                shineColor="#a855f7"
                className="text-sm font-medium"
              />
            </p>
          </div>
        </SpotlightCard>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs">
          <Lock className="w-3 h-3" />
          <span>256-bit encrypted connection</span>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
