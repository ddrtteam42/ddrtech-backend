const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactEmail(contact) {
  await resend.emails.send({
    from: "Digital Drive Tech <onboarding@resend.dev>",
    to: process.env.COMPANY_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>

      <p><strong>Name:</strong> ${contact.name}</p>

      <p><strong>Email:</strong> ${contact.email}</p>

      <p><strong>Phone:</strong> ${contact.phone}</p>

      <p><strong>Subject:</strong> ${contact.subject}</p>

      <p><strong>Message:</strong></p>

      <p>${contact.message}</p>
    `,
  });
}

module.exports = { sendContactEmail };