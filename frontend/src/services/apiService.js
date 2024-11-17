import axios from 'axios';

const API_URL = 'http://localhost:3000/api/movies';  // Backend-serverns URL
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = 'AIzaSyCOjxpoEYTg1u4XqmclXFQ2mavuS7VZy1M'; 

// Sök filmer (utan JWT-token)
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: { query },  // Rättat query-parameter
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Hämta trailer för film
export const getTrailer = async (movieTitle) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: `${movieTitle} trailer`,
        key: YOUTUBE_API_KEY,
      },
    });
    if (response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      return videoId; // Returnera videoId för att användas i iframe
    } else {
      throw new Error('No trailer found');
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
    throw error;
  }
};
