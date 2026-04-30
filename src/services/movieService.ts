import { api } from './MovieApi'; 
import type { Movie } from '../types/movie';


interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results;
};