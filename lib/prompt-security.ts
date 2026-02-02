/**
 * Prompt Injection Security Module
 *
 * SECURITY FEATURES:
 * - Detects common prompt injection patterns
 * - Sanitizes user input before sending to AI
 * - Logs suspicious activity
 *
 * NOTE: This is a defense-in-depth measure. Claude has built-in
 * resistance to prompt injection, but additional filtering helps.
 */

import { logWarn } from './logger';

/**
 * Patterns that may indicate prompt injection attempts
 */
const INJECTION_PATTERNS = [
  // Direct instruction overrides
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /forget\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/i,

  // System prompt extraction
  /what\s+(is|are)\s+(your|the)\s+(system\s+)?prompt/i,
  /show\s+(me\s+)?(your|the)\s+(system\s+)?prompt/i,
  /reveal\s+(your|the)\s+(system\s+)?prompt/i,
  /print\s+(your|the)\s+(system\s+)?prompt/i,
  /display\s+(your|the)\s+(system\s+)?prompt/i,
  /output\s+(your|the)\s+(initial|system)\s+(instructions?|prompt)/i,

  // Role manipulation
  /you\s+are\s+now\s+(?:a\s+)?(?:different|new|my)/i,
  /pretend\s+(to\s+be|you('re|'re| are))/i,
  /act\s+as\s+(if\s+)?(you('re|'re| are)|a)/i,
  /roleplay\s+as/i,
  /switch\s+to\s+(\w+)\s+mode/i,

  // Instruction injection markers
  /\[SYSTEM\]/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /<\|im_start\|>/i,
  /###\s*(instruction|system|human|assistant)/i,

  // Code/command injection attempts
  /```\s*(system|bash|sh|cmd|powershell)/i,
  /\$\{.*\}/,
  /exec\s*\(/i,
  /eval\s*\(/i,

  // Jailbreak phrases
  /dan\s+mode/i,
  /developer\s+mode/i,
  /jailbreak/i,
  /bypass\s+(safety|filter|restriction)/i,
  /unrestricted\s+mode/i,
];

/**
 * Suspicious phrases that warrant logging but not blocking
 */
const SUSPICIOUS_PATTERNS = [
  /tell\s+me\s+a\s+secret/i,
  /what\s+can('t|not)\s+you\s+(do|say|tell)/i,
  /override/i,
  /admin\s+(access|mode|command)/i,
];

export interface PromptSecurityResult {
  safe: boolean;
  sanitized: string;
  warnings: string[];
  blocked: boolean;
  reason?: string;
}

/**
 * Check if a message contains potential prompt injection
 */
export function checkPromptInjection(message: string): PromptSecurityResult {
  const warnings: string[] = [];
  let blocked = false;
  let reason: string | undefined;

  // Check for injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(message)) {
      blocked = true;
      reason = 'Message contains disallowed patterns';
      logWarn('Prompt injection attempt detected', {
        pattern: pattern.toString(),
        messageLength: message.length,
      });
      break;
    }
  }

  // Check for suspicious patterns (log but don't block)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(message)) {
      warnings.push(`Suspicious pattern detected: ${pattern.toString()}`);
      logWarn('Suspicious prompt pattern', {
        pattern: pattern.toString(),
        messageLength: message.length,
      });
    }
  }

  // Sanitize the message
  const sanitized = sanitizePrompt(message);

  return {
    safe: !blocked,
    sanitized: blocked ? '' : sanitized,
    warnings,
    blocked,
    reason,
  };
}

/**
 * Sanitize a prompt by removing potentially dangerous content
 */
function sanitizePrompt(message: string): string {
  let sanitized = message;

  // Remove control characters (except newlines and tabs)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  // Remove potential markdown injection for system-like blocks
  sanitized = sanitized.replace(/```\s*(system|assistant|instruction)[^`]*```/gi, '[removed]');

  // Remove XML-like tags that might be interpreted as instructions
  sanitized = sanitized.replace(/<\|[^|]+\|>/g, '');
  sanitized = sanitized.replace(/<<[A-Z]+>>/g, '');

  return sanitized;
}

/**
 * Wrap user message with additional context to reinforce boundaries
 */
export function wrapUserMessage(message: string): string {
  // Add a clear boundary marker
  return `User question: ${message}`;
}

/**
 * Check if a response might contain leaked system prompt content
 */
export function checkResponseLeak(response: string, systemPromptSnippets: string[]): boolean {
  const normalizedResponse = response.toLowerCase();

  for (const snippet of systemPromptSnippets) {
    if (snippet.length > 20 && normalizedResponse.includes(snippet.toLowerCase())) {
      logWarn('Potential system prompt leak detected in response');
      return true;
    }
  }

  return false;
}
