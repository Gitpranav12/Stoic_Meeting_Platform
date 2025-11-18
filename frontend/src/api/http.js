// src/api/http.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default http;
