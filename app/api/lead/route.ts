import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { leadFormSchema, validateData } from "@/lib/validation";
import { logError, logInfo } from "@/lib/logger";

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

    const body = await request.json();

    // Validate input using Zod schema
    const validation = validateData(leadFormSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, conversationHistory } = validation.data;

    // Check webhook configuration
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      logError("LEAD_WEBHOOK_URL environment variable is not set");
      return NextResponse.json(
        { error: "Lead capture service is not configured" },
        { status: 500 }
      );
    }

    // Prepare sanitized payload
    const webhookPayload = {
      name,
      email,
      phone: phone || null,
      source: "faq-chat",
      conversation: conversationHistory || [],
      timestamp: new Date().toISOString(),
    };

    // Send to webhook
    const success = await sendToWebhook(webhookUrl, webhookPayload);
    if (!success) {
      logError("Webhook request failed");
      return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
    }

    logInfo("Lead captured successfully", { timestamp: webhookPayload.timestamp });
    return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 });

  } catch (error) {
    logError(
      "Error processing lead submission",
      {},
      error instanceof Error ? error : new Error("Unknown error")
    );
    return NextResponse.json({ error: "Failed to process lead submission" }, { status: 500 });
  }
}
