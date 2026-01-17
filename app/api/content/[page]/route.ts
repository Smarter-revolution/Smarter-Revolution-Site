import { NextResponse } from 'next/server'
import { getPageContent } from '@/lib/content'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params
  
  try {
    const content = await getPageContent(page)
    
    if (!content) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
    
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    )
  }
}
