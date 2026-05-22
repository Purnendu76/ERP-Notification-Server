import { mailTransporter } from "../config/mail";
import { newUserWelcomeEmail } from "../templates/newUserWelcomeEmail";

type SendNewUserEmailInput = {
  name: string;
  email: string;
  role: string;
  temporaryPassword?: string;
};

export async function sendNewUserWelcomeEmail({
  name,
  email,
  role,
  temporaryPassword,
}: SendNewUserEmailInput) {
  const loginUrl = `${process.env.FRONTEND_URL}/login`;

  const emailContent = newUserWelcomeEmail({
    name,
    email,
    role,
    loginUrl,
    temporaryPassword,
  });

  const fromEmail = process.env.MAIL_FROM_EMAIL && process.env.MAIL_FROM_EMAIL !
    ? process.env.MAIL_FROM_EMAIL
    : process.env.SMTP_USER;

  const info = await mailTransporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME }" <${fromEmail}>`,
    to: email,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  });

  return info;
}