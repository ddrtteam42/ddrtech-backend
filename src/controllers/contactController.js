const { pool } = require('../config/db');
const { sendContactNotification } = require('../services/emailService');

/**
 * POST /api/contact
 *
 * Validates fields → saves to PostgreSQL → sends email → responds.
 */
async function submitContact(req, res) {
  const { name, email, phone, subject, message } = req.body;

  // --- Validation ---
  const errors = [];
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required');
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push('Message is required');
  }
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // --- Save to database ---
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [name.trim(), email.trim(), phone || null, subject || null, message.trim()]
    );

    const saved = result.rows[0];

    // --- Send email (non-blocking — won't fail the request) ---
    sendContactNotification({ name, email, phone, subject, message });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      id: saved.id,
    });
  } catch (err) {
    console.error('Error saving contact:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

module.exports = { submitContact };
