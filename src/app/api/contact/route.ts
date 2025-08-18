
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, contactNumber, queryType, subject, message } = body;

    // --- Input Validation ---
    if (!name || !email || !queryType || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    // --- Environment Variable Check ---
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver1 = process.env.RECEIVER_EMAIL_1;
    const receiver2 = process.env.RECEIVER_EMAIL_2;

    if (!user || !pass || !receiver1 || !receiver2) {
      console.error("Email credentials or receiver emails are not set in environment variables.");
      return NextResponse.json({ success: false, error: "Server configuration error. Could not send email." }, { status: 500 });
    }
    
    const receiverEmails = [receiver1, receiver2].join(', ');

    // --- Nodemailer Transport ---
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports like 587
      auth: {
        user: user,
        pass: pass,
      },
    });

    // --- Email to Site Owners ---
    const mailToOwner = {
      from: `"${name}" <${user}>`, // Must be your Gmail
      replyTo: email, // User's email, so admin can reply directly
      to: receiverEmails,
      subject: `Code&Count New Contact Form Submission: ${queryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Inquiry from Website</h2>
          <p>You have received a new message through your website's contact form.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${contactNumber ? `<p><strong>Contact Number:</strong> ${contactNumber}</p>` : ''}
          <p><strong>Topic:</strong> ${queryType}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    // --- Send Email ---
    await transporter.sendMail(mailToOwner);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, error: "Failed to send email.", details: errorMessage }, { status: 500 });
  }
}
