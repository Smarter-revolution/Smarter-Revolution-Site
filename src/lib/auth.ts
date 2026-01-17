// ============================================
// SMART SITES ADMIN - AUTHENTICATION
// ============================================

import { cookies } from 'next/headers'
import { getConfig } from './config'

// Session token name
const SESSION_COOKIE = 'smart-sites-admin-session'

// --------------------------------------------
// Password Verification
// --------------------------------------------

/**
 * Verify the admin password
 */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }
  
  return password === adminPassword
}

// --------------------------------------------
// Session Management
// --------------------------------------------

/**
 * Generate a session token
 */
function generateSessionToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}`
}

/**
 * Create a new session and set the cookie
 */
export async function createSession(): Promise<string> {
  const config = getConfig()
  const token = generateSessionToken()
  const cookieStore = await cookies()
  
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: config.auth.sessionDuration / 1000, // Convert to seconds
    path: '/',
  })
  
  return token
}

/**
 * Verify if the current session is valid
 */
export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)
  
  if (!sessionCookie?.value) {
    return false
  }
  
  // Basic validation - check if token looks valid
  const token = sessionCookie.value
  const parts = token.split('-')
  
  if (parts.length < 2) {
    return false
  }
  
  // Check if session is expired
  const config = getConfig()
  const timestamp = parseInt(parts[0], 10)
  const now = Date.now()
  
  if (isNaN(timestamp) || now - timestamp > config.auth.sessionDuration) {
    return false
  }
  
  return true
}

/**
 * Destroy the current session
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

// --------------------------------------------
// Auth Check Helpers
// --------------------------------------------

/**
 * Check if the request is authenticated
 * Returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  return verifySession()
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    throw new Error('Unauthorized')
  }
}

// --------------------------------------------
// Client-side Auth Helpers
// --------------------------------------------

/**
 * Login function for client-side use
 */
export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

/**
 * Logout function for client-side use
 */
export async function logout(): Promise<void> {
  await fetch('/api/admin/auth', {
    method: 'DELETE',
  })
}

/**
 * Check auth status from client-side
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'GET',
    })
    
    if (!response.ok) {
      return false
    }
    
    const data = await response.json()
    return data.authenticated === true
  } catch {
    return false
  }
}
