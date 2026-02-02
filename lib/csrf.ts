import { NextRequest, NextResponse } from 'next/server';

/**
 * CSRF Protection Module
 *
 * SECURITY FEATURES:
 * - Origin header validation
 * - Referer header validation (fallback)
 * - Same-site enforcement
 *
 * NOTE: JSON APIs are generally protected from CSRF by browsers' same-origin policy
 * since cross-origin requests with JSON content type trigger CORS preflight.
 * This is an additional defense-in-depth measure.
 */

// Allowed origins (add your production domain here)
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'https://smarterrevolution.com',
  'https://www.smarterrevolution.com',
  // Add Vercel preview URLs pattern
]);

// Pattern for Vercel preview deployments
const VERCEL_PREVIEW_PATTERN = /^https:\/\/[\w-]+-[\w-]+\.vercel\.app$/;

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  // Check exact match
  if (ALLOWED_ORIGINS.has(origin)) return true;

  // Check Vercel preview pattern
  if (VERCEL_PREVIEW_PATTERN.test(origin)) return true;

  // In development, allow localhost with any port
  if (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost:')) {
    return true;
  }

  return false;
}

/**
 * Extract origin from request
 */
function getRequestOrigin(request: NextRequest): string | null {
  // First check Origin header
  const origin = request.headers.get('origin');
  if (origin) return origin;

  // Fall back to Referer header
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return url.origin;
    } catch {
      return null;
    }
  }

  return null;
}

export interface CSRFResult {
  valid: boolean;
  error?: NextResponse;
}

/**
 * Validate CSRF protection for a request
 *
 * @param request - The incoming Next.js request
 * @returns CSRFResult indicating if the request is valid
 *
 * Usage:
 * ```typescript
 * const csrf = validateCSRF(request);
 * if (!csrf.valid) return csrf.error;
 * ```
 */
export function validateCSRF(request: NextRequest): CSRFResult {
  // Only check for mutating methods
  const method = request.method.toUpperCase();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return { valid: true };
  }

  // Check content type - JSON APIs are somewhat protected by CORS
  const contentType = request.headers.get('content-type');
  const isJSONRequest = contentType?.includes('application/json');

  // If not JSON, require strict origin check
  if (!isJSONRequest) {
    const origin = getRequestOrigin(request);
    if (!isOriginAllowed(origin)) {
      return {
        valid: false,
        error: NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        ),
      };
    }
  }

  // For JSON requests, check origin but be more lenient
  // (browsers enforce CORS for cross-origin JSON requests)
  const origin = getRequestOrigin(request);
  if (origin && !isOriginAllowed(origin)) {
    // Log but don't block - CORS should handle this
    console.warn(`[CSRF] Request from unexpected origin: ${origin}`);
  }

  return { valid: true };
}

/**
 * CSRF validation middleware for strict enforcement
 * Use this for sensitive operations that need extra protection
 */
export function validateCSRFStrict(request: NextRequest): CSRFResult {
  const method = request.method.toUpperCase();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return { valid: true };
  }

  const origin = getRequestOrigin(request);

  // For strict mode, always require valid origin
  if (!isOriginAllowed(origin)) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Request blocked for security reasons' },
        { status: 403 }
      ),
    };
  }

  return { valid: true };
}

/**
 * Add allowed origin at runtime (for dynamic configuration)
 */
export function addAllowedOrigin(origin: string): void {
  ALLOWED_ORIGINS.add(origin);
}

/**
 * Get CORS headers for a specific origin
 */
export function getCORSHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin');

  if (origin && isOriginAllowed(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };
  }

  return {};
}
