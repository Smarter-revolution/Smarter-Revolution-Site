import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content'

export async function GET() {
  try {
    const config = await getSiteConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Site config error:', error)
    return NextResponse.json(
      { error: 'Failed to load site config' },
      { status: 500 }
    )
  }
}
