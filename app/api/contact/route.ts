import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("[v0] Contact API called")

  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Contact form data received:", { name, email, subject })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing required fields")
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY not configured")
      return NextResponse.json(
        {
          success: false,
          error: "Email service not configured. Please add RESEND_API_KEY environment variable.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Sending email via Resend...")

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Push Each Other to the Top <onboarding@resend.dev>", // Resend test email
        to: ["pusheachotherpod@gmail.com"],
        reply_to: email,
        subject: `Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Push Each Other to the Top podcast website contact form.
        `.trim(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Resend API error:", data)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully via Resend:", data.id)

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 })
  }
}
