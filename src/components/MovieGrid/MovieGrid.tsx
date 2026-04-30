import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

// 1. Define the Interface for the props
interface MovieGridProps {
  movies: Movie[];
}

// 2. Pass the props and remove the local useEffect/fetch logic
const MovieGrid = ({ movies }: MovieGridProps) => {
  
  // If there are no movies, we can show a friendly message
  if (movies.length === 0) {
    return <p className={css.message}>No movies found. Try searching for something else!</p>;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <div className={css.card}>
            <img
              className={css.image}
              // 3. Use the dynamic path from the API
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;