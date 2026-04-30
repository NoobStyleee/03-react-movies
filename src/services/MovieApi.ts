// src/services/movieApi.ts
import axios from 'axios';
import type { Movie } from '../types/movie.ts';

// Define it ONLY ONCE here
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

// This will tell us if Vite is actually reading your .env file
console.log("Vite Env Object:", import.meta.env); 
console.log("My Token Value:", API_TOKEN);

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
});

export const getMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get('/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1
    }
  });
  return response.data.results;
};