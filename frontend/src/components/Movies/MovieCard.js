//Frontend/src/Movies/MovieCard.js
import React from 'react';

const MovieCard = ({ movie, onAddToFavorites, onShowTrailer, trailerUrl, showAddButton = true, showTrailerButton = true }) => {
  // Skapa fullständig URL för bilden, eller använd en fallback om den inte finns
  const posterUrl = movie.poster_url ? `https://image.tmdb.org/t/p/w500${movie.poster_url}` : '/default-image.jpg';

  return (
    <div className="movie-card-container">
      <div className="movie-card">
        <img src={posterUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <div>
          {/* Visa trailer-knappen om showTrailerButton är true */}
          {showTrailerButton && (
            <button onClick={() => onShowTrailer(movie.id, movie.title)}>
              Trailer
            </button>
          )}
          {/* Visa trailer om den finns */}
          {trailerUrl && (
            <div className="trailer">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerUrl}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {/* Visa Lägg till i favoriter-knappen om showAddButton är true */}
          {showAddButton && (
            <button onClick={() => onAddToFavorites(movie)}>
              Lägg till i favoriter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
