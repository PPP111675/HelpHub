
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(client => {
    console.log('Connected to database successfully!');
    client.release();
  })
  .catch(err => console.error('Connection error', err.stack));


module.exports = pool;
