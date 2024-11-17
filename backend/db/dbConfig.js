// backend/db/dbConfig.js
const { Pool } = require('pg');
require('dotenv').config();  // För att läsa .env-filen

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

// Skapa en pool för databasen
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Testa anslutningen
pool.connect((err) => {
    if (err) {
      console.error('Fel vid anslutning till databasen', err.stack);
    } else {
      console.log('Anslutning till databasen lyckades!');
    }
  });

module.exports = pool;
