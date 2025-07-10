const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 🔐 Required for Render's hosted PostgreSQL
  },
});

pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL database successfully!');
    client.release();
  })
  .catch(err => console.error('❌ Connection error:', err.stack));

module.exports = pool;
