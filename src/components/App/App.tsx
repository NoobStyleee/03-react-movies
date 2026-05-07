import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import ReactPaginate from 'react-paginate';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal'; 
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from '../Pagination/Pagination.module.css';

const Paginate = (ReactPaginate as any).default || ReactPaginate;

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  const executeSearch = async (searchQuery: string, searchPage: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchMovies(searchQuery, searchPage);

      if (data.results.length === 0) {
        toast.error("No movies found.");
        setMovies([]);
        setTotalPages(0);
        return;
      }

      setMovies(data.results);
      setTotalPages(data.total_pages);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); 
    executeSearch(newQuery, 1);
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
              <>
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
                
                {movies.length > 0 && (
                  <Paginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={({ selected }: { selected: number }) => {
                        const nextPage = selected + 1;
                        setPage(nextPage);
                        executeSearch(query, nextPage);
                    }}
                    forcePage={page - 1}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    nextLabel="→"
                    previousLabel="←"
                    pageClassName={css.pageItem}
                    pageLinkClassName={css.pageLink}
                    previousClassName={css.pageItem}
                    previousLinkClassName={css.pageLink}
                    nextClassName={css.pageItem}
                    nextLinkClassName={css.pageLink}
                    breakLabel="..."
                    breakClassName={css.pageItem}
                    breakLinkClassName={css.pageLink}
                  />
                )}
              </>
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