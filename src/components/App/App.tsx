import { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import  MovieGrid  from '../MovieGrid/MovieGrid';
import  Loader  from '../Loader/Loader';
import  ErrorMessage  from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
  try {
    setIsLoading(true);
    setError(null);
    
    const results = await fetchMovies(query); 
    
    setMovies(results);
  } catch (err) {
    setError('Failed to fetch movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className={styles.appContainer}>
      <header>
        <h1>MovieSearch Pro</h1>
        <SearchBar onSubmit={handleSearch} />
      </header>

      <main>
        {error && <ErrorMessage />}
        
        {isLoading ? (
          <Loader />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;