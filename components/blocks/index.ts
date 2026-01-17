import type { Block, HeroBlockData, TextImageBlockData, ServicesGridBlockData, TestimonialsBlockData, CTABlockData, TeamBlockData, ContactBlockData, FAQBlockData } from '@/lib/types'

export { HeroBlock } from './HeroBlock'
export { TextImageBlock } from './TextImageBlock'
export { ServicesGridBlock } from './ServicesGridBlock'
export { TestimonialsBlock } from './TestimonialsBlock'
export { CTABlock } from './CTABlock'
export { TeamBlock } from './TeamBlock'
export { ContactBlock } from './ContactBlock'
export { FAQBlock } from './FAQBlock'

// Import components for the renderer
import { HeroBlock } from './HeroBlock'
import { TextImageBlock } from './TextImageBlock'
import { ServicesGridBlock } from './ServicesGridBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { CTABlock } from './CTABlock'
import { TeamBlock } from './TeamBlock'
import { ContactBlock } from './ContactBlock'
import { FAQBlock } from './FAQBlock'

interface BlockRendererProps {
  block: Block
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'hero':
      return <HeroBlock data={block.data as HeroBlockData} />
    case 'textImage':
      return <TextImageBlock data={block.data as TextImageBlockData} />
    case 'servicesGrid':
      return <ServicesGridBlock data={block.data as ServicesGridBlockData} />
    case 'testimonials':
      return <TestimonialsBlock data={block.data as TestimonialsBlockData} />
    case 'cta':
      return <CTABlock data={block.data as CTABlockData} />
    case 'team':
      return <TeamBlock data={block.data as TeamBlockData} />
    case 'contact':
      return <ContactBlock data={block.data as ContactBlockData} />
    case 'faq':
      return <FAQBlock data={block.data as FAQBlockData} />
    default:
      return <div className="p-4 bg-red-100 text-red-600">Unknown block type</div>
  }
}
