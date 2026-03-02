import dotenv from "dotenv";
import nodemailer from "nodemailer";import { verifyAccountTemplate, forgotPasswordTemplate } from "../utils/emailTemplateUtils.js";

dotenv.config({ quiet: true });

export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_HOST_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_GMAIL_SENDER_EMAIL,
      pass: process.env.SMTP_GMAIL_SENDER_PASSWORD,
    },
  });

  try {
    if (email?.action === 'verify-account') return await transporter.sendMail(verifyAccountTemplate(email?.receiverEmail, email?.action, email?.link));
    if (email?.action === 'forgot-password') return await transporter.sendMail(forgotPasswordTemplate(email?.receiverEmail, email?.action, email?.link));

  
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};