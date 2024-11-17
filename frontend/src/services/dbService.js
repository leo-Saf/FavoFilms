// Frontend/src/services/dbService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/movies/favorites';

// Lägg till en favoritfilm
export const addFavoriteMovie = async (userId, movieId, movieDetails) => {
    try {
      console.log('Payload sent to backend:', { userId, movieId, movieDetails });
  
      const response = await axios.post('http://localhost:3000/api/movies/favorites', {
        userId,
        movieId,
        movieDetails,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error adding favorite movie:', error.response?.data || error.message);
      throw error;
    }
  };
  
  

// Hämta favoritfilmer
export const getFavorites = async (userId,) => {
    try {
        const response = await axios.get(`${API_URL}?userId=${userId}`); // Skicka användarens ID för att hämta favoriter
      return response.data;  // Förväntar oss en lista med filmer
    } catch (error) {
      console.error('Fel vid hämtning av favoriter', error);
      
      throw error;
    }
  };


