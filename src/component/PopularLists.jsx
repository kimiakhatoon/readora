import { useState, useEffect, useCallback } from 'react';
import './PopularList.css';

const PopularLists = ({ limit = 10 }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://gutendex.com/books/?sort=popular&limit=${limit}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      setBooks(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) return <div className="loading">📚 loading...</div>;

  if (error) return (
    <><div className="error">
      {error}</div>
      <button onClick={fetchBooks} className="retry-btn" typeof='button'>
         try again
      </button>
    </>
  );

  return (
    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <img
            src={book.formats['image/jpeg'] || '/placeholder-book.jpg'}
            alt={book.title}
            className="book-cover"
          />
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>authors: {book.authors.map(a => a.name).join(', ')}</p>
            <small>download count: {book.download_count.toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularLists;