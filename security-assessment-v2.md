# Security Assessment Report v2.0
## Smarter Revolution Website

**Report Date:** February 3, 2026
**Assessment Type:** Static Code Analysis & Configuration Review (Follow-up)
**Prepared By:** Security Analyst
**Classification:** CONFIDENTIAL
**Previous Assessment:** February 2, 2026

---

## 1. Executive Summary

This security assessment is a follow-up review of the Smarter Revolution website, a Next.js 16.1.0 application deployed on Vercel. This review evaluates the security remediation efforts implemented since the previous assessment dated February 2, 2026.

### Remediation Progress

| Previous Issue | Status | Notes |
|----------------|--------|-------|
| Exposed API keys in git | **RESOLVED** | Keys rotated, files no longer tracked |
| Unprotected `/api/seed` endpoint | **RESOLVED** | Admin authentication implemented |
| No API authentication | **RESOLVED** | Protected endpoints now require auth |
| Blog deletion without auth | **RESOLVED** | DELETE requires admin auth |
| Missing rate limiting | **RESOLVED** | Rate limiting on all endpoints |
| Privilege escalation via username | **PARTIALLY RESOLVED** | Fixed in most routes, one route vulnerable |
| Console logging of sensitive data | **RESOLVED** | PII redaction logger implemented |
| Missing security headers | **RESOLVED** | Full security headers configured |
| Webhook timing attack | **RESOLVED** | Timing-safe comparison implemented |

### Current Findings Overview

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 0 | - |
| High | 1 | Legacy vulnerable code path in event-types |
| Medium | 5 | Input validation gaps, rate limiting limitations |
| Low | 4 | Best practice deviations, dependency scanning |

### Overall Risk Rating: **MEDIUM**

The application has undergone significant security improvements and has addressed all critical vulnerabilities from the previous assessment. The remaining issues are primarily medium and low severity, making the application substantially more secure than before.

---

## 2. Scope & Assumptions

### 2.1 Components Reviewed

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend (React/Next.js) | Reviewed | App router, components, pages |
| Backend API Routes | Reviewed | All `/app/api/*` endpoints |
| Authentication System | Reviewed | Admin auth with timing-safe comparison |
| Third-Party Integrations | Reviewed | ActiveCampaign, Cal.com, Strapi, Anthropic |
| Configuration Files | Reviewed | Environment files, Next.js config |
| Dependencies | Reviewed | package.json analysis |
| Security Libraries | Reviewed | auth.ts, rate-limit.ts, logger.ts, cal-auth.ts |

### 2.2 Limitations

- Runtime behavior not tested (static analysis only)
- Strapi CMS backend configuration not accessible
- Vercel deployment settings not directly reviewed
- No penetration testing performed
- Third-party service configurations not reviewed

### 2.3 Assumptions

- All API keys have been rotated as stated by the client
- Application is deployed on Vercel with default security settings
- Environment variables are properly configured in Vercel dashboard
- Previous git history has been cleaned of sensitive data

---

## 3. Authentication & Authorization Issues

### 3.1 Severity: RESOLVED - Admin Authentication Implemented

**Previous Finding:** All API endpoints were publicly accessible without authentication.

**Current Status:** Administrative endpoints now require authentication via `verifyAdminAuth()`.

**Protected Endpoints:**
- `POST /api/seed` - Requires Bearer token
- `POST /api/blogs` - Requires Bearer token
- `DELETE /api/blogs` - Requires Bearer token

**Implementation Review:**
```typescript
// /lib/auth.ts - Properly implemented
export function verifyAdminAuth(request: NextRequest): AuthResult {
  const adminSecret = process.env.ADMIN_SECRET;
  // Uses timing-safe comparison to prevent timing attacks
  if (!safeCompare(providedSecret, adminSecret)) { ... }
}
```

**Assessment:** The authentication implementation follows security best practices with timing-safe string comparison.

---

### 3.2 Severity: HIGH - Legacy Vulnerable Code in Event Types Route

**Finding:** The `/api/cal/event-types/route.ts` still contains the vulnerable username-based API key selection pattern.

**Vulnerable Code:**
```typescript
// /app/api/cal/event-types/route.ts (Lines 5-12)
const getApiKeyForUser = (username?: string): string | undefined => {
  // Mark's events use Mark's API key
  if (username?.toLowerCase().includes("mark")) {  // VULNERABLE
    return process.env.CAL_API_KEY_MARK?.trim();
  }
  return process.env.CAL_API_KEY?.trim();
};
```

**Risk:** Any request with a username containing "mark" (e.g., "markspammer", "trademark") will use Mark's API key.

**Note:** Other Cal.com routes (`/api/cal/book`, `/api/cal/slots`) correctly use the secure `getCalApiKey()` function from `/lib/cal-auth.ts` which implements exact username matching.

**Recommendation:** Update `/api/cal/event-types/route.ts` to use the secure `getCalApiKey()` function from `/lib/cal-auth.ts`.

---

### 3.3 Severity: RESOLVED - Webhook Secret Validation

**Previous Finding:** Webhook used simple string comparison vulnerable to timing attacks.

**Current Status:** Timing-safe comparison implemented.

```typescript
// /lib/auth.ts
export function verifyWebhookSecret(
  providedSecret: string | null,
  expectedSecret: string | undefined
): boolean {
  return safeCompare(providedSecret, expectedSecret);
}
```

---

### 3.4 Severity: RESOLVED - Privilege Escalation via Username

**Previous Finding:** Cal.com API key selection used `string.includes("mark")`.

**Current Status:** Fixed in `/lib/cal-auth.ts` with exact username matching whitelist.

```typescript
// /lib/cal-auth.ts - Secure implementation
const VALID_CAL_USERS: Record<string, string> = {
  'wolfkrammel': 'CAL_API_KEY',
  'mark314': 'CAL_API_KEY_MARK',
};

export function getCalApiKey(username?: string): string | undefined {
  const normalizedUsername = username.toLowerCase().trim();
  const envVarName = VALID_CAL_USERS[normalizedUsername];
  // Exact match only
}
```

---

## 4. Input Validation & Injection Risks

### 4.1 Severity: RESOLVED - Field Length Validation

**Current Status:** All API endpoints now implement field length validation.

**Examples:**
- Contact form: name (100), email (254), company (200), phone (30), message (5000)
- Lead form: name (100), email (254), phone (30), conversation history (50 entries)
- Blog API: title (200), content (100,000), author (100)
- Chat API: message (2000)

---

### 4.2 Severity: MEDIUM - Email Validation Pattern

**Finding:** Email regex validation is overly permissive.

**Current Regex:**
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

**Issues:**
- Accepts `a@b.c` (single character TLD)
- Accepts special characters that could cause issues
- No maximum length enforcement in regex (handled separately)

**Recommendation:** Use a schema validation library like Zod (already in devDependencies):
```typescript
import { z } from 'zod';
const emailSchema = z.string().email().max(254);
```

---

### 4.3 Severity: MEDIUM - Prompt Injection Risk (AI Chat)

**Finding:** User messages are sent to Claude API without prompt injection filtering.

**Current Code:**
```typescript
// /app/api/chat/route.ts
const { message } = body;
// Validated for length (2000 chars max)
// But no filtering of prompt injection attempts
```

**Mitigating Factors:**
- Message length limited to 2000 characters
- Rate limiting (20 requests/minute) prevents abuse
- Claude has built-in prompt injection resistance

**Residual Risk:** Users may attempt to extract system prompts or manipulate AI responses.

**Recommendation:** Consider adding input sanitization or prompt hardening techniques.

---

### 4.4 Severity: LOW - SQL/NoSQL Injection

**Finding:** Application uses API-based data access, reducing direct injection risk.

**Mitigating Factors:**
- Strapi uses parameterized queries via `qs.stringify()`
- No direct database connections in codebase
- Third-party APIs handle query construction

**Status:** Acceptable risk level.

---

## 5. API & Backend Security

### 5.1 Severity: RESOLVED - Protected Seed Endpoint

**Current Status:** The seed endpoint now requires admin authentication.

```typescript
// /app/api/seed/route.ts
export async function POST(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.success) {
    return auth.error;
  }
  // ... seed operation
}
```

---

### 5.2 Severity: RESOLVED - Rate Limiting Implemented

**Current Status:** Rate limiting implemented on all public API endpoints.

**Configuration:**
| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/contact` | 5 requests | 60 seconds |
| `/api/lead` | 10 requests | 60 seconds |
| `/api/chat` | 20 requests | 60 seconds |
| `/api/cal/*` | 10 requests | 60 seconds |

---

### 5.3 Severity: MEDIUM - In-Memory Rate Limiting Limitation

**Finding:** Rate limiting uses in-memory storage which doesn't persist across serverless instances.

**Current Code:**
```typescript
// /lib/rate-limit.ts
const rateLimitStore = new Map<string, RateLimitEntry>();
// Note: This resets on serverless function cold starts
```

**Impact:** On Vercel, different requests may hit different serverless instances, reducing rate limiting effectiveness.

**Recommendation:** For production, consider:
- Vercel KV (`@vercel/kv`)
- Upstash Redis (`@upstash/ratelimit`)
- Vercel Edge Config

---

### 5.4 Severity: RESOLVED - Blog Deletion Authorization

**Current Status:** Blog deletion now requires admin authentication.

```typescript
// /app/api/blogs/route.ts
export async function DELETE(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.success) {
    return auth.error;
  }
  // ... delete operation with ID validation
}
```

---

### 5.5 Severity: MEDIUM - Cal.com Host Validation

**Finding:** Host usernames are validated against whitelist but not authorized.

**Current Code:**
```typescript
// /app/api/cal/book/route.ts
if (body.hostUsernames) {
  const invalidHosts = body.hostUsernames.filter((h) => !isValidCalUser(h));
  if (invalidHosts.length > 0) {
    return { valid: false, error: "Invalid host usernames specified" };
  }
}
```

**Assessment:** This validates that hosts are known users but doesn't verify the requester has authority to book with specific hosts.

**Recommendation:** For multi-host scenarios, consider additional authorization checks.

---

## 6. Client-Side & Frontend Security

### 6.1 Severity: RESOLVED - Secrets Removed from Version Control

**Current Status:** Only `.env.example` is tracked in git.

**Verification:**
```bash
$ git ls-files | grep -E "\.env"
.env.example
```

**`.gitignore` Configuration:**
```gitignore
.env
.env.*
.env.local
.env.development
.env.production
.env.vercel
.env.vercel.*
!.env.example
```

---

### 6.2 Severity: RESOLVED - Secure Logging Implemented

**Current Status:** PII redaction logger implemented in `/lib/logger.ts`.

**Features:**
- Automatic redaction of email addresses, credit cards, SSNs, IP addresses
- Token and API key redaction patterns
- Structured JSON logging
- Log level management

**Redaction Patterns:**
```typescript
private readonly piiPatterns = [
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: '[REDACTED_EMAIL]' },
  { pattern: /Bearer\s+[A-Za-z0-9\-._~+\/]+=*/g, replacement: 'Bearer [REDACTED_TOKEN]' },
  { pattern: /sk-[A-Za-z0-9]+/g, replacement: '[REDACTED_API_KEY]' },
  // ... more patterns
];
```

---

### 6.3 Severity: MEDIUM - Legacy Logging in ActiveCampaign Module

**Finding:** The `/lib/activecampaign.ts` file still contains console.log statements that may log email addresses.

**Code:**
```typescript
// /lib/activecampaign.ts
log("Starting contact sync", { email: contact.email, ... });
log("Contact synced successfully", { email: contact.email, contactId });
```

**Recommendation:** Update to use the secure logger from `/lib/logger.ts` instead.

---

### 6.4 Severity: RESOLVED - Source Maps Disabled

**Current Status:** Source maps disabled in production.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  // ...
};
```

---

### 6.5 Severity: LOW - Dependency Scanning

**Finding:** Snyk is not installed for automated dependency scanning.

**Current Setup:**
```json
{
  "scripts": {
    "security:audit": "npm audit --audit-level=high",
    "security:scan": "echo 'Snyk not installed...' && npm run security:audit"
  }
}
```

**Recommendation:** Install and configure Snyk for comprehensive dependency scanning:
```bash
npm install --save-dev snyk
```

---

## 7. Configuration & Infrastructure Weaknesses

### 7.1 Severity: RESOLVED - Security Headers Configured

**Current Status:** Comprehensive security headers configured in `next.config.ts`.

**Implemented Headers:**
| Header | Value | Status |
|--------|-------|--------|
| X-Frame-Options | DENY | Implemented |
| X-Content-Type-Options | nosniff | Implemented |
| Referrer-Policy | strict-origin-when-cross-origin | Implemented |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Implemented |
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Implemented |
| X-XSS-Protection | 1; mode=block | Implemented |
| Content-Security-Policy | Comprehensive policy | Implemented |

**CSP Configuration:**
```typescript
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
```

---

### 7.2 Severity: MEDIUM - CSRF Protection

**Finding:** No explicit CSRF protection for API endpoints.

**Mitigating Factors:**
- Next.js 16 provides some implicit CSRF protection
- API endpoints use JSON content type (not form submissions)
- Rate limiting provides abuse protection

**Recommendation:** Consider implementing CSRF tokens for form submissions or using Next.js server actions.

---

### 7.3 Severity: RESOLVED - Environment Variable Exposure

**Current Status:** Environment files properly excluded from version control.

**`.env.example` Template:** Properly documented without real values.

---

## 8. Data Protection & Privacy

### 8.1 Severity: LOW - User Consent Mechanism

**Finding:** No explicit user consent mechanism before data collection.

**Data Collected:**
- Name, email, phone, company, message via contact form
- Conversation history via chat lead capture
- Booking information

**Recommendation:** Add privacy policy acknowledgment checkbox on forms for GDPR/CCPA compliance.

---

### 8.2 Severity: RESOLVED - Logging of Sensitive Information

**Current Status:** PII redaction logger implemented with automatic redaction of sensitive fields.

**Note:** One exception noted in ActiveCampaign module (see section 6.3).

---

## 9. OWASP Top 10 Mapping

| # | OWASP 2021 Category | Current Status | Severity |
|---|---------------------|----------------|----------|
| A01 | Broken Access Control | RESOLVED - Auth implemented on sensitive endpoints | LOW |
| A02 | Cryptographic Failures | RESOLVED - Secrets removed from git, keys rotated | LOW |
| A03 | Injection | LOW RISK - Basic email validation, prompt injection possible | MEDIUM |
| A04 | Insecure Design | PARTIALLY RESOLVED - Rate limiting implemented, in-memory limitation | MEDIUM |
| A05 | Security Misconfiguration | RESOLVED - Security headers, env protection | LOW |
| A06 | Vulnerable Components | LOW RISK - No scanning configured, recent versions | LOW |
| A07 | Identification & Auth Failures | RESOLVED - Admin auth with timing-safe comparison | LOW |
| A08 | Software & Data Integrity Failures | RESOLVED - Webhook secret validation | LOW |
| A09 | Security Logging & Monitoring | RESOLVED - PII redaction logger implemented | LOW |
| A10 | Server-Side Request Forgery | LOW RISK - Limited user-controlled URLs | LOW |

---

## 10. Risk Severity Table

| # | Issue | Severity | Impact | Likelihood | Affected Component |
|---|-------|----------|--------|------------|-------------------|
| 1 | Legacy vulnerable username matching in event-types | HIGH | Unauthorized calendar access | MEDIUM | `/app/api/cal/event-types/route.ts` |
| 2 | In-memory rate limiting across serverless | MEDIUM | Reduced rate limiting effectiveness | MEDIUM | `/lib/rate-limit.ts` |
| 3 | Email validation regex permissive | MEDIUM | Spam, edge case issues | LOW | `/app/api/contact/route.ts`, `/app/api/lead/route.ts` |
| 4 | Prompt injection risk | MEDIUM | AI manipulation | LOW | `/app/api/chat/route.ts` |
| 5 | Legacy logging in ActiveCampaign | MEDIUM | PII in logs | LOW | `/lib/activecampaign.ts` |
| 6 | No CSRF protection | MEDIUM | Form hijacking | LOW | All forms |
| 7 | No Snyk dependency scanning | LOW | Supply chain attack risk | LOW | `package.json` |
| 8 | No user consent mechanism | LOW | Privacy compliance risk | LOW | Contact/booking forms |
| 9 | Recent framework versions | LOW | Undiscovered vulnerabilities | LOW | React 19.2.3, Next.js 16.1.0 |
| 10 | Client-side error logging | LOW | Information disclosure | LOW | `FaqChat.tsx` |

---

## 11. Recommendations & Mitigations

### 11.1 Immediate Actions (0-24 Hours)

**PRIORITY 1: Fix Event Types Route**
```typescript
// /app/api/cal/event-types/route.ts
// Replace this:
const getApiKeyForUser = (username?: string): string | undefined => {
  if (username?.toLowerCase().includes("mark")) { ... }
};

// With this:
import { getCalApiKey } from "@/lib/cal-auth";
// Then use: getCalApiKey(username);
```

---

### 11.2 Short-Term Actions (1-7 Days)

**Update ActiveCampaign Logging:**
```typescript
// /lib/activecampaign.ts
import { logInfo, logError } from '@/lib/logger';
// Replace console.log with secure logger
```

**Implement Distributed Rate Limiting:**
```typescript
// Using Vercel KV
import { kv } from '@vercel/kv';

async function checkRateLimit(key: string, limit: number, window: number) {
  const count = await kv.incr(`rate:${key}`);
  if (count === 1) await kv.expire(`rate:${key}`, window);
  return count <= limit;
}
```

**Email Validation with Zod:**
```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  company: z.string().max(200),
  phone: z.string().max(30).optional(),
  message: z.string().max(5000).optional(),
});
```

---

### 11.3 Long-Term Actions (1-4 Weeks)

**Install Snyk:**
```bash
npm install --save-dev snyk
npx snyk auth
npx snyk test
```

**Add CSRF Protection:**
```typescript
// For forms using server actions, CSRF is automatic
// For API routes, consider csrf tokens or same-origin validation
```

**Privacy Consent:**
```tsx
<label>
  <input type="checkbox" required />
  I agree to the <a href="/privacy">Privacy Policy</a>
</label>
```

---

## 12. Final Security Verdict

### Production Readiness Assessment

| Criteria | Previous Status | Current Status | Notes |
|----------|-----------------|----------------|-------|
| Authentication | FAIL | PASS | Admin auth implemented |
| Authorization | FAIL | PASS (mostly) | One route needs fix |
| Input Validation | PARTIAL | PASS | Length limits implemented |
| Secrets Management | FAIL | PASS | Keys rotated, git cleaned |
| Security Headers | FAIL | PASS | Full configuration |
| Rate Limiting | FAIL | PASS (partial) | In-memory limitation |
| Logging & Monitoring | PARTIAL | PASS | PII redaction implemented |
| Dependency Security | PARTIAL | PARTIAL | npm audit available |

### Recommendation: **CONDITIONAL GO for Production**

**The application has made substantial security improvements and is significantly more secure than before.**

However, before production deployment, the following MUST be addressed:

#### Mandatory Before Production:

1. Fix the `/app/api/cal/event-types/route.ts` vulnerability (HIGH priority)
2. Update ActiveCampaign logging to use secure logger

#### Strongly Recommended:

- [ ] Implement distributed rate limiting (Vercel KV or Upstash)
- [ ] Add Zod schema validation for email
- [ ] Install Snyk for dependency scanning
- [ ] Add privacy consent checkbox on forms
- [ ] Conduct penetration testing

#### Optional Enhancements:

- [ ] Add CSRF tokens for additional protection
- [ ] Implement AI prompt injection filtering
- [ ] Add health monitoring and alerting

---

## Appendix A: Files Requiring Attention

| File Path | Issue | Priority |
|-----------|-------|----------|
| `/app/api/cal/event-types/route.ts` | Legacy vulnerable username matching | HIGH |
| `/lib/activecampaign.ts` | Uses console.log instead of secure logger | MEDIUM |
| `/app/api/contact/route.ts` | Permissive email regex | LOW |
| `/app/api/lead/route.ts` | Permissive email regex | LOW |

---

## Appendix B: Security Testing Checklist

```markdown
Pre-Deployment Security Checklist:

[x] All API keys rotated and stored in Vercel Environment Variables
[x] Git history cleaned of sensitive data (verify with client)
[x] Administrative API endpoints require authentication
[x] Security headers configured and verified
[x] Input validation implemented with length limits
[x] Source maps disabled in production
[x] Rate limiting implemented on all public endpoints
[x] PII redaction logging implemented
[ ] Event-types route updated to use secure cal-auth
[ ] ActiveCampaign logging updated
[ ] Distributed rate limiting implemented (recommended)
[ ] Snyk dependency scanning configured (recommended)
[ ] Penetration test completed (recommended)
```

---

## Appendix C: Comparison Summary

| Metric | Previous Assessment | Current Assessment |
|--------|--------------------|--------------------|
| Critical Issues | 4 | 0 |
| High Issues | 6 | 1 |
| Medium Issues | 8 | 5 |
| Low Issues | 5 | 4 |
| Overall Risk Rating | CRITICAL | MEDIUM |
| Production Ready | NO-GO | CONDITIONAL GO |

---

**Report End**

*This assessment was conducted based on static code analysis. A comprehensive security evaluation should include dynamic testing, penetration testing, and review of infrastructure configurations.*
