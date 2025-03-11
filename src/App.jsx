import { useState } from 'react'
import qkLogo from '/logo.png'
import './App.css'
import ScoreTest from './components/ScoreTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ScoreTest />
    </div>
  )
}

export default App
