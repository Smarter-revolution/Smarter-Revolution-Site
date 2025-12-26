import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, conversationHistory } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
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

    // Check if webhook URL is configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("LEAD_WEBHOOK_URL environment variable is not set");
      return NextResponse.json(
        { error: "Webhook configuration error" },
        { status: 500 }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      source: "faq-chat",
      conversation: conversationHistory || [],
      timestamp: new Date().toISOString(),
    };

    // Send to webhook
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        console.error(
          "Webhook error:",
          webhookResponse.status,
          webhookResponse.statusText,
          errorText
        );
        return NextResponse.json(
          { error: "Failed to send lead to webhook" },
          { status: 500 }
        );
      }

      console.log("Lead sent to webhook successfully:", {
        name,
        email,
        timestamp: webhookPayload.timestamp,
      });

      return NextResponse.json(
        { message: "Lead captured successfully" },
        { status: 200 }
      );
    } catch (webhookError) {
      console.error("Error calling webhook:", webhookError);
      return NextResponse.json(
        {
          error:
            webhookError instanceof Error
              ? webhookError.message
              : "Failed to send lead to webhook",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process lead submission",
      },
      { status: 500 }
    );
  }
}

