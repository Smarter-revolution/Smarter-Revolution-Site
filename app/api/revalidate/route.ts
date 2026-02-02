import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSecret } from '@/lib/auth';

/**
 * Strapi Webhook Handler for Cache Revalidation
 *
 * SECURITY:
 * - Uses timing-safe comparison for webhook secret validation
 * - Validates slug format to prevent path traversal
 * - Rate limiting handled at infrastructure level (Vercel)
 */

// Validate slug format to prevent path traversal attacks
const SAFE_SLUG_PATTERN = /^[a-z0-9-]+$/i;

function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && SAFE_SLUG_PATTERN.test(slug) && slug.length <= 200;
}

export async function POST(request: NextRequest) {
  // Verify webhook secret using timing-safe comparison
  const secret = request.headers.get('x-strapi-webhook-secret');
  const expectedSecret = process.env.STRAPI_WEBHOOK_SECRET;

  // Check if webhook secret is configured
  if (!expectedSecret) {
    console.error('[Revalidate] STRAPI_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  // Use timing-safe comparison to prevent timing attacks
  if (!verifyWebhookSecret(secret, expectedSecret)) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    // Validate entry slug if present
    const slug = entry?.slug;
    const hasValidSlug = slug && isValidSlug(slug);

    switch (model) {
      case 'blog-post':
        revalidatePath('/blog');
        if (hasValidSlug) {
          revalidatePath(`/blog/${slug}`);
        }
        break;
      case 'service-page':
        if (hasValidSlug) {
          revalidatePath(`/${slug}`);
        }
        break;
      case 'solution-page':
        revalidatePath('/solutions');
        if (hasValidSlug) {
          revalidatePath(`/solutions/${slug}`);
        }
        break;
      case 'team-member':
        revalidatePath('/team');
        break;
      case 'testimonial':
        revalidatePath('/');
        break;
      case 'global-settings':
      case 'navigation':
        revalidatePath('/', 'layout');
        break;
      default:
        revalidatePath('/');
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error('[Revalidate] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
