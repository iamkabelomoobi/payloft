import * as nodemailer from "nodemailer";

/**
 * Email service configuration for MailHog
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: parseInt(process.env.SMTP_PORT || "1025"),
    secure: false,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASSWORD
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
        : undefined,
    tls: {
      rejectUnauthorized: false,
    },
  });
};



/**
 * Send email using MailHog
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<boolean> {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@payloft.com",
      to,
      subject,
      html,
      text:
        text ||
        html
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<\/p>/gi, "\n\n")
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
