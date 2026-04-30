import { useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button 
          className={css.closeButton} 
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <img
          src={movie.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
            : 'https://via.placeholder.com/1280x720?text=No+Preview'}
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default MovieModal;