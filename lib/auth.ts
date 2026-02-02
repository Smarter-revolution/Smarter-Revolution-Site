import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

/**
 * Authentication utilities for protected API endpoints
 *
 * SECURITY NOTES:
 * - Uses timing-safe comparison to prevent timing attacks
 * - Requires ADMIN_SECRET environment variable to be set
 * - Returns standardized error responses
 */

export interface AuthResult {
  success: boolean;
  error?: NextResponse;
}

/**
 * Verify admin authentication from request headers
 *
 * @param request - The incoming Next.js request
 * @returns AuthResult with success status and optional error response
 *
 * Usage:
 * ```typescript
 * const auth = verifyAdminAuth(request);
 * if (!auth.success) return auth.error;
 * // Continue with protected operation
 * ```
 */
export function verifyAdminAuth(request: NextRequest): AuthResult {
  const adminSecret = process.env.ADMIN_SECRET;

  // Check if ADMIN_SECRET is configured
  if (!adminSecret) {
    console.error('SECURITY: ADMIN_SECRET environment variable is not configured');
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      ),
    };
  }

  // Get authorization header
  const authHeader = request.headers.get('authorization');

  // Validate authorization header format
  if (!authHeader?.startsWith('Bearer ')) {
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Unauthorized - Missing or invalid authorization header' },
        { status: 401 }
      ),
    };
  }

  const providedSecret = authHeader.substring(7); // Remove 'Bearer ' prefix

  // Timing-safe comparison to prevent timing attacks
  if (!safeCompare(providedSecret, adminSecret)) {
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Unauthorized - Invalid credentials' },
        { status: 401 }
      ),
    };
  }

  return { success: true };
}

/**
 * Timing-safe string comparison to prevent timing attacks
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns true if strings are equal, false otherwise
 */
function safeCompare(a: string, b: string): boolean {
  // If lengths differ, still perform comparison to maintain constant time
  // but return false
  if (a.length !== b.length) {
    // Compare with itself to maintain constant time behavior
    timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

/**
 * Verify webhook secret using timing-safe comparison
 *
 * @param providedSecret - The secret provided in the request
 * @param expectedSecret - The expected secret from environment
 * @returns true if secrets match, false otherwise
 */
export function verifyWebhookSecret(
  providedSecret: string | null,
  expectedSecret: string | undefined
): boolean {
  if (!providedSecret || !expectedSecret) {
    return false;
  }

  return safeCompare(providedSecret, expectedSecret);
}
