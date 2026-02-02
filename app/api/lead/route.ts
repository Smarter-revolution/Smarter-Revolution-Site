import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

// Maximum lengths for input validation
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_CONVERSATION_LENGTH = 50;

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  conversationHistory?: unknown[];
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate lead form input
 */
function validateLeadInput(body: LeadPayload): ValidationResult {
  const { name, email, phone, conversationHistory } = body;

  // Required fields
  if (!name || !email) {
    return { valid: false, error: "Name and email are required" };
  }

  // Name validation
  if (typeof name !== 'string' || name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be ${MAX_NAME_LENGTH} characters or less` };
  }

  // Email validation
  if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be ${MAX_EMAIL_LENGTH} characters or less` };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Phone validation (optional)
  if (phone && (typeof phone !== 'string' || phone.length > MAX_PHONE_LENGTH)) {
    return { valid: false, error: `Phone must be ${MAX_PHONE_LENGTH} characters or less` };
  }

  // Conversation history validation (optional)
  if (conversationHistory) {
    if (!Array.isArray(conversationHistory)) {
      return { valid: false, error: "Conversation history must be an array" };
    }
    if (conversationHistory.length > MAX_CONVERSATION_LENGTH) {
      return { valid: false, error: `Conversation history must have ${MAX_CONVERSATION_LENGTH} entries or less` };
    }
  }

  return { valid: true };
}

/**
 * Send lead data to webhook
 */
async function sendToWebhook(webhookUrl: string, payload: object): Promise<boolean> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.ok;
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (10 requests per minute per IP)
    const rateLimit = checkRateLimit(request, RATE_LIMITS.lead);
    if (!rateLimit.success) {
      return rateLimit.error;
    }

    const body: LeadPayload = await request.json();

    // Validate input
    const validation = validateLeadInput(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Check webhook configuration
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("LEAD_WEBHOOK_URL environment variable is not set");
      return NextResponse.json(
        { error: "Lead capture service is not configured" },
        { status: 500 }
      );
    }

    // Prepare sanitized payload
    const webhookPayload = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      source: "faq-chat",
      conversation: body.conversationHistory?.slice(0, MAX_CONVERSATION_LENGTH) || [],
      timestamp: new Date().toISOString(),
    };

    // Send to webhook
    const success = await sendToWebhook(webhookUrl, webhookPayload);
    if (!success) {
      console.error("Webhook request failed");
      return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
    }

    console.log("Lead captured successfully at:", webhookPayload.timestamp);
    return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing lead:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to process lead submission" }, { status: 500 });
  }
}
