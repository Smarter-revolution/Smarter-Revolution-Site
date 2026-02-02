import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Security Controls
 *
 * FEATURES:
 * - CSRF origin validation for API routes
 * - Request logging
 * - Security headers enforcement
 */

// Allowed origins for API requests
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'https://smarterrevolution.com',
  'https://www.smarterrevolution.com',
]);

// Pattern for Vercel preview deployments
const VERCEL_PREVIEW_PATTERN = /^https:\/\/[\w-]+-[\w-]+\.vercel\.app$/;

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Same-origin requests don't have Origin header

  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (VERCEL_PREVIEW_PATTERN.test(origin)) return true;

  // In development, allow any localhost
  if (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost:')) {
    return true;
  }

  return false;
}

/**
 * Get request origin
 */
function getRequestOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (origin) return origin;

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      return null;
    }
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip for OPTIONS (CORS preflight)
  if (request.method === 'OPTIONS') {
    return handleCORSPreflight(request);
  }

  // Validate origin for mutating requests
  const method = request.method.toUpperCase();
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const origin = getRequestOrigin(request);

    if (!isOriginAllowed(origin)) {
      console.warn(`[Middleware] Blocked request from origin: ${origin} to ${pathname}`);
      return NextResponse.json(
        { error: 'Request blocked for security reasons' },
        { status: 403 }
      );
    }
  }

  // Continue with the request
  const response = NextResponse.next();

  // Add CORS headers if origin is allowed
  const origin = request.headers.get('origin');
  if (origin && isOriginAllowed(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

/**
 * Handle CORS preflight requests
 */
function handleCORSPreflight(request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');

  if (origin && isOriginAllowed(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return new NextResponse(null, { status: 403 });
}

// Configure which paths the middleware runs on
export const config = {
  matcher: '/api/:path*',
};
