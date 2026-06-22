const { pool } = require('../config/db');
const { sendApplicationEmail } = require('../services/emailService');

/**
 * POST /api/apply
 *
 * Validates fields → saves to PostgreSQL → sends email → responds.
 */
async function submitApplication(req, res) {
  const { fullName, college, course, mobile, email, domain, duration, message } = req.body;

  // --- Validation ---
  const errors = [];
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.push('Full name is required');
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }
  if (!mobile || typeof mobile !== 'string' || !mobile.trim()) {
    errors.push('Mobile number is required');
  }
  if (!domain || typeof domain !== 'string' || !domain.trim()) {
    errors.push('Training domain is required');
  }
  if (!duration || typeof duration !== 'string' || !duration.trim()) {
    errors.push('Duration is required');
  }
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // --- Save to database ---
    const result = await pool.query(
      `INSERT INTO applications (full_name, college, course, mobile, email, domain, duration, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [
        fullName.trim(),
        college || null,
        course || null,
        mobile.trim(),
        email.trim(),
        domain.trim(),
        duration.trim(),
        message || null,
      ]
    );

    const saved = result.rows[0];

    // --- Send email notification ---
    await sendApplicationEmail({ fullName, college, course, mobile, email, domain, duration, message });

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully.',
      id: saved.id,
    });
  } catch (err) {
    console.error('Error saving application:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

module.exports = { submitApplication };
