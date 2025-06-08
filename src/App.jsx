
import './App.css';

import PopularLists from './component/PopularLists';

function App() {

  
  return (
    <main >
      <div className='pattern'/>
      <div className='wrapper'>
        <h1>Readora</h1>
        <header className='flex flex-col justify-center'>
          <img src='./bookCover.png'/>
          <h2 className='search-text'>Unlock your next <span className='text-gradient'>adventure</span>…</h2>
        </header>
    
        <div className='flex flex-col justify-center' >
      <PopularLists limit={5} showDescription={false} />
      </div>
      </div>
    </main>

  )
}

export default App
