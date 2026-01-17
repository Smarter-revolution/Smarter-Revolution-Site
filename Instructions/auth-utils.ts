// /lib/auth.ts - Simple admin authentication

import { cookies } from 'next/headers'

// ============================================
// CONFIGURATION
// ============================================

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Simple in-memory session store
// In production with multiple instances, use Redis or similar
const sessions = new Map<string, { expiresAt: number }>()

// ============================================
// PASSWORD VERIFICATION
// ============================================

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }
  
  // Simple comparison - for production, consider timing-safe comparison
  return password === adminPassword
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export function createSession(): string {
  // Generate random token
  const token = generateToken()
  
  // Store session with expiration
  sessions.set(token, {
    expiresAt: Date.now() + SESSION_DURATION
  })
  
  // Clean up expired sessions periodically
  cleanupExpiredSessions()
  
  return token
}

export function verifySession(token: string): boolean {
  const session = sessions.get(token)
  
  if (!session) {
    return false
  }
  
  if (Date.now() > session.expiresAt) {
    sessions.delete(token)
    return false
  }
  
  return true
}

export function destroySession(token: string): void {
  sessions.delete(token)
}

// ============================================
// COOKIE HELPERS
// ============================================

export async function getSessionFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  return sessionCookie?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionFromCookie()
  if (!token) return false
  return verifySession(token)
}

export function getSessionCookieConfig(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/'
  }
}

export function getClearSessionCookieConfig() {
  return {
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0,
    path: '/'
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

function cleanupExpiredSessions(): void {
  const now = Date.now()
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token)
    }
  }
}

// ============================================
// MIDDLEWARE HELPER
// ============================================

export async function requireAuth(): Promise<{ authenticated: true } | { authenticated: false; error: string }> {
  const token = await getSessionFromCookie()
  
  if (!token) {
    return { authenticated: false, error: 'No session found' }
  }
  
  if (!verifySession(token)) {
    return { authenticated: false, error: 'Invalid or expired session' }
  }
  
  return { authenticated: true }
}
