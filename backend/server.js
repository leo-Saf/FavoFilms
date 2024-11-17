// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');  


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutter
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);  // Rutter för filmer

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const pool = require('./db/dbConfig');  // Importera poolen

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to database:', res.rows);
  }
});

