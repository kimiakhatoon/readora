

import './App.css'
import Card from './component/Card'

function App() {
  return (
    <>
    <body>
      <div className='card-container'>
        <Card title="The Alchemist" rate={5} isCool={true}/>
        <Card title="Pride and Prejudice" rate={4} isCool={true}/>
        <Card title="Thinking, fast and slow" rate={5} isCool={true}/>
      </div>
      </body>
    </>
  )
}

export default App
