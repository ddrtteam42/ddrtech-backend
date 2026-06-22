const transporter = require('../config/mail');

/**
 * Send a contact-form notification to the company.
 * Logs but does NOT throw on failure — DB save already succeeded.
 */
async function sendContactNotification({ name, email, phone, subject, message }) {
  const companyEmail = process.env.COMPANY_EMAIL;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: companyEmail,
    subject: 'New Contact Form Submission',
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Subject: ${subject || 'N/A'}
Message:
${message}
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (err) {
    // Log the error but do NOT rethrow — we already saved the contact to DB.
    console.error('Failed to send email notification:', err.message);
  }
}

module.exports = { sendContactNotification };
