//Backend/controllers/movieController.js
const axios = require('axios');
const pool = require('../db/dbConfig');
const {  addFavoriteMovie, getFavoriteMoviesByUser } = require('../models/favoriteModel');

// Hämtar filmer baserat på sökfråga
const getMovies = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: '8034d73f1fb759ae30b1bc1d6594bda5',  // API-nyckeln här
        query: query,
      },
    });
    console.log('API Response:', response.data);

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

// Lägg till favoritfilm för en specifik användare
const addFavorite = async (req, res) => {
    const { userId, movieId, movieDetails } = req.body; // Inkludera `movieDetails` från frontend
  
    // Kontrollera att alla nödvändiga fält finns
    if (!userId || !movieId || !movieDetails) {
      return res.status(400).json({ message: 'User ID, Movie ID, and Movie Details are required' });
    }
  
    try {
      // Skicka alla fält till modellen
      const favorite = await addFavoriteMovie(userId, movieId, movieDetails);
      res.status(201).json({ message: 'Movie added to favorites', favorite });
    } catch (error) {
      console.error('Error adding favorite movie:', error.message);
      res.status(500).json({ message: 'Error adding favorite movie' });
    }
  };
  



// Hämta favoriter för en specifik användare
const getFavorites = async (req, res) => {
    const { userId, movieId } = req.query;
  
    console.log('Received request for userId:', userId, 'movieId:', movieId);  // Lägg till en logg
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const favorites = await getFavoriteMoviesByUser(userId); // Hämta sparade filmer
      console.log('Favorites fetched:', favorites);  // Logga favoriterna som hämtas
      res.status(201).json(favorites);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching favorite movies' });
    }
  };


  

  module.exports = { getMovies, addFavorite, getFavorites };
  
