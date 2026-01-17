import type { BlockType, BlockData, EditorProps } from '@/lib/types'
import { HeroEditor } from './HeroEditor'
import { TextImageEditor } from './TextImageEditor'
import { ServicesGridEditor } from './ServicesGridEditor'
import { TestimonialsEditor } from './TestimonialsEditor'
import { CTAEditor } from './CTAEditor'
import { TeamEditor } from './TeamEditor'
import { ContactEditor } from './ContactEditor'
import { FAQEditor } from './FAQEditor'

export { HeroEditor } from './HeroEditor'
export { TextImageEditor } from './TextImageEditor'
export { ServicesGridEditor } from './ServicesGridEditor'
export { TestimonialsEditor } from './TestimonialsEditor'
export { CTAEditor } from './CTAEditor'
export { TeamEditor } from './TeamEditor'
export { ContactEditor } from './ContactEditor'
export { FAQEditor } from './FAQEditor'

type EditorComponent = React.ComponentType<EditorProps<BlockData>>

const editorMap: Record<BlockType, EditorComponent> = {
  hero: HeroEditor as EditorComponent,
  textImage: TextImageEditor as EditorComponent,
  servicesGrid: ServicesGridEditor as EditorComponent,
  testimonials: TestimonialsEditor as EditorComponent,
  cta: CTAEditor as EditorComponent,
  team: TeamEditor as EditorComponent,
  contact: ContactEditor as EditorComponent,
  faq: FAQEditor as EditorComponent
}

export function getEditorForBlockType(type: BlockType): EditorComponent | null {
  return editorMap[type] || null
}
