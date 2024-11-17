const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Ruta för registrering
router.post('/register', registerUser);

// Ruta för inloggning
router.post('/login', loginUser);

module.exports = router;  // Här exporterar vi router-objektet
