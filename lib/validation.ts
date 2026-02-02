import { z } from 'zod';

/**
 * Shared validation schemas for API endpoints
 *
 * SECURITY FEATURES:
 * - Strict email validation using Zod
 * - Maximum length enforcement
 * - Input sanitization helpers
 */

// ============================================================================
// Base Schemas
// ============================================================================

/**
 * Email validation schema with strict format checking
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(254, 'Email must be 254 characters or less')
  .transform((val) => val.toLowerCase().trim());

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name must be 100 characters or less')
  .transform((val) => val.trim());

/**
 * Phone validation schema (optional)
 */
export const phoneSchema = z
  .string()
  .max(30, 'Phone must be 30 characters or less')
  .regex(/^[\d\s\-\+\(\)\.]*$/, 'Invalid phone format')
  .transform((val) => val.trim())
  .optional()
  .nullable();

/**
 * Company validation schema
 */
export const companySchema = z
  .string()
  .max(200, 'Company must be 200 characters or less')
  .transform((val) => val.trim())
  .optional();

/**
 * Message validation schema
 */
export const messageSchema = z
  .string()
  .max(5000, 'Message must be 5000 characters or less')
  .transform((val) => val.trim())
  .optional();

// ============================================================================
// Form Schemas
// ============================================================================

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z.string().min(1, 'Company is required').max(200).transform((val) => val.trim()),
  phone: phoneSchema,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Lead capture form validation schema
 */
export const leadFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  conversationHistory: z
    .array(z.unknown())
    .max(50, 'Conversation history must have 50 entries or less')
    .optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * Blog creation validation schema
 */
export const blogSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less')
    .transform((val) => val.trim()),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(100000, 'Content must be 100,000 characters or less'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author must be 100 characters or less')
    .transform((val) => val.trim()),
});

export type BlogData = z.infer<typeof blogSchema>;

/**
 * Chat message validation schema
 */
export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or less')
    .transform((val) => val.trim()),
});

export type ChatMessageData = z.infer<typeof chatMessageSchema>;

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate data against a schema and return a standardized result
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map((err) => {
    const path = err.path.join('.');
    return path ? `${path}: ${err.message}` : err.message;
  });

  return { success: false, errors };
}

/**
 * Quick email validation check
 */
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

/**
 * Sanitize string input (trim and limit length)
 */
export function sanitizeString(input: string, maxLength: number): string {
  return input.trim().slice(0, maxLength);
}
