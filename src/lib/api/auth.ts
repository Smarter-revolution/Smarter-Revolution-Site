// ============================================
// AUTH API HANDLER
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession, destroySession, isAuthenticated } from '../auth'

/**
 * Create auth API handler
 * Handles login (POST), logout (DELETE), and status check (GET)
 */
export function createAuthHandler() {
  return {
    /**
     * POST - Login
     */
    async POST(request: NextRequest) {
      try {
        const body = await request.json()
        const { password } = body

        if (!password) {
          return NextResponse.json(
            { success: false, error: 'Password is required' },
            { status: 400 }
          )
        }

        const isValid = verifyPassword(password)

        if (!isValid) {
          return NextResponse.json(
            { success: false, error: 'Invalid password' },
            { status: 401 }
          )
        }

        await createSession()

        return NextResponse.json({ success: true })
      } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json(
          { success: false, error: 'Authentication failed' },
          { status: 500 }
        )
      }
    },

    /**
     * DELETE - Logout
     */
    async DELETE() {
      try {
        await destroySession()
        return NextResponse.json({ success: true })
      } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
          { success: false, error: 'Logout failed' },
          { status: 500 }
        )
      }
    },

    /**
     * GET - Check auth status
     */
    async GET() {
      try {
        const authenticated = await isAuthenticated()
        return NextResponse.json({ authenticated })
      } catch (error) {
        console.error('Auth check error:', error)
        return NextResponse.json({ authenticated: false })
      }
    },
  }
}
