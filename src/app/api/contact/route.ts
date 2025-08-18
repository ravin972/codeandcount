
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const sendgridTransport = require('nodemailer-sendgrid-transport');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, contactNumber, queryType, subject, message } = body;

    // --- Input Validation ---
    if (!name || !email || !queryType || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    // --- Environment Variable Check ---
    const receiver1 = process.env.RECEIVER_EMAIL_1;
    const receiver2 = process.env.RECEIVER_EMAIL_2;
    const emailUser = process.env.SMTP_USER;
    const emailPass = process.env.SMTP_PASS;

    if (!receiver1 || !receiver2 || !emailUser || !emailPass) {
      console.error("Server configuration error: One or more email-related environment variables are not set.");
      return NextResponse.json({ success: false, error: "Server configuration error. Could not send email." }, { status: 500 });
    }
    
    const receiverEmails = [receiver1, receiver2].join(', ');

    // --- Nodemailer Transport ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // --- Email to Site Owners ---
    const mailToOwner = {
      from: `"${name}" <${emailUser}>`, // Must be your Gmail
      replyTo: email,
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
          <p><strong>Inquiry Type:</strong> ${queryType}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    // --- Send Email ---
    try {
        await transporter.sendMail(mailToOwner);
    } catch (mailError) {
        console.error("Nodemailer failed to send email:", mailError);
        // This will give you the exact error from Gmail's server
        const errorMessage = mailError instanceof Error ? mailError.message : "Unknown mail error";
        return NextResponse.json({ success: false, error: `Mail server error: ${errorMessage}` }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    let errorMessage = "An unexpected server error occurred.";
    let errorDetails: any = {};

    if (error instanceof Error) {
        errorMessage = error.message;
        errorDetails.name = error.name;
        errorDetails.message = error.message;
        if ('code' in error) {
            // This is useful for Nodemailer-specific errors (e.g., 'EAUTH')
            errorDetails.code = (error as any).code;
        }
    } else {
        errorDetails.raw = error;
    }

    return NextResponse.json({ success: false, error: "Failed to send the email.", details: errorDetails }, { status: 500 });
  }
}
