import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter for API endpoints
 *
 * IMPORTANT: This is a basic in-memory implementation suitable for single-server deployments.
 * For production with multiple serverless instances, consider using:
 * - Vercel KV (@vercel/kv)
 * - Upstash Redis (@upstash/ratelimit)
 * - External rate limiting service
 *
 * SECURITY NOTES:
 * - Uses IP-based rate limiting
 * - Implements sliding window algorithm
 * - Automatically cleans up expired entries
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: This resets on serverless function cold starts
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup interval (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

/**
 * Clean up expired rate limit entries to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client IP address from request
 * Handles various proxy headers
 */
function getClientIP(request: NextRequest): string {
  // Check common proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP if multiple are present
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Vercel-specific header
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP.split(',')[0].trim();
  }

  // Fallback
  return 'unknown';
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
  /** Optional key prefix for different endpoints */
  keyPrefix?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  error?: NextResponse;
}

/**
 * Check rate limit for a request
 *
 * @param request - The incoming Next.js request
 * @param config - Rate limit configuration
 * @returns RateLimitResult with status and remaining quota
 *
 * Usage:
 * ```typescript
 * const rateLimit = checkRateLimit(request, { limit: 10, windowSeconds: 60 });
 * if (!rateLimit.success) return rateLimit.error;
 * ```
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): RateLimitResult {
  // Cleanup expired entries periodically
  cleanupExpiredEntries();

  const ip = getClientIP(request);
  const key = config.keyPrefix ? `${config.keyPrefix}:${ip}` : ip;
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;

  let entry = rateLimitStore.get(key);

  // Create new entry if doesn't exist or has expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  // Check if over limit
  if (entry.count > config.limit) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetTime: entry.resetTime,
      error: NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(config.limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(entry.resetTime / 1000)),
          },
        }
      ),
    };
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Add rate limit headers to a response
 */
export function addRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set('X-RateLimit-Limit', String(result.limit));
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(result.resetTime / 1000)));
  return response;
}

// Pre-configured rate limiters for common use cases
export const RATE_LIMITS = {
  // Contact form: 5 requests per minute
  contact: { limit: 5, windowSeconds: 60, keyPrefix: 'contact' },
  // Lead capture: 10 requests per minute
  lead: { limit: 10, windowSeconds: 60, keyPrefix: 'lead' },
  // Chat API: 20 requests per minute (to control AI costs)
  chat: { limit: 20, windowSeconds: 60, keyPrefix: 'chat' },
  // Booking: 10 requests per minute
  booking: { limit: 10, windowSeconds: 60, keyPrefix: 'booking' },
  // General API: 60 requests per minute
  general: { limit: 60, windowSeconds: 60, keyPrefix: 'general' },
} as const;
