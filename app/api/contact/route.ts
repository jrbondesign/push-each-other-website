import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Contact form submission received:", { name, subject })

    // Create mailto link format
    const emailBody = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Push Each Other to the Top podcast website contact form.
    `.trim()

    // In a production environment, you would use a service like Resend, SendGrid, or Nodemailer here
    // For now, we'll just log the submission and return success

    // Example with Resend (if you add the integration):
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@pusheachothertothetop.com',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contact Form: ${subject}`,
    //   text: emailBody,
    //   replyTo: email,
    // })

    console.log("[v0] Email submission logged")
    console.log("[v0] Email content:", emailBody)

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 })
  }
}
