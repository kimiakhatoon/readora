import './App.css'
import Card from './component/Card'

function App() {
  return (

    <main >
      <div className='pattern'/>
      <div className='wrapper'>
        <h1>Readora</h1>
        <header>
          <img src='./bookCover.png'/>
          <h2 className='search-text'>Unlock your next <span className='text-gradient'>adventure</span>… Type a title!</h2>
        </header>
      </div>
    </main>

  )
}

export default App
