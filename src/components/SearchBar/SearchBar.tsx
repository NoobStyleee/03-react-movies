import type { FormEvent } from 'react';
import styles from './SearchBar.module.css';

// 1. Define the type for the props
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

// 2. Pass the props to the component
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    const query = input.value.trim();

    if (query === '') {
      alert('Please enter a search term');
      return;
    }

    onSubmit(query); // 3. Send the query back up to App.tsx
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        
        {/* Attach the handleSubmit function here */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;