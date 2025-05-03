import './App.css'
import Card from './component/Card'

function App() {
  return (

    <main >
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='./bookCover.png'/>
          <h1>Unlock your next <spann className='text-gradient'>adventure</spann>… Type a title!</h1>
        </header>
      </div>
    </main>

  )
}

export default App
