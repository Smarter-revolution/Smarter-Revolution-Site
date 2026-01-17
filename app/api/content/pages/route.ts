import { NextResponse } from 'next/server'
import { getAllPages } from '@/lib/content'

export async function GET() {
  try {
    const pages = await getAllPages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Pages list error:', error)
    return NextResponse.json(
      { error: 'Failed to load pages' },
      { status: 500 }
    )
  }
}
