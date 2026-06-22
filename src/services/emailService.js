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

async function sendApplicationEmail(app) {
  await resend.emails.send({
    from: "Digital Drive Tech <onboarding@resend.dev>",
    to: process.env.COMPANY_EMAIL,
    subject: "New Internship Application",
    html: `
      <h2>New Internship Application</h2>

      <p><strong>Full Name:</strong> ${app.fullName}</p>

      <p><strong>Email:</strong> ${app.email}</p>

      <p><strong>Mobile:</strong> ${app.mobile}</p>

      <p><strong>College:</strong> ${app.college || 'N/A'}</p>

      <p><strong>Course:</strong> ${app.course || 'N/A'}</p>

      <p><strong>Domain:</strong> ${app.domain}</p>

      <p><strong>Duration:</strong> ${app.duration}</p>

      <p><strong>Message:</strong></p>

      <p>${app.message || 'N/A'}</p>
    `,
  });
}

module.exports = { sendContactEmail, sendApplicationEmail };