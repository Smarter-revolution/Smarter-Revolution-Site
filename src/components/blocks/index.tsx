// ============================================
// SMART SITES ADMIN - BLOCK COMPONENTS
// ============================================

import { Block, BlockType } from '@/src/lib/types'
import { HeroBlock } from './HeroBlock'
import { TextImageBlock } from './TextImageBlock'
import { ServicesGridBlock } from './ServicesGridBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { CTABlock } from './CTABlock'
import { TeamBlock } from './TeamBlock'
import { ContactBlock } from './ContactBlock'
import { FAQBlock } from './FAQBlock'

// Export all block components
export { HeroBlock } from './HeroBlock'
export { TextImageBlock } from './TextImageBlock'
export { ServicesGridBlock } from './ServicesGridBlock'
export { TestimonialsBlock } from './TestimonialsBlock'
export { CTABlock } from './CTABlock'
export { TeamBlock } from './TeamBlock'
export { ContactBlock } from './ContactBlock'
export { FAQBlock } from './FAQBlock'

// Block component type
type BlockComponent = React.ComponentType<{ data: Block['data'] }>

// Map of block types to their display components
const blockMap: Record<BlockType, BlockComponent> = {
  hero: HeroBlock as BlockComponent,
  textImage: TextImageBlock as BlockComponent,
  servicesGrid: ServicesGridBlock as BlockComponent,
  testimonials: TestimonialsBlock as BlockComponent,
  cta: CTABlock as BlockComponent,
  team: TeamBlock as BlockComponent,
  contact: ContactBlock as BlockComponent,
  faq: FAQBlock as BlockComponent,
}

/**
 * BlockRenderer - Renders a block based on its type
 */
interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = blockMap[block.type]
  
  if (!Component) {
    console.warn(`Unknown block type: ${block.type}`)
    return null
  }

  return <Component data={block.data} />
}

/**
 * PageRenderer - Renders all blocks for a page
 */
interface PageRendererProps {
  blocks: Block[]
}

export function PageRenderer({ blocks }: PageRendererProps) {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}

/**
 * Get block component by type
 */
export function getBlockComponent(type: BlockType | string): BlockComponent | null {
  return blockMap[type as BlockType] || null
}

/**
 * Check if a block component exists for a type
 */
export function hasBlockComponent(type: BlockType | string): boolean {
  return type in blockMap
}
