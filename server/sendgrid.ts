import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

// Debug the API key format
const apiKey = process.env.SENDGRID_API_KEY.trim();
console.log(`SendGrid API key starts with: "${apiKey.substring(0, 3)}" and has length: ${apiKey.length}`);

if (!apiKey.startsWith('SG.')) {
  console.error('SendGrid API key does not start with "SG." - check your key format');
}

const mailService = new MailService();
mailService.setApiKey(apiKey);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
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
  projectType: string;
  message: string;
}): Promise<boolean> {
  const emailContent = `
New contact form submission from your portfolio:

Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType}

Message:
${data.message}

---
This email was sent from your portfolio contact form.
  `.trim();

  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Project Type:</strong> ${data.projectType}</p>
    <h3>Message:</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
  `;

  return sendEmail({
    to: 'yagneshvora7@gmail.com',
    from: 'yagneshvora7@gmail.com', // Must be verified sender in SendGrid
    subject: `New Contact Form Message from ${data.name}`,
    text: emailContent,
    html: htmlContent,
  });
}