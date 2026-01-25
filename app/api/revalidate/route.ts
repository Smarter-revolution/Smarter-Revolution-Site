import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-strapi-webhook-secret');

  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body;

    switch (model) {
      case 'blog-post':
        revalidatePath('/blog');
        if (entry?.slug) {
          revalidatePath(`/blog/${entry.slug}`);
        }
        break;
      case 'service-page':
        if (entry?.slug) {
          revalidatePath(`/${entry.slug}`);
        }
        break;
      case 'solution-page':
        revalidatePath('/solutions');
        if (entry?.slug) {
          revalidatePath(`/solutions/${entry.slug}`);
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
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
