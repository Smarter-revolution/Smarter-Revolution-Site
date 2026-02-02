import { NextRequest, NextResponse } from "next/server";
import { syncContactToActiveCampaign, splitName } from "@/lib/activecampaign";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { contactFormSchema, validateData } from "@/lib/validation";
import { logError } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 requests per minute per IP)
    const rateLimit = checkRateLimit(request, RATE_LIMITS.contact);
    if (!rateLimit.success) {
      return rateLimit.error;
    }

    const body = await request.json();

    // Validate input using Zod schema
    const validation = validateData(contactFormSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, company, phone, message } = validation.data;
    const { firstName, lastName } = splitName(name);

    const result = await syncContactToActiveCampaign({
      email,
      firstName,
      lastName,
      phone: phone || undefined,
      company,
      message,
      tags: ["contact-form"],
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted successfully",
        contactId: result.contactId,
      },
      { status: 200 }
    );
  } catch (error) {
    logError(
      "Error processing contact submission",
      {},
      error instanceof Error ? error : new Error("Unknown error")
    );
    return NextResponse.json(
      { error: "Failed to process contact submission" },
      { status: 500 }
    );
  }
}
