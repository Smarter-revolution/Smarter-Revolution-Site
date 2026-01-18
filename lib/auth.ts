// /lib/auth.ts - JWT-based admin authentication
// This implementation survives serverless deployments and works across instances

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// ============================================
// CONFIGURATION
// ============================================

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 // 24 hours in seconds

// Get the JWT secret from environment variable
// Falls back to ADMIN_PASSWORD if JWT_SECRET is not set (for backwards compatibility)
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || 'fallback-secret-change-me'
  return new TextEncoder().encode(secret)
}

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
// JWT TOKEN MANAGEMENT
// ============================================

export async function createSession(): Promise<string> {
  const secret = getJwtSecret()
  
  // Create a JWT token with expiration
  const token = await new SignJWT({ 
    role: 'admin',
    iat: Math.floor(Date.now() / 1000)
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secret)
  
  return token
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const secret = getJwtSecret()
    
    // Verify the JWT token
    const { payload } = await jwtVerify(token, secret)
    
    // Check if token has admin role
    if (payload.role !== 'admin') {
      return false
    }
    
    return true
  } catch (error) {
    // Token is invalid or expired
    console.error('JWT verification failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

// Kept for backwards compatibility but no longer needed with JWT
export function destroySession(token: string): void {
  // JWT tokens are stateless - we just need to clear the cookie
  // The token will be invalid once removed from the client
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
  return await verifySession(token)
}

export function getSessionCookieConfig(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_DURATION, // Already in seconds for JWT
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
// MIDDLEWARE HELPER
// ============================================

export async function requireAuth(): Promise<{ authenticated: true } | { authenticated: false; error: string }> {
  const token = await getSessionFromCookie()
  
  if (!token) {
    return { authenticated: false, error: 'No session found' }
  }
  
  const isValid = await verifySession(token)
  if (!isValid) {
    return { authenticated: false, error: 'Invalid or expired session' }
  }
  
  return { authenticated: true }
}
