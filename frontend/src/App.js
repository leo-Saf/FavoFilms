import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieSearch from './components/Movies/MovieSearch';
import Favorites from './components/Movies/Favorites';
import './styles/index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kontrollera om användaren är inloggad
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);
    }
    console.log('Token finns:', !!token);
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token'); // Ta bort token vid logout
    setIsAuthenticated(false);       // Uppdatera isAuthenticated
  };

  return (
    <Router>
      <div className="app">
        <h1>Movie Favorites</h1>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
            {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
            {isAuthenticated && <li><Link to="/movies">Movies</Link></li>}
            {isAuthenticated && <li><Link to="/favorites">Favorites</Link></li>}
            {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register onRegisterSuccess={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />
          <Route
            path="/movies"
            element={isAuthenticated ? <MovieSearch /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorites"
            element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/movies" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
