const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
  process.exit(-1);
});

/**
 * Initialize database — create contacts table if it doesn't exist.
 * Called once at startup.
 */
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        college VARCHAR(255),
        course VARCHAR(255),
        mobile VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        domain VARCHAR(255) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Database initialized — contacts + applications tables ready');
  } finally {
    client.release();
  }
}

module.exports = { pool, initDb };
