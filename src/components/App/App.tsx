import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal'; 
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  const handleSearch = async (query: string): Promise<void> => {
    try {
      setMovies([]); 
      setError(null);
      setIsLoading(true);

      const results = await fetchMovies(query); 

      if (results.length === 0) {
        toast.error("No movies found for your request.", {
          position: "top-right",
        });
        return; 
      }

      setMovies(results);
    } catch (err) {
      const message = 'Failed to fetch movies. Please try again later.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <Toaster />
      
      <header>
        <h1>MovieSearch Pro</h1>
        <SearchBar onSubmit={handleSearch} />
      </header>

      <main>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;