import { MailService } from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email notifications will be disabled.");
}

const mailService = new MailService();
if (apiKey) {
  mailService.setApiKey(apiKey);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string | undefined;
  html?: string | undefined;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!apiKey) {
    console.warn("Attempted to send email but SENDGRID_API_KEY is not set.");
    return false;
  }
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || undefined,
      html: params.html || undefined,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Contact form notification email template
export async function sendContactFormNotification(data: {
  name: string;
  email: string;
  projectType: string | null;
  message: string;
}): Promise<boolean> {
  const emailContent = `
Hello Yagnesh,

You have received a new contact form submission through your portfolio website.

CONTACT DETAILS:
Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType || 'Not specified'}

MESSAGE:
${data.message}

---
You can reply directly to this email to respond to ${data.name}.
Portfolio Contact Form | Yagnesh Vora UX Design
  `.trim();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #1e293b; margin: 0;">New Portfolio Inquiry</h1>
        <p style="color: #64748b; margin: 5px 0 0 0;">Contact Form Submission</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1e293b; font-size: 18px; margin-bottom: 15px;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #374151; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #1f2937;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #374151; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #374151; font-weight: bold;">Project Type:</td>
            <td style="padding: 8px 0; color: #1f2937;">${data.projectType || 'Not specified'}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1e293b; font-size: 18px; margin-bottom: 15px;">Message</h2>
        <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
          <p style="margin: 0; line-height: 1.6; color: #374151;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          This email was sent from your portfolio contact form<br>
          <strong>Yagnesh Vora</strong> | UX Designer & Creative Professional
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: 'yagneshvora7@gmail.com',
    from: 'Yagnesh Vora Portfolio <yagneshvora7@gmail.com>', // Professional sender name
    subject: `Portfolio Inquiry from ${data.name} - ${data.projectType || 'New Project'}`,
    text: emailContent,
    html: htmlContent,
  });
}