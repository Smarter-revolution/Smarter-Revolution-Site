import { getPageContent } from '@/lib/content'
import { BlockRenderer } from '@/components/blocks'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('home')
  if (!content) {
    return {
      title: 'Smarter Revolution | The AI Architects',
    }
  }
  return {
    title: content.seo.title,
    description: content.seo.description,
  }
}

export default async function Home() {
  const content = await getPageContent('home')
  
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Page content not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}
