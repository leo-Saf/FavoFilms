// backend/models/userModel.js
const pool = require('../db/dbConfig');

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "FavoFilms".users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching user by email');
  }
};

const createUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO "FavoFilms".users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error('Error creating user');
  }
};

module.exports = { getUserByEmail, createUser };
