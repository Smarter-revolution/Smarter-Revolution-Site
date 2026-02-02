# Security Assessment Report
## Smarter Revolution Website

**Report Date:** February 2, 2026
**Assessment Type:** Static Code Analysis & Configuration Review
**Prepared By:** Security Analyst
**Classification:** CONFIDENTIAL

---

## 1. Executive Summary

This security assessment evaluates the Smarter Revolution website, a Next.js 16.1.0 application deployed on Vercel. The application integrates with multiple third-party services including Strapi CMS, Cal.com, ActiveCampaign, and Anthropic Claude API.

### Key Findings Overview

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 4 | Exposed secrets, unprotected endpoints |
| High | 6 | Missing authentication, input validation gaps |
| Medium | 8 | Configuration weaknesses, missing headers |
| Low | 5 | Best practice deviations |

### Overall Risk Rating: **CRITICAL**

The application contains **multiple critical vulnerabilities** that require immediate remediation before production deployment. Most notably, API keys and sensitive credentials have been committed to version control and are exposed in the git history.

---

## 2. Scope & Assumptions

### 2.1 Components Reviewed

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend (React/Next.js) | ✅ Reviewed | App router, components, pages |
| Backend API Routes | ✅ Reviewed | All `/app/api/*` endpoints |
| Authentication System | ✅ Reviewed | No user auth implemented |
| Third-Party Integrations | ✅ Reviewed | ActiveCampaign, Cal.com, Strapi, Anthropic |
| Configuration Files | ✅ Reviewed | Environment files, Next.js config |
| Dependencies | ✅ Reviewed | package.json analysis |
| Infrastructure (Vercel) | ⚠️ Partial | Config only, not runtime |

### 2.2 Limitations

- Runtime behavior not tested (static analysis only)
- Strapi CMS backend configuration not accessible
- Vercel deployment settings not directly reviewed
- No penetration testing performed
- Third-party service configurations (Cal.com, ActiveCampaign) not reviewed

### 2.3 Assumptions

- Application is deployed on Vercel with default security settings
- Strapi CMS is hosted externally at `*.strapiapp.com`
- All committed `.env*` files reflect actual/historical credentials
- No additional security controls exist outside the codebase

---

## 3. Authentication & Authorization Issues

### 3.1 Severity: CRITICAL — No API Authentication

**Finding:** All API endpoints are publicly accessible without any form of authentication.

**Affected Endpoints:**
```
POST /api/seed          - Data seeding (completely unprotected)
POST /api/chat          - Anthropic Claude integration
POST /api/contact       - Contact form submission
POST /api/lead          - Lead capture webhook
POST /api/blogs         - Blog creation
DELETE /api/blogs       - Blog deletion
POST /api/cal/book      - Calendar booking creation
GET  /api/cal/slots     - Calendar availability
GET  /api/cal/event-types - Calendar event types
```

**Risk:** Any malicious actor can:
- Seed arbitrary data via `/api/seed`
- Delete blog posts via `/api/blogs`
- Consume API credits via `/api/chat`
- Create fake leads and bookings
- Enumerate calendar availability

**Evidence:**
```typescript
// /app/api/seed/route.ts - No authentication
export async function POST() {
  seedBlogs();
  return NextResponse.json({ message: "Seeded blogs" });
}
```

---

### 3.2 Severity: HIGH — Session Handling Not Implemented

**Finding:** The application has no session management, JWT handling, or user authentication system.

**Impact:**
- No ability to restrict access to administrative functions
- No audit trail for user actions
- No protection against unauthorized modifications

---

### 3.3 Severity: HIGH — Role-Based Access Control Absent

**Finding:** No RBAC system exists. All users have equivalent (unrestricted) access to all endpoints.

**Impact:**
- Cannot differentiate between admin and public users
- Cannot restrict sensitive operations
- No privilege separation

---

### 3.4 Severity: MEDIUM — Token Storage (Third-Party APIs)

**Finding:** API tokens for third-party services are stored in environment variables, but several have been exposed in version control.

**Exposed Tokens:**
| Service | Token Type | Status |
|---------|-----------|--------|
| ActiveCampaign | API Key | ⚠️ EXPOSED in `.env.local` |
| Cal.com | API Key (default) | ⚠️ EXPOSED in `.env.local` |
| Cal.com | API Key (Mark) | ⚠️ EXPOSED in `.env.vercel.production` |
| GitHub | PAT Token | ⚠️ EXPOSED in `.env.local` |
| Vercel | OIDC Token | ⚠️ EXPOSED in `.env.vercel*` |
| Make.com | Webhook URL | ⚠️ EXPOSED in script file |

---

### 3.5 Severity: HIGH — Privilege Escalation via Username Manipulation

**Finding:** Cal.com API key selection is based on username string matching, allowing privilege escalation.

**Vulnerable Code:**
```typescript
// /lib/calBookingConfig.ts
const getApiKeyForUser = (username?: string): string | undefined => {
  if (username?.toLowerCase().includes("mark")) {
    return process.env.CAL_API_KEY_MARK?.trim();
  }
  return process.env.CAL_API_KEY?.trim();
};
```

**Exploit:** Any request containing "mark" in the username parameter will use Mark's API key, potentially accessing different calendar permissions or quotas.

---

## 4. Input Validation & Injection Risks

### 4.1 Severity: MEDIUM — XSS (Cross-Site Scripting) Risks

**Finding:** User input is not sanitized before rendering or storing.

**Vulnerable Components:**

1. **Contact Form Message Field:**
```typescript
// /app/api/contact/route.ts
fieldValues.push({ field: "2", value: contact.message.trim() });
// Message passed directly to ActiveCampaign without sanitization
```

2. **Blog Content Rendering:**
```typescript
// /components/RichText.tsx
// Strapi blocks rendered without explicit XSS filtering
<BlocksRenderer content={content} />
```

3. **Chat Conversation History:**
```typescript
// /app/api/lead/route.ts
conversation: conversationHistory || [], // Array passed without validation
```

**Attack Vector:** Stored XSS via contact forms or blog content that gets rendered to administrators or other users.

---

### 4.2 Severity: MEDIUM — Email Validation Bypass

**Finding:** Email regex validation is overly permissive.

**Current Regex:**
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

**Issues:**
- Accepts `a@b.c` (single character TLD)
- Accepts `test+<script>@domain.com`
- No maximum length validation
- No domain verification

**Recommended Fix:**
```typescript
import { z } from 'zod';
const emailSchema = z.string().email().max(254);
```

---

### 4.3 Severity: LOW — SQL/NoSQL Injection

**Finding:** Application uses API-based data access (Strapi, ActiveCampaign), reducing direct injection risk.

**Mitigating Factors:**
- Strapi uses parameterized queries via `qs.stringify()`
- No direct database connections in codebase
- Third-party APIs handle query construction

**Residual Risk:** Strapi filter injection if user input reaches query filters:
```typescript
// Potential risk if user controls filter values
filters: { slug: { $eq: userInput } }
```

---

### 4.4 Severity: MEDIUM — Prompt Injection (AI Chat)

**Finding:** User messages are sent directly to Anthropic Claude without prompt injection protection.

**Vulnerable Code:**
```typescript
// /app/api/chat/route.ts
const { message } = body;
// No filtering of prompt injection attempts
// Directly passed to Claude API
```

**Attack Vectors:**
- Prompt manipulation to extract system instructions
- Bypassing content filters
- Generating unauthorized responses

**Recommended Mitigations:**
- Input length limits
- Prompt hardening
- Output filtering
- Rate limiting per session

---

### 4.5 Severity: LOW — Command/Template Injection

**Finding:** No direct command execution or template engines identified.

**Notes:**
- No `exec()`, `spawn()`, or similar functions
- No server-side template rendering (React only)
- Markdown processing uses `remark` (safe)

---

## 5. API & Backend Security

### 5.1 Severity: CRITICAL — Unprotected `/api/seed` Endpoint

**Finding:** The seed endpoint allows anyone to execute data seeding operations.

**Code:**
```typescript
// /app/api/seed/route.ts
export async function POST() {
  seedBlogs();
  return NextResponse.json({ message: "Seeded blogs" });
}
```

**Impact:**
- Data corruption
- Service disruption
- Potential DoS via repeated calls

---

### 5.2 Severity: HIGH — Missing Rate Limiting

**Finding:** No rate limiting on any API endpoint.

**Affected Operations:**
| Endpoint | Risk |
|----------|------|
| `/api/chat` | API cost accumulation via Claude tokens |
| `/api/contact` | Form spam, CRM pollution |
| `/api/lead` | Lead database flooding |
| `/api/cal/book` | Calendar booking spam |
| `/api/revalidate` | Cache invalidation DoS |

**Recommended Fix:**
```typescript
// Implement rate limiting middleware
import rateLimit from 'express-rate-limit';
// Or use Vercel Edge Config with @vercel/edge-config
```

---

### 5.3 Severity: HIGH — Insecure Direct Object Reference (IDOR)

**Finding:** Blog deletion uses unvalidated ID parameter.

**Code:**
```typescript
// /app/api/blogs/route.ts
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  // No authorization check - any ID can be deleted
}
```

**Impact:** Any user can delete any blog post by guessing or enumerating IDs.

---

### 5.4 Severity: MEDIUM — Webhook Secret Validation Weakness

**Finding:** Strapi webhook uses simple string comparison vulnerable to timing attacks.

**Code:**
```typescript
// /app/api/revalidate/route.ts
const secret = request.headers.get('x-strapi-webhook-secret');
if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
}
```

**Issues:**
- Timing attack vulnerability (string comparison)
- No HMAC signature verification
- Secret not defined in environment files

**Recommended Fix:**
```typescript
import { timingSafeEqual } from 'crypto';
const isValid = timingSafeEqual(
  Buffer.from(secret || ''),
  Buffer.from(process.env.STRAPI_WEBHOOK_SECRET || '')
);
```

---

### 5.5 Severity: MEDIUM — Cal.com Host Manipulation

**Finding:** Booking endpoint allows arbitrary host specification.

**Code:**
```typescript
// /app/api/cal/book/route.ts
const { hostUsernames } = body;
// No validation that requestor has authority to add hosts
```

**Impact:**
- Add unauthorized hosts to meetings
- Book time on unintended calendars
- Calendar hijacking

---

## 6. Client-Side & Frontend Security

### 6.1 Severity: CRITICAL — Exposed Secrets in Repository

**Finding:** Multiple API keys and secrets are committed to version control.

**Exposed Files:**
| File | Secrets Found |
|------|---------------|
| `.env.local` | GitHub PAT, ActiveCampaign API Key, Cal.com API Key, Admin Password |
| `.env.vercel` | Vercel OIDC Token |
| `.env.vercel.production` | Cal.com Mark API Key, Vercel OIDC Token |
| `add-vercel-env.sh` | N8N Webhook URL, environment setup |

**Evidence (Redacted):**
```bash
# .env.local (COMMITTED TO GIT)
GITHUB_TOKEN=github_pat_11B4QJSPQ0b...
ACTIVECAMPAIGN_API_KEY=88490e9a37a177...
CAL_API_KEY=cal_live_2ad40f9177...
ADMIN_PASSWORD=admin
```

**Impact:**
- All historical commits contain plaintext secrets
- Secrets accessible to anyone with repo access
- Third-party services can be compromised

---

### 6.2 Severity: MEDIUM — Console Logging of Sensitive Data

**Finding:** API payloads with sensitive data are logged to console.

**Code:**
```typescript
// /app/api/cal/book/route.ts
console.log("Sending to Cal.com:", JSON.stringify(calPayload, null, 2));
```

**Impact:**
- Credentials visible in server logs
- PII exposure in log aggregation services
- Potential compliance violations

---

### 6.3 Severity: LOW — Source Maps

**Finding:** Source maps may be exposed in production builds.

**Recommendation:**
```typescript
// next.config.ts
const nextConfig = {
  productionBrowserSourceMaps: false,
};
```

---

### 6.4 Severity: MEDIUM — Dependency Risks

**Finding:** No automated dependency scanning configured.

**High-Risk Dependencies:**
| Package | Version | Concern |
|---------|---------|---------|
| `react` | 19.2.3 | Very recent, potential undiscovered vulnerabilities |
| `next` | 16.1.0 | Very recent major version |
| `three` | 0.176.0 | 3D library, large attack surface |
| `remark-html` | 16.0.1 | HTML rendering, XSS potential |

**Recommendation:**
```bash
npm install --save-dev snyk
npx snyk test
npm audit --audit-level=high
```

---

## 7. Configuration & Infrastructure Weaknesses

### 7.1 Severity: HIGH — Environment Variable Exposure

**Finding:** Environment files containing secrets are tracked in git.

**Current `.gitignore`:**
```gitignore
# local env files
.env*.local
```

**Problem:** `.env.local`, `.env.vercel`, and `.env.vercel.production` were committed BEFORE the gitignore rule was added, and remain in git history.

**Required Actions:**
1. Remove files from git history using `git filter-branch` or BFG Repo-Cleaner
2. Rotate ALL exposed credentials immediately
3. Move secrets to Vercel Environment Variables UI

---

### 7.2 Severity: MEDIUM — Missing CORS Configuration

**Finding:** No explicit CORS policy configured in Next.js.

**Current State:**
```typescript
// next.config.ts - No CORS headers defined
const nextConfig = {
  images: {
    remotePatterns: [...] // Only image domains configured
  },
};
```

**Recommendation:**
```typescript
// Add to API routes
export async function OPTIONS(request: Request) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://yourdomain.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

---

### 7.3 Severity: MEDIUM — Missing Security Headers

**Finding:** No security headers configured in application.

**Missing Headers:**
| Header | Purpose | Status |
|--------|---------|--------|
| Content-Security-Policy | XSS prevention | ❌ Missing |
| Strict-Transport-Security | HTTPS enforcement | ⚠️ Vercel default |
| X-Frame-Options | Clickjacking prevention | ❌ Missing |
| X-Content-Type-Options | MIME sniffing prevention | ❌ Missing |
| Referrer-Policy | Referrer leakage prevention | ❌ Missing |
| Permissions-Policy | Feature restrictions | ❌ Missing |

**Recommended Configuration:**
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

### 7.4 Severity: LOW — HTTPS/TLS

**Finding:** Vercel enforces HTTPS by default, but no explicit HSTS configuration.

**Recommendation:** Add explicit HSTS header with long max-age:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

## 8. Data Protection & Privacy

### 8.1 Severity: HIGH — Sensitive Data Exposure

**Finding:** Personal information is collected and transmitted to third parties without explicit security controls.

**Data Collected:**
| Field | Destination | Encryption |
|-------|-------------|------------|
| Name | ActiveCampaign, Cal.com | TLS only |
| Email | ActiveCampaign, Cal.com | TLS only |
| Phone | Webhook, Cal.com | TLS only |
| Company | ActiveCampaign | TLS only |
| Message | ActiveCampaign | TLS only |
| Conversation History | Webhook | TLS only |

**Issues:**
- No at-rest encryption for local blog storage
- PII in logs (console.log statements)
- No data retention policy visible
- No user consent mechanism before data collection

---

### 8.2 Severity: MEDIUM — Encryption at Rest

**Finding:** Blog content stored in local JSON files without encryption.

**Location:** `/content/blog/*.json` or generated at runtime

**Risk:** If server is compromised, all blog content is immediately readable.

---

### 8.3 Severity: MEDIUM — Logging of Sensitive Information

**Finding:** Multiple instances of PII logging.

**Examples:**
```typescript
// Booking payload with user details logged
console.log("Sending to Cal.com:", JSON.stringify(calPayload, null, 2));

// Contact form submissions may be logged by default Next.js
```

**Recommendation:**
- Implement structured logging with PII redaction
- Use log levels appropriately
- Never log API keys, tokens, or passwords

---

## 9. OWASP Top 10 Mapping

| # | OWASP 2021 Category | Findings | Severity |
|---|---------------------|----------|----------|
| A01 | Broken Access Control | No authentication on APIs, IDOR in blog deletion, privilege escalation via username | CRITICAL |
| A02 | Cryptographic Failures | Secrets in version control, no encryption at rest | CRITICAL |
| A03 | Injection | Prompt injection risk, weak email validation | MEDIUM |
| A04 | Insecure Design | No rate limiting, missing security headers, no CSRF protection | HIGH |
| A05 | Security Misconfiguration | Environment files committed, missing CORS policy | HIGH |
| A06 | Vulnerable Components | No dependency scanning, recent React/Next versions | MEDIUM |
| A07 | Identification & Auth Failures | No user authentication system | HIGH |
| A08 | Software & Data Integrity Failures | No webhook signature verification, timing attack vulnerability | MEDIUM |
| A09 | Security Logging & Monitoring | PII in logs, no security event logging | MEDIUM |
| A10 | Server-Side Request Forgery | Limited risk (no user-controlled URLs in fetches) | LOW |

---

## 10. Risk Severity Table

| # | Issue | Severity | Impact | Likelihood | Affected Component |
|---|-------|----------|--------|------------|-------------------|
| 1 | API keys committed to git | CRITICAL | Complete service compromise | CERTAIN | `.env.local`, `.env.vercel*` |
| 2 | Unprotected `/api/seed` endpoint | CRITICAL | Data corruption, DoS | HIGH | `/app/api/seed/route.ts` |
| 3 | No authentication on API endpoints | HIGH | Unauthorized access | HIGH | All `/app/api/*` routes |
| 4 | Blog deletion without authorization | HIGH | Data loss | HIGH | `/app/api/blogs/route.ts` |
| 5 | Missing rate limiting | HIGH | DoS, cost accumulation | HIGH | All API endpoints |
| 6 | Privilege escalation via username | HIGH | Unauthorized calendar access | MEDIUM | `/lib/calBookingConfig.ts` |
| 7 | Console logging of sensitive data | MEDIUM | Information disclosure | MEDIUM | `/app/api/cal/book/route.ts` |
| 8 | Missing security headers | MEDIUM | XSS, clickjacking | MEDIUM | `next.config.ts` |
| 9 | Weak email validation | MEDIUM | Spam, injection | MEDIUM | `/app/api/contact/route.ts` |
| 10 | No CSRF protection | MEDIUM | Form hijacking | MEDIUM | All forms |
| 11 | Webhook secret timing attack | MEDIUM | Webhook hijacking | LOW | `/app/api/revalidate/route.ts` |
| 12 | Prompt injection risk | MEDIUM | AI manipulation | MEDIUM | `/app/api/chat/route.ts` |
| 13 | No dependency scanning | MEDIUM | Supply chain attack | LOW | `package.json` |
| 14 | PII in logs | MEDIUM | Privacy violation | MEDIUM | Multiple files |
| 15 | Source map exposure | LOW | Code disclosure | LOW | Build configuration |
| 16 | No encryption at rest | LOW | Data exposure if breached | LOW | Blog storage |

---

## 11. Recommendations & Mitigations

### 11.1 Immediate Actions (0-24 Hours)

**PRIORITY 1: Credential Rotation**
```bash
# 1. Rotate ALL exposed API keys:
- GitHub Personal Access Token → GitHub Settings → Developer Settings → Revoke & Regenerate
- ActiveCampaign API Key → Settings → Developer → API Access → Regenerate
- Cal.com API Keys (both) → Cal.com Settings → Security → API Keys → Revoke & Create New
- Make.com Webhook → Create new webhook, update references
- Vercel OIDC Token → Will auto-rotate, but verify

# 2. Change any exposed passwords:
- ADMIN_PASSWORD was set to "admin" - change if used anywhere
```

**PRIORITY 2: Remove Secrets from Git History**
```bash
# Option A: Using BFG Repo-Cleaner (recommended)
bfg --delete-files .env.local
bfg --delete-files .env.vercel
bfg --delete-files .env.vercel.production
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force

# Option B: Using git filter-branch
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local .env.vercel .env.vercel.production" \
  --prune-empty --tag-name-filter cat -- --all
```

**PRIORITY 3: Protect Seed Endpoint**
```typescript
// /app/api/seed/route.ts
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of seed logic
}
```

---

### 11.2 Short-Term Actions (1-7 Days)

**Authentication & Authorization:**
```typescript
// Implement API key validation middleware
// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/api/seed', '/api/blogs'];

  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

**Rate Limiting:**
```typescript
// Using Vercel KV for rate limiting
import { kv } from '@vercel/kv';

async function rateLimit(ip: string, limit: number, window: number) {
  const key = `rate-limit:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, window);
  }
  return count <= limit;
}
```

**Input Validation:**
```typescript
// Install zod: npm install zod
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  company: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

// Use in API route:
const result = contactSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: result.error.issues }, { status: 400 });
}
```

**Security Headers:**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.strapiapp.com; connect-src 'self' https://api.anthropic.com https://*.cal.com;"
          },
        ],
      },
    ];
  },
};
```

---

### 11.3 Long-Term Actions (1-4 Weeks)

**Implement Comprehensive Logging:**
```typescript
// /lib/logger.ts
import pino from 'pino';

const logger = pino({
  redact: ['email', 'password', 'apiKey', 'token', '*.email', '*.password'],
  level: process.env.LOG_LEVEL || 'info',
});

export default logger;
```

**Add Dependency Scanning:**
```json
// package.json
{
  "scripts": {
    "security:audit": "npm audit --audit-level=high",
    "security:scan": "snyk test"
  },
  "devDependencies": {
    "snyk": "^1.1290.0"
  }
}
```

**Implement CSRF Protection:**
```typescript
// For forms, use Next.js server actions with built-in protection
// Or implement custom CSRF tokens:
import { randomBytes } from 'crypto';

function generateCsrfToken() {
  return randomBytes(32).toString('hex');
}
```

**Add Webhook HMAC Verification:**
```typescript
import { createHmac, timingSafeEqual } from 'crypto';

function verifyWebhookSignature(payload: string, signature: string, secret: string) {
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

---

## 12. Final Security Verdict

### Production Readiness Assessment

| Criteria | Status | Notes |
|----------|--------|-------|
| Authentication | ❌ FAIL | No API authentication |
| Authorization | ❌ FAIL | No access controls |
| Input Validation | ⚠️ PARTIAL | Basic validation only |
| Secrets Management | ❌ FAIL | Secrets exposed in git |
| Security Headers | ❌ FAIL | Not configured |
| Rate Limiting | ❌ FAIL | Not implemented |
| Logging & Monitoring | ⚠️ PARTIAL | PII in logs |
| Dependency Security | ⚠️ PARTIAL | No scanning |

### Recommendation: **NO-GO for Production**

**This application is NOT ready for production deployment.**

The presence of exposed API credentials in version control represents an **immediate and ongoing security incident**. Until the following are addressed, the application should not be deployed to production:

#### Mandatory Before Production:

1. ✅ Rotate all exposed credentials
2. ✅ Remove secrets from git history
3. ✅ Implement authentication on sensitive API endpoints
4. ✅ Add rate limiting to all public endpoints
5. ✅ Configure security headers
6. ✅ Implement input validation with schema validation library
7. ✅ Remove console.log statements with sensitive data
8. ✅ Protect or disable `/api/seed` endpoint

#### Strongly Recommended:

- [ ] Implement comprehensive logging with PII redaction
- [ ] Add CSRF protection to forms
- [ ] Configure CORS policy explicitly
- [ ] Set up dependency scanning in CI/CD
- [ ] Conduct penetration testing
- [ ] Create incident response plan

---

## Appendix A: Files Requiring Immediate Attention

| File Path | Issue | Priority |
|-----------|-------|----------|
| `.env.local` | Contains exposed secrets | CRITICAL |
| `.env.vercel` | Contains OIDC token | CRITICAL |
| `.env.vercel.production` | Contains Cal API key | CRITICAL |
| `/app/api/seed/route.ts` | Unprotected endpoint | CRITICAL |
| `/app/api/blogs/route.ts` | No auth on DELETE | HIGH |
| `/app/api/cal/book/route.ts` | Console logging PII | HIGH |
| `/lib/calBookingConfig.ts` | Username-based key selection | HIGH |
| `/app/api/contact/route.ts` | Weak validation | MEDIUM |
| `/app/api/revalidate/route.ts` | Timing attack vulnerability | MEDIUM |
| `next.config.ts` | Missing security headers | MEDIUM |

---

## Appendix B: Security Testing Checklist

```markdown
Pre-Deployment Security Checklist:

[ ] All API keys rotated and stored in Vercel Environment Variables
[ ] Git history cleaned of sensitive data
[ ] All API endpoints require authentication or rate limiting
[ ] Security headers configured and verified
[ ] Input validation implemented on all endpoints
[ ] CORS policy explicitly configured
[ ] Source maps disabled in production
[ ] Console.log statements with sensitive data removed
[ ] Dependency audit shows no high/critical vulnerabilities
[ ] Penetration test completed (recommended)
```

---

**Report End**

*This assessment was conducted based on static code analysis. A comprehensive security evaluation should include dynamic testing, penetration testing, and review of infrastructure configurations.*
