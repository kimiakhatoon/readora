import { useState, useEffect, useCallback } from 'react';
import './PopularList.css';
import SpinnerComp from './spinner';
import Search from './Search'; // Import the Search component

const PopularLists = ({ limit = 10 }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state here

  const fetchBooks = useCallback(async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = query
        ? `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
        : `https://gutendex.com/books/?sort=popular&limit=${limit}`;
      const response = await fetch(endpoint);

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
    fetchBooks(searchTerm);
  }, [searchTerm]); // Fetch books when searchTerm changes

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchBooks(searchTerm); // Trigger the search when Enter is pressed
    }
  };

  if (loading) return <SpinnerComp />;

  if (error) return (
    <>
      <div className="error">{error}</div>
      <button onClick={() => fetchBooks(searchTerm)} className="retry-btn" typeof="button">
        Try again
      </button>
    </>
  );

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onKeyPress={handleKeyPress} /> {/* Pass the keyPress handler */}
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
              <p>author: {book.authors.map(a => a.name).join(', ')}</p>
              <small className="bookcount">
                Read count: {book.download_count.toLocaleString()}
                <img src="redheart.png" />
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularLists;
