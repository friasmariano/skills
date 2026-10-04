
import SendEmailParams from "@/types/SendEmailParams";
import { transporter } from "./transporter";

export async function sendEmail({ to, subject, html, fromName, fromEmail }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"${fromName ?? "Mariano Frias"}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}