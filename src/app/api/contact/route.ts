
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, contactNumber, queryType, subject, message } = body;

    // --- Input Validation ---
    if (!name || !email || !queryType || !message || (queryType === "General Inquiry" && !subject)) {
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
      from: `"${name}" <${emailUser}>`,
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
          <p><strong>Topic:</strong> ${queryType}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>`: ''}
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };
    
    // --- Auto-reply Email to User ---
    const mailToUser = {
        from: `"CodeAndCount.com" <${emailUser}>`,
        to: email,
        subject: "We've Received Your Message!",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #1a73e8;">Thank You for Reaching Out!</h2>
            <p>Hello ${name},</p>
            <p>We've successfully received your message and appreciate you contacting us. One of our team members will review your inquiry and get back to you as soon as possible.</p>
            <p>Here's a copy of your message for your records:</p>
            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
                <p><strong>Topic:</strong> ${queryType}</p>
                 ${subject ? `<p><strong>Subject:</strong> ${subject}</p>`: ''}
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p>In the meantime, feel free to browse our <a href="https://codeandcount.com/work">work</a> or read our latest <a href="https://codeandcount.com/blog">blog posts</a>.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>The CodeAndCount.com Team</strong></p>
        </div>
        `,
    };

    // --- Send Emails ---
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToUser)
    ]);
    
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
