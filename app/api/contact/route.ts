import { NextRequest, NextResponse } from "next/server";
import { syncContactToActiveCampaign, splitName } from "@/lib/activecampaign";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 requests per minute per IP)
    const rateLimit = checkRateLimit(request, RATE_LIMITS.contact);
    if (!rateLimit.success) {
      return rateLimit.error;
    }

    const body: ContactPayload = await request.json();
    const { name, email, company, phone, message } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    // Validate field lengths to prevent abuse
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or less" },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email must be 254 characters or less" },
        { status: 400 }
      );
    }

    if (company.length > 200) {
      return NextResponse.json(
        { error: "Company must be 200 characters or less" },
        { status: 400 }
      );
    }

    if (phone && phone.length > 30) {
      return NextResponse.json(
        { error: "Phone must be 30 characters or less" },
        { status: 400 }
      );
    }

    if (message && message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be 5000 characters or less" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { firstName, lastName } = splitName(name);

    const result = await syncContactToActiveCampaign({
      email,
      firstName,
      lastName,
      phone,
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
    // Log error without exposing full details
    console.error("Error processing contact:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to process contact submission" },
      { status: 500 }
    );
  }
}
