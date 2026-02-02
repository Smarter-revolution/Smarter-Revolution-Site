import { NextRequest, NextResponse } from 'next/server';

/**
 * Hybrid rate limiter for API endpoints
 *
 * FEATURES:
 * - Uses Vercel KV when configured (distributed, works across serverless instances)
 * - Falls back to in-memory storage for local development
 * - IP-based rate limiting with sliding window algorithm
 * - Automatic cleanup of expired entries
 *
 * SETUP FOR PRODUCTION:
 * 1. Install @vercel/kv: npm install @vercel/kv
 * 2. Create a KV database in Vercel dashboard
 * 3. Link the KV database to your project (auto-sets KV_REST_API_URL and KV_REST_API_TOKEN)
 *
 * SECURITY NOTES:
 * - Uses IP-based rate limiting
 * - Implements sliding window algorithm
 * - Headers expose rate limit status for clients
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (fallback)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup interval (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

// Check if Vercel KV is configured
const isKVConfigured = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

// Lazy-loaded KV client
let kvClient: { incr: (key: string) => Promise<number>; expire: (key: string, seconds: number) => Promise<number>; get: (key: string) => Promise<string | null> } | null = null;

/**
 * Get Vercel KV client (lazy loaded)
 */
async function getKVClient() {
  if (!isKVConfigured) return null;

  if (!kvClient) {
    try {
      // Optional dependency: avoid bundler resolution when not installed
      const requireFunc = eval('require') as (id: string) => { kv: typeof kvClient };
      const { kv } = requireFunc('@vercel/kv');
      kvClient = kv;
    } catch {
      // @vercel/kv not installed, use in-memory fallback
      console.warn('[Rate Limit] @vercel/kv not installed, using in-memory rate limiting');
      return null;
    }
  }

  return kvClient;
}

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
 * Check rate limit using Vercel KV (distributed)
 */
async function checkRateLimitKV(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult | null> {
  const kv = await getKVClient();
  if (!kv) return null;

  try {
    const now = Date.now();
    const kvKey = `ratelimit:${key}`;

    // Increment the counter
    const count = await kv.incr(kvKey);

    // Set expiry on first request
    if (count === 1) {
      await kv.expire(kvKey, config.windowSeconds);
    }

    const resetTime = now + config.windowSeconds * 1000;

    if (count > config.limit) {
      const retryAfter = config.windowSeconds;

      return {
        success: false,
        limit: config.limit,
        remaining: 0,
        resetTime,
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
              'X-RateLimit-Reset': String(Math.ceil(resetTime / 1000)),
            },
          }
        ),
      };
    }

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - count,
      resetTime,
    };
  } catch (error) {
    console.error('[Rate Limit] KV error, falling back to in-memory:', error);
    return null; // Fall back to in-memory
  }
}

/**
 * Check rate limit using in-memory storage (local/fallback)
 */
function checkRateLimitMemory(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupExpiredEntries();

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
 * Check rate limit for a request
 *
 * Uses Vercel KV when configured, falls back to in-memory otherwise.
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
  const ip = getClientIP(request);
  const key = config.keyPrefix ? `${config.keyPrefix}:${ip}` : ip;

  // For synchronous compatibility, use in-memory
  // For async KV support, use checkRateLimitAsync
  return checkRateLimitMemory(key, config);
}

/**
 * Async version of checkRateLimit that uses Vercel KV when available
 *
 * @param request - The incoming Next.js request
 * @param config - Rate limit configuration
 * @returns Promise<RateLimitResult> with status and remaining quota
 */
export async function checkRateLimitAsync(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const key = config.keyPrefix ? `${config.keyPrefix}:${ip}` : ip;

  // Try KV first if configured
  if (isKVConfigured) {
    const kvResult = await checkRateLimitKV(key, config);
    if (kvResult) return kvResult;
  }

  // Fall back to in-memory
  return checkRateLimitMemory(key, config);
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

/**
 * Check if distributed rate limiting (Vercel KV) is available
 */
export function isDistributedRateLimitingEnabled(): boolean {
  return isKVConfigured;
}
