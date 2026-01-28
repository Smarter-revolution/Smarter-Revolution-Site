import { NextRequest, NextResponse } from "next/server";
import { syncContactToActiveCampaign, splitName } from "@/lib/activecampaign";

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, company, phone, message } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
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
    console.error("Error processing contact:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process contact submission",
      },
      { status: 500 }
    );
  }
}
