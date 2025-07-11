import { useState, useCallback, useEffect } from 'react';
import './PopularList.css';
import SpinnerComp from './spinner';
import Search from './Search'; 
import { getTrendingBooks, updateSearchCount } from '../appwrite.js';


const PopularLists = ({ limit = 10 }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingBooks, setTrendingBooks]= useState([])

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
      setBooks( data.results || []);
      if (query && data.results.length > 0){
        await updateSearchCount(query, data.results[0])
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  
    }
  }, [limit]);
  const loadingTrendingBooks =async ()=>{
try {
  const books = await getTrendingBooks();
  setTrendingBooks(books)
} catch (error) {
  console.error(`error fetching trending books: ${error} `)
}
  }
useEffect(() => {
  fetchBooks();
}, [fetchBooks]);
useEffect(()=>{
  loadingTrendingBooks()
});
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  
      fetchBooks(searchTerm);  
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
    <div className='main'> 
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleKeyDown={handleKeyDown} /> 
      <h2>trending books</h2>
      {trendingBooks.length > 0 && (
        <div className="trending">
          <ul>
            { trendingBooks.map((book, index) => (
              <li key={book.$id}>
                <p >{index +1}</p>
                <img src={book.poster_url} alt={book.title} />
              </li>
            ))

            }
          </ul>
        </div>
      )}
              <h2>popular books</h2>
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
