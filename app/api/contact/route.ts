import { NextRequest, NextResponse } from "next/server";

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL;
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY;

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

    // Check if ActiveCampaign credentials are configured
    if (!AC_API_URL || !AC_API_KEY) {
      console.error("ActiveCampaign environment variables are not set");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    // Prepare ActiveCampaign contact payload
    const contactPayload = {
      contact: {
        email: email.trim(),
        firstName: firstName,
        lastName: lastName,
        phone: phone?.trim() || "",
        fieldValues: [
          {
            field: "1", // Company field - may need to adjust field ID
            value: company.trim(),
          },
          ...(message
            ? [
                {
                  field: "2", // Message field - may need to adjust field ID
                  value: message.trim(),
                },
              ]
            : []),
        ],
      },
    };

    // Create or update contact in ActiveCampaign
    const acResponse = await fetch(`${AC_API_URL}/api/3/contact/sync`, {
      method: "POST",
      headers: {
        "Api-Token": AC_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    if (!acResponse.ok) {
      const errorData = await acResponse.text();
      console.error(
        "ActiveCampaign API error:",
        acResponse.status,
        errorData
      );
      return NextResponse.json(
        { error: "Failed to submit contact" },
        { status: 500 }
      );
    }

    const acData = await acResponse.json();
    console.log("Contact synced to ActiveCampaign:", {
      email,
      contactId: acData.contact?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted successfully",
        contactId: acData.contact?.id
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
