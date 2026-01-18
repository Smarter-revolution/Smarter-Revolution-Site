'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Lock, Eye, EyeOff, Fingerprint, Shield, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { GradientText, ShinyText, Magnet, DecryptedText } from '@/components/reactbits'

// Dynamic import for heavy component
const Aurora = dynamic(() => import('@/components/reactbits/Aurora'), { ssr: false })

interface LoginFormProps {
  onSuccess: () => void
  title?: string
  subtitle?: string
}

// Floating orbs component
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${
              ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]
            } 0%, transparent 70%)`,
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// 3D Card with tilt effect
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Animated input with glow effect
function AnimatedInput({
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showToggle,
  onToggle,
  isPassword,
}: {
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  icon: React.ElementType
  showToggle?: boolean
  onToggle?: () => void
  isPassword?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${isFocused ? 'opacity-50' : ''}`} />
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
          required
          autoComplete={isPassword ? "current-password" : undefined}
        />
        
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            {type === 'password' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
}

// Animated submit button
function SubmitButton({ loading, disabled }: { loading: boolean; disabled: boolean }) {
  return (
    <Magnet magnetStrength={2} padding={50}>
      <motion.button
        type="submit"
        disabled={loading || disabled}
        className="relative w-full group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Button glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />
        
        <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {loading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <Fingerprint className="w-5 h-5" />
              <span>Access Admin Panel</span>
            </>
          )}
        </div>
      </motion.button>
    </Magnet>
  )
}

export function LoginForm({ 
  onSuccess, 
  title = 'Admin Access',
  subtitle = 'Enter your credentials to continue'
}: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora 
          colorStops={['#1e1b4b', '#581c87', '#0c4a6e']} 
          amplitude={1.5} 
          speed={0.3}
          blend={0.7}
        />
      </div>
      
      {/* Floating Orbs */}
      <FloatingOrbs />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <TiltCard>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-violet-600/30 rounded-3xl blur-xl" />
            
            {/* Main card */}
            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                {/* Animated icon */}
                <motion.div 
                  className="relative w-20 h-20 mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {/* Outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Inner content */}
                  <div className="absolute inset-1 bg-black rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-violet-400" />
                  </div>
                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                </motion.div>
                
                {/* Title with gradient */}
                <h1 className="text-3xl font-bold mb-2">
                  <GradientText 
                    colors={['#a855f7', '#06b6d4', '#a855f7']}
                    animationSpeed={4}
                    className="text-3xl font-bold"
                  >
                    {title}
                  </GradientText>
                </h1>
                
                {/* Subtitle with decrypt effect */}
                {mounted && (
                  <DecryptedText
                    text={subtitle}
                    animateOn="view"
                    speed={30}
                    maxIterations={15}
                    className="text-slate-400"
                    encryptedClassName="text-violet-400/50"
                    parentClassName="text-slate-400 text-sm"
                  />
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  icon={Lock}
                  showToggle
                  onToggle={() => setShowPassword(!showPassword)}
                  isPassword
                />

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <div className="absolute -inset-0.5 bg-red-500/20 rounded-xl blur" />
                    <div className="relative p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                <SubmitButton loading={loading} disabled={!password} />
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <ShinyText
                  text="Powered by Smart Sites Admin"
                  speed={4}
                  color="#64748b"
                  shineColor="#a855f7"
                  className="text-xs"
                />
              </div>
            </div>
          </motion.div>
        </TiltCard>
        
        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs"
        >
          <Lock className="w-3 h-3" />
          <span>256-bit SSL Encrypted Connection</span>
        </motion.div>
      </div>
    </div>
  )
}
