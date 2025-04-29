import sendEmail from "../utils/sendEmail.js";

export const adminEmailforApplyingInJob = async (adminEmail, applicantName, applicantEmail, jobTitle) => {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #0118D8; text-align: center;">New Job Application Received 💼</h2>

      <p style="font-size: 16px; color: #333;">You have received a new job application on <strong>JobVista</strong>:</p>

      <ul style="font-size: 16px; color: #333; list-style-type: none; padding: 0;">
        <li><strong>Applicant Name:</strong> ${applicantName}</li>
        <li><strong>Applicant Email:</strong> ${applicantEmail}</li>
        <li><strong>Applied For:</strong> ${jobTitle}</li>
      </ul>

      <p style="font-size: 14px; color: #555;">
        Please review the application at your earliest convenience.
      </p>

      <p style="font-size: 14px; color: #555; margin-top: 40px;">
        Thanks,<br>
        <strong>CEO: Abhishek Singh</strong><br/>
        <strong>JobVista Team</strong>
      </p>
    </div>
  `;

    await sendEmail(adminEmail, "New Job Application - JobVista", html);
};
