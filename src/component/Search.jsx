import React from 'react';
const Search = ({ searchTerm, setSearchTerm, handleKeyDown }) => {
  return (
    <div className="search">
      <div>
        <img src="searchicon.png" alt="Search icon" />
        <input
          id="search-input"
          type="text"
          placeholder="Type a title!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when input changes
          onKeyDown={handleKeyDown} // Call handleKeyDown when Enter is pressed
        />
      </div>
    </div>
  );
};

export default Search;
