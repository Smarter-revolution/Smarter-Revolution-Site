import { NextRequest, NextResponse } from 'next/server';
import { seedBlogs } from '@/scripts/seed-blogs';
import { verifyAdminAuth } from '@/lib/auth';

/**
 * Protected seed endpoint - requires ADMIN_SECRET authentication
 *
 * Usage: POST /api/seed with header "Authorization: Bearer <ADMIN_SECRET>"
 *
 * SECURITY: This endpoint is protected to prevent unauthorized data seeding
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = verifyAdminAuth(request);
    if (!auth.success) {
      return auth.error;
    }

    // Execute seed operation
    seedBlogs();
    return NextResponse.json({ success: true, message: 'Blogs seeded successfully' });
  } catch (error) {
    // Log error without exposing details to client
    console.error('Error seeding blogs:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to seed blogs' },
      { status: 500 }
    );
  }
}
