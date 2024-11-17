// backend/routes/movieRoutes.js
const express = require('express');
const { getMovies, addFavorite, removeFavorite, getFavorites} = require('../controllers/movieController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();



router.get('/', getMovies);  // Sökfilmer
router.post('/favorites', addFavorite);  // Lägg till en favorit
router.get('/favorites', getFavorites);  // Hämta favoriter



module.exports = router;
