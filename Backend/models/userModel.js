
const pool = require('../db');

async function findUserByEmail(email) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}

async function createUser({ name, email, password, university_id, preferred_language }) {
  const res = await pool.query(
    `INSERT INTO users (name, email, password, university_id, preferred_language)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, university_id, preferred_language]
  );
  return res.rows[0];
}

module.exports = { findUserByEmail, createUser };
