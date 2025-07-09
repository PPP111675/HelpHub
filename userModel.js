
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

const updateUserProfile = async (email, { name, universityId, password }) => {
  try {
    // 1. Get current password if not updating
    const existingUser = await pool.query("SELECT password FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length === 0) return false;

    let newPassword = existingUser.rows[0].password;

    // 2. If password is provided, hash it
    if (password && password.trim() !== "") {
      const saltRounds = 10;
      newPassword = await bcrypt.hash(password, saltRounds);
    }

    // 3. Update the user
    const res = await pool.query(
      "UPDATE users SET name = $1, university_id = $2, password = $3 WHERE email = $4 RETURNING *",
      [name, universityId, newPassword, email]
    );

    return res.rowCount > 0;
  } catch (err) {
    console.error("Error updating profile:", err.message);
    throw err;
  }
};

module.exports = { findUserByEmail, createUser ,updateUserProfile};
