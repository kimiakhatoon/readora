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
          <h2 className='search-text'>Unlock your next <spann className='text-gradient'>adventure</spann>… Type a title!</h2>
        </header>
      </div>
    </main>

  )
}

export default App
