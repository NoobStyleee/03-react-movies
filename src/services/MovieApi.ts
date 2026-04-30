import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
});