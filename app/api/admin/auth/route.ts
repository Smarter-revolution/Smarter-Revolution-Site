import { NextResponse } from 'next/server'
import { verifyPassword, createSession, getSessionCookieConfig, destroySession, getSessionFromCookie, getClearSessionCookieConfig, verifySession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }
    
    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create JWT session and set cookie
    const token = await createSession()
    const cookieConfig = getSessionCookieConfig(token)
    
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookieConfig)
    
    return response
    
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const token = await getSessionFromCookie()
    
    if (token) {
      destroySession(token)
    }
    
    const cookieConfig = getClearSessionCookieConfig()
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookieConfig)
    
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}

// Check auth status
export async function GET() {
  try {
    const token = await getSessionFromCookie()
    
    if (!token) {
      return NextResponse.json({ authenticated: false })
    }
    
    const isValid = await verifySession(token)
    
    return NextResponse.json({ authenticated: isValid })
    
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}
