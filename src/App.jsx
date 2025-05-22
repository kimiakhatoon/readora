import { useState } from 'react';
import './App.css';
import Card from './component/Card';
import Search from './component/Search';
import PopularLists from './component/PopularLists';

function App() {
  const [searchTerm, setSearchTerm]= useState('');
  
  return (
    <main >
      <div className='pattern'/>
      <div className='wrapper'>
        <h1>Readora</h1>
        <header>
          <img src='./bookCover.png'/>
          <h2 className='search-text'>Unlock your next <span className='text-gradient'>adventure</span>…</h2>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm ={setSearchTerm} />
        <div >
        <h1>PopularList</h1>
      <PopularLists limit={5} showDescription={false} />
      </div>
      </div>
    </main>

  )
}

export default App
