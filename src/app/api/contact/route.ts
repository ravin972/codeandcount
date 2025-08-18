
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
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const receiver1 = process.env.RECEIVER_EMAIL_1;
    const receiver2 = process.env.RECEIVER_EMAIL_2;

    if (!sendgridApiKey || !receiver1 || !receiver2) {
      console.error("SendGrid API Key or receiver emails are not set in environment variables.");
      return NextResponse.json({ success: false, error: "Server configuration error. Could not send email." }, { status: 500 });
    }
    
    const receiverEmails = [receiver1, receiver2].join(', ');

    // --- Nodemailer Transport (using SendGrid) ---
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: sendgridApiKey
        }
    }));


    // --- Email to Site Owners ---
    const mailToOwner = {
      from: `"${name}" <${receiver1}>`, // Using one of your verified sender emails
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
    try {
        await transporter.sendMail(mailToOwner);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (mailError) {
        console.error("Nodemailer sendMail failed:", mailError);
        let errorDetails: any = { message: "Failed to send email due to a mail server issue." };
        if (mailError instanceof Error) {
            errorDetails.name = mailError.name;
            errorDetails.message = mailError.message;
            if ('code' in mailError) {
                errorDetails.code = (mailError as any).code;
            }
        } else {
            errorDetails.raw = mailError;
        }
        return NextResponse.json({ success: false, error: "Mail-sending operation failed.", details: errorDetails }, { status: 500 });
    }

  } catch (error) {
    console.error("Contact API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, error: "Failed to process the request.", details: errorMessage }, { status: 500 });
  }
}
