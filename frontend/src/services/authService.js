// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Byt ut med din API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Förväntar oss ett svar med t.ex. { token: '...' }
  } catch (error) {
    throw new Error('Inloggning misslyckades');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // Förväntar oss ett svar med t.ex. { token: '...' }
  } catch (error) {
    throw new Error('Registrering misslyckades');
  }
};
