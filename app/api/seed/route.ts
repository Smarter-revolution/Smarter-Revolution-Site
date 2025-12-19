import { NextResponse } from 'next/server';
import { seedBlogs } from '@/scripts/seed-blogs';

export async function POST() {
  try {
    seedBlogs();
    return NextResponse.json({ success: true, message: 'Blogs seeded successfully' });
  } catch (error) {
    console.error('Error seeding blogs:', error);
    return NextResponse.json(
      { error: 'Failed to seed blogs' },
      { status: 500 }
    );
  }
}

