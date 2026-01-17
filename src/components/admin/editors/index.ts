// ============================================
// SMART SITES ADMIN - EDITOR EXPORTS
// ============================================

import { BlockType, BlockData, EditorProps } from '@/src/lib/types'
import { HeroEditor } from './HeroEditor'
import { TextImageEditor } from './TextImageEditor'
import { ServicesGridEditor } from './ServicesGridEditor'
import { TestimonialsEditor } from './TestimonialsEditor'
import { CTAEditor } from './CTAEditor'
import { TeamEditor } from './TeamEditor'
import { ContactEditor } from './ContactEditor'
import { FAQEditor } from './FAQEditor'

// Export all editors
export { HeroEditor } from './HeroEditor'
export { TextImageEditor } from './TextImageEditor'
export { ServicesGridEditor } from './ServicesGridEditor'
export { TestimonialsEditor } from './TestimonialsEditor'
export { CTAEditor } from './CTAEditor'
export { TeamEditor } from './TeamEditor'
export { ContactEditor } from './ContactEditor'
export { FAQEditor } from './FAQEditor'

// Editor component type
type EditorComponent = React.ComponentType<EditorProps<BlockData>>

// Map of block types to their editor components
const editorMap: Record<BlockType, EditorComponent> = {
  hero: HeroEditor as EditorComponent,
  textImage: TextImageEditor as EditorComponent,
  servicesGrid: ServicesGridEditor as EditorComponent,
  testimonials: TestimonialsEditor as EditorComponent,
  cta: CTAEditor as EditorComponent,
  team: TeamEditor as EditorComponent,
  contact: ContactEditor as EditorComponent,
  faq: FAQEditor as EditorComponent,
}

/**
 * Get the editor component for a given block type
 */
export function getEditorForBlockType(type: BlockType | string): EditorComponent | null {
  return editorMap[type as BlockType] || null
}

/**
 * Check if an editor exists for a block type
 */
export function hasEditorForBlockType(type: BlockType | string): boolean {
  return type in editorMap
}
