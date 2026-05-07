import axios from 'axios';
import type { Movie } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>('https://api.themoviedb.org/3/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: page, 
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  });

  return response.data; 
};