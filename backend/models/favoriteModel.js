// backend/models/favoriteModel.js
const pool  = require('../db/dbConfig');  // Eller använd en annan databasanslutning


if (!pool) {
    console.error('Database pool is not defined');
  } else {
    console.log('Database pool is defined');
  }

  const addFavoriteMovie = async (userId, movieId, movieDetails) => {
    console.log('User ID:', userId);
    console.log('Movie ID:', movieId);
    console.log('Movie Details:', movieDetails);


    if (!userId || !movieId || !movieDetails) {
      throw new Error('User ID, Movie ID, and Movie Details are required');
    }
  
    const { title, overview, poster_url, release_date } = movieDetails;

    

    console.log('Title:', title);
    console.log('Overview:', overview);
    console.log('Poster url:', poster_url);
    console.log('Release Date:', release_date);

    // Kontrollera om poster_url finns, annars sätt till en standardbild
  const moviePosterUrl = poster_url ? poster_url : 'https://via.placeholder.com/500x750?text=No+Image';

  
    const query = `
  INSERT INTO "FavoFilms".favorites (user_id, movie_id, title, overview, poster_url, release_date)
  VALUES ($1, $2, $3, $4, $5, $6)
  ON CONFLICT (user_id, movie_id) DO NOTHING
`;
const values = [userId, movieId, title, overview, moviePosterUrl, release_date];

  
    try {
      await pool.query(query, values);
      return { userId, movieId, title, overview, poster_url: moviePosterUrl, release_date };
    } catch (error) {
      console.error('Error adding favorite movie with details:', error);
      throw error;
    }
  };
  

  
  const removeFavoriteMovie = async (userId, movieId) => {
    if (!userId || !movieId) {
      throw new Error('User ID and Movie ID are required');
    }
  
    const query = `
      DELETE FROM "FavoFilms".favorites 
      WHERE user_id = $1 AND movie_id = $2
    `;
    const values = [userId, movieId];
  
    try {
      const result = await pool.query(query, values);
      console.log('Rows affected:', result.rowCount); // Logga antal påverkade rader
      return { userId, movieId };
    } catch (error) {
      console.error('Error removing favorite movie:', error);
      throw error;
    }
  };
  

  const getFavoriteMoviesByUser = async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    const query = `
    SELECT movie_id, title, overview, poster_url, release_date
    FROM "FavoFilms".favorites
    WHERE user_id = $1
    `;

    const values = [userId];
  
    try {
      const result = await pool.query(query, values);
      console.log('Fetched favorites:', result.rows);
      return result.rows; // Returnerar en array med detaljerade filmer
    } catch (error) {
      console.error('Error fetching favorite movies with details:', error);
      throw error;
    }
  };
  
  
  
  module.exports = { addFavoriteMovie, removeFavoriteMovie, getFavoriteMoviesByUser };
  