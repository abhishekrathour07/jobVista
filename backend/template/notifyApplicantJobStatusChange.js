import sendEmail from "../utils/sendEmail.js";

export const notifyApplicantJobStatusChange = async (applicantEmail, applicantName, jobTitle, newStatus) => {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #0118D8; text-align: center;">Job Application Status Update 🔔</h2>

      <p style="font-size: 16px; color: #333;">Hello <strong>${applicantName}</strong>,</p>

      <p style="font-size: 16px; color: #333;">
        The status of your application for the position <strong>${jobTitle}</strong> has been updated to:
      </p>

      <p style="font-size: 18px; color: #D17B0F; font-weight: bold; text-align: center;">${newStatus}</p>

      <p style="font-size: 14px; color: #555;">
        Please check your JobVista dashboard for more details.
      </p>

      <p style="font-size: 14px; color: #555; margin-top: 40px;">
        Best regards,<br>
        <strong>CEO: Abhishek Singh</strong><br/>
        <strong>JobVista Team</strong>
      </p>
    </div>
  `;

    await sendEmail(applicantEmail, `Your JobVista Application Status: ${newStatus}`, html);
};
