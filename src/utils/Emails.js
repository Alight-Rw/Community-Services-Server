import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendResetEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/api/users/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
};