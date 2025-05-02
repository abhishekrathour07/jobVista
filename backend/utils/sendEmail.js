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

