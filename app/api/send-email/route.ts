// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(request: Request) {
    const { name, email, notes, meetingDateTime, companyName } = await request.json();

    if (!name || !email || !meetingDateTime) {
        return NextResponse.json({ error: 'Missing required fields: name, email, meetingDateTime' }, { status: 400 });
    }

    // --- Configure your Nodemailer transporter ---
    // You should store these credentials securely, e.g., in environment variables.
    // For production, never hardcode these.
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Function to create a professional-looking email body with an embedded logo
    // We now use a Content ID (cid) for the logo instead of a URL.
    const createEmailBody = (isClient: boolean, clientName: string, meetingDetails: string, company: string, logoCid: string, clientNotes?: string) => {
        // This is a professional-looking HTML email template with inline CSS for cross-client compatibility.
        // The logo is now embedded using a CID, making it reliable.
        const primaryColor = '#6a0dad'; // A deep purple for headers and accents
        const accentColor = '#3a53ff';  // A vibrant blue for links/buttons
        const bodyBgColor = '#f5f7fa';  // Light gray background
        const containerBgColor = '#ffffff'; // White container for content
        const textColor = '#333333';    // Main text color
        const headingFont = 'font-family: Arial, sans-serif; font-weight: 700;';
        const bodyFont = 'font-family: Arial, sans-serif; font-weight: 400;';

        // The image source now uses the 'cid' prefix
        const header = ``;

        const content = isClient
            ? `
        <h1 style="${headingFont} color: ${primaryColor}; font-size: 24px; text-align: center; margin-bottom: 20px;">Your Meeting is Confirmed!</h1>
        <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin-bottom: 20px;">
          Dear ${clientName},
        </p>
        <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin-bottom: 20px;">
          This email confirms your upcoming meeting with the ${company} team. We are excited to connect with you.
        </p>
        <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0;"><strong>Meeting Time:</strong> ${meetingDetails}</p>
          <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0; margin-top: 10px;"><strong>Meeting Link:</strong> A web conferencing link will be provided shortly.</p>
        </div>
      `
            : `
        <h1 style="${headingFont} color: ${primaryColor}; font-size: 24px; text-align: center; margin-bottom: 20px;">New Meeting Scheduled</h1>
        <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin-bottom: 20px;">
          A new meeting has been scheduled via your website with a potential client.
        </p>
        <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0;"><strong>Client Name:</strong> ${clientName}</p>
          <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0; margin-top: 10px;"><strong>Client Email:</strong> ${email}</p>
          <p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0; margin-top: 10px;"><strong>Meeting Time:</strong> ${meetingDetails}</p>
          ${clientNotes ? `<p style="${bodyFont} color: ${textColor}; font-size: 16px; margin: 0; margin-top: 10px;"><strong>Notes:</strong> ${clientNotes}</p>` : ''}
        </div>
      `;

        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${isClient ? 'Meeting Confirmation' : 'New Meeting Scheduled'}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${bodyBgColor};">
          <center style="width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
              <div style="max-width: 600px; background-color: ${containerBgColor}; padding: 40px; margin: 20px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  <!-- Logo -->
                  ${header}
                  <!-- Content -->
                  ${content}
                  <!-- Footer -->
                  <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px; text-align: center; color: #999999; font-size: 12px;">
                      <p style="${bodyFont} margin: 0;">Best regards,</p>
                      <p style="${bodyFont} margin: 0; font-weight: bold;">The ${company} Team</p>
                  </div>
              </div>
          </center>
      </body>
      </html>
    `;
    };

    // Note: Since we cannot access the user's file system, we are using a base64 encoded
    // white image data here to demonstrate the CID method. In a real application,
    // you would read the image from the file system.
    // Replace this with your actual image data if needed.
    const whitePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAAC3pMNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nGNgYGBgYGJkZGTUgwMDOxsbC8FpgoGDIyMjq0GAgYGJkYGDoyMnAwMDAz/BQA1tC2A2NlY2JkZWVlYmZlZWVgYGGhYGGgYGUgYGgAYAIw75j+m71FkAAAAASUVORK5CYII=';

    try {
        const formattedMeetingTime = meetingDateTime;
        const logoCid = 'company_logo';


        // --- Send email to your company ---
        const companyEmailBody = createEmailBody(false, name, formattedMeetingTime, companyName, logoCid, notes);
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: process.env.COMPANY_EMAIL,
            subject: `New Meeting Scheduled with ${name} - ${companyName}`,
            html: companyEmailBody,
         
        });

        // --- Send confirmation email to the client ---
        const clientEmailBody = createEmailBody(true, name, formattedMeetingTime, companyName, logoCid);
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Meeting Confirmation - ${companyName}`,
            html: clientEmailBody,
       
        });

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message || 'Error sending email' }, { status: 500 });
    }
}



