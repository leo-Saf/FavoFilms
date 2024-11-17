//Frontend/src/Movies/MovieSearch.js
import React, { useState } from 'react';
import { searchMovies } from '../../services/apiService';
import { addFavoriteMovie } from '../../services/dbService';
import MovieCard from './MovieCard';
import { jwtDecode } from 'jwt-decode';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  const handleAddToFavorites = async (movie) => {
    // Hämta token från localStorage
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert("Du måste vara inloggad för att lägga till en favorit.");
      return;
    }
  
    // Dekoda token för att få userId
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Anta att userId finns i token
  
    const movieDetails = {
        title: movie.title,
        overview: movie.overview || "Ingen beskrivning tillgänglig",
        poster_url: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image+Available', // Standardbild om ingen finns
        release_date: movie.release_date || "Ingen release date tillgänglig",
      };
      
  
    console.log('Sending to backend:', {
      userId,
      movieId: movie.id,
      movieDetails,
    });
  
    try {
      await addFavoriteMovie(userId, movie.id, movieDetails);
      alert(`${movie.title} har lagts till i dina favoriter!`);
    } catch (error) {
      console.error('Fel vid att lägga till i favoriter', error);
    }
  };
  
  

  const handleShowTrailer = async (movieId, movieTitle) => {
    const trailerUrl = await fetchTrailerUrl(movieTitle); // Skickar filmens titel för att hämta trailer
    setTrailers((prev) => ({ ...prev, [movieId]: trailerUrl }));
  };

  const fetchTrailerUrl = async (movieTitle) => {
    try {
      const encodedTitle = encodeURIComponent(movieTitle); 
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTitle}+trailer&key=AIzaSyCOjxpoEYTg1u4XqmclXFQ2mavuS7VZy1M`);
      const data = await response.json();
      
      console.log(data); 
  
      return data.items?.[0]?.id?.videoId || null;
    } catch (error) {
      console.error('Fel vid hämtning av trailer:', error);
      return null;
    }
  };
  

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={{
                ...movie,
                 poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
                 
            }}
            onAddToFavorites={handleAddToFavorites}
            onShowTrailer={() => handleShowTrailer(movie.id, movie.title)}
            trailerUrl={trailers[movie.id]}
            />

          ))
        ) : (
          <p>Ingen film hittades.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
