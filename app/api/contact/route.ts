import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  console.log("[v0] Contact API called")

  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Contact form data received:", { name, email, subject })

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

    console.log("[v0] Initializing Resend client...")

    const resend = new Resend(RESEND_API_KEY)

    console.log("[v0] Sending email via Resend SDK...")

    const { data, error } = await resend.emails.send({
      from: "Push Each Other to the Top <onboarding@resend.dev>",
      to: ["pusheachotherpod@gmail.com"],
      reply_to: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p><em>This message was sent from the Push Each Other to the Top podcast website contact form.</em></p>
      `,
    })

    if (error) {
      console.error("[v0] Resend SDK error:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to send email. Please try again later.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully via Resend SDK:", data?.id)

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process message",
      },
      { status: 500 },
    )
  }
}
