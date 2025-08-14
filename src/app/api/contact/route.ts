
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, queryType, message } = body;

    // Input validation
    if (!name || !email || !message || !queryType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // WARNING: Storing credentials in environment variables is crucial for security.
    // Do not hard-code them in the source code.
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.RECEIVER_EMAIL;

    if (!user || !pass || !receiver) {
      console.error("Email credentials are not set in environment variables.");
      return NextResponse.json({ error: "Server configuration error. Could not send email." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Email to you (the site owner)
    const mailToOwner = {
      from: `"${name}" <${email}>`, // Use user's name and email as sender
      to: receiver,
      subject: `New Contact Form Submission: ${queryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Inquiry from CodeAndCount.com</h2>
          <p>You have received a new message through your website's contact form.</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Query Type:</strong> ${queryType}</p>
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to the user
    const mailToUser = {
      from: `"CodeAndCount Team" <${receiver}>`,
      to: email,
      subject: "We've Received Your Message!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Thank You, ${name}!</h2>
          <p>We've successfully received your message and appreciate you reaching out to CodeAndCount.com.</p>
          <p>One of our team members will review your inquiry and get back to you as soon as possible.</p>
          <hr>
          <p style="font-size: 0.9em; color: #555;"><strong>Your Submitted Message:</strong></p>
          <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; font-style: italic;">
             <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p>Best regards,<br/><strong>The CodeAndCount Team</strong></p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    // In case of a nodemailer error, it might have more specific info
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: "Failed to send email.", details: errorMessage }, { status: 500 });
  }
}
