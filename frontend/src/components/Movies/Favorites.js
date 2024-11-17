import React, { useState, useEffect } from 'react';
import { getFavorites } from '../../services/dbService';
import MovieCard from './MovieCard';
import { jwtDecode } from 'jwt-decode';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const token = localStorage.getItem('token'); // Hämtar token från localStorage
      if (!token) {
        setError('You must be logged in to view your favorites.');
        setLoading(false);
        return;
      }

      const userId = getUserIdFromToken(token); // Extrahera användarens ID från token
      console.log('User ID sent to API:', userId);

      if (userId) {
        try {
          const userFavorites = await getFavorites(userId); // Skicka användarens ID till API:t
          console.log('Favoriter hämtade från API:', userFavorites);
          setFavorites(userFavorites);
        } catch (error) {
          setError('Error fetching favorites');
          console.error('Error fetching favorites:', error);
        }
      } else {
        setError('Invalid token');
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

 

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      return decodedToken.userId;
    } catch (error) {
      console.error('Fel vid dekodning av token', error);
      return null;
    }
  };

  if (loading) {
    return <p>Loading your favorites...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="favorites-container">
  {favorites.map((movie) => (
    <div key={movie.id} className="favorite-card">
      <MovieCard 
        movie={movie} 
        showAddButton={false} 
        showTrailerButton={false} 
      />

    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default Favorites;
