const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '16kb' }));

// --- Routes ---
app.use('/api', contactRoutes);

// --- Health check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
