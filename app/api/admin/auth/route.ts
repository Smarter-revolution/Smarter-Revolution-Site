import { createAuthHandler } from '@/src/lib/api/auth'

const handler = createAuthHandler()

export const POST = handler.POST
export const DELETE = handler.DELETE
export const GET = handler.GET
