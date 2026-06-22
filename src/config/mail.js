const nodemailer = require('nodemailer');

/**
 * Nodemailer transporter configured from environment variables.
 * Supports Gmail, SendGrid, or any SMTP provider.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = transporter;
