import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Gmail services are not ready to send emails. Please check the email configuration.");
    } else {
        console.log("Gmail services are ready to send emails.");
    }
});

const sendEmail = async (to, subject, body) => {
    try {
        await transporter.sendMail({
            from: `"Your JobVista" <${process.env.EMAIL_PASSWORD}>`,
            to,
            subject,
            html: body,
        });
        console.log(` Email sent successfully to ${to}`);
    } catch (error) {
        console.error(` Failed to send email to ${to}:`, { error: error.message });
    }
};


export default sendEmail


// export const sendVerificationToEmail = async (to, token) => {
//     const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
//     const html = `
//     <h1>Welcome To Your CarearView! Verify Your Email</h1>
//     <p>Thank you for registering. Please click on the link below to verify your email address:</p>
//     <a href="${verificationUrl}">Verify Email Here</a>
//     <p>If you didn't request this or have already verified, please ignore this email.</p>
//   `;
//     await sendEmail(to, "Please verify your email to access CareerView", html);
// };

