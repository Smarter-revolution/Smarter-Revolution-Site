import { createUploadHandler } from '@/src/lib/api/upload'

const handler = createUploadHandler()

export const POST = handler.POST
