import type { NextConfig } from "next";

/**
 * Security headers configuration
 * Based on OWASP recommendations and security best practices
 */
const securityHeaders = [
  {
    // Prevent clickjacking attacks
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Prevent MIME type sniffing
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Control referrer information
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Restrict browser features
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    // Enable HTTPS strict transport (Vercel handles this, but explicit is better)
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    // XSS protection (legacy but still useful for older browsers)
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    // Content Security Policy
    // Note: Adjust as needed for your specific third-party integrations
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com https://*.cal.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://*.strapiapp.com https://*.cal.com",
      "connect-src 'self' https://api.anthropic.com https://*.cal.com https://*.strapiapp.com https://*.api-us1.com",
      "frame-src 'self' https://cal.com https://*.cal.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
      },
    ],
  },

  // Disable source maps in production for security
  productionBrowserSourceMaps: false,

  // Apply security headers to all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
