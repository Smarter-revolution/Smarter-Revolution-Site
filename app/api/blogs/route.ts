import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, addBlog, deleteBlog } from '@/lib/blogs';
import { verifyAdminAuth } from '@/lib/auth';

/**
 * Blog API Routes
 *
 * GET /api/blogs - Public endpoint to fetch all blogs
 * POST /api/blogs - Protected endpoint to create a new blog (requires ADMIN_SECRET)
 * DELETE /api/blogs?id=<id> - Protected endpoint to delete a blog (requires ADMIN_SECRET)
 */

// GET - Public endpoint (no authentication required)
export async function GET() {
  try {
    const blogs = getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Protected endpoint (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = verifyAdminAuth(request);
    if (!auth.success) {
      return auth.error;
    }

    const body = await request.json();
    const { title, content, author } = body;

    // Validate required fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    // Validate field lengths to prevent abuse
    if (title.length > 200) {
      return NextResponse.json(
        { error: 'Title must be 200 characters or less' },
        { status: 400 }
      );
    }

    if (content.length > 100000) {
      return NextResponse.json(
        { error: 'Content must be 100,000 characters or less' },
        { status: 400 }
      );
    }

    if (author.length > 100) {
      return NextResponse.json(
        { error: 'Author must be 100 characters or less' },
        { status: 400 }
      );
    }

    const newBlog = addBlog({ title, content, author });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

// DELETE - Protected endpoint (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = verifyAdminAuth(request);
    if (!auth.success) {
      return auth.error;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Validate ID format (basic sanitization)
    if (!/^[\w-]+$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    const deleted = deleteBlog(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
