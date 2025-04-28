import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmail.js';
dotenv.config()


export const sendforgetPasswordLinkToEmail = async (to, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password/${token}`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #0118D8; text-align: center;">Welcome to JobVista! 💼</h2>
      <p style="font-size: 16px; color: #333;">
        You have requested to reset your password. Click the button below to set a new password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #0118D8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If you didn't request this, you can safely ignore this email. Your account will remain secure.
      </p>
      <p style="font-size: 14px; color: #555; margin-top: 40px;">
        Thanks,<br>
        <strong>CEO: Abhishek Singh</strong><br/>
        <strong>JobVista Team</strong>
      </p>
    </div>
  `;

    await sendEmail(to, "Please Reset Your Password", html);
};