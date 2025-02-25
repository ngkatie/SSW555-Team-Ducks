import { useState } from 'react'
import qkLogo from '/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a>
          <img src={qkLogo} className="logo" alt="Quantum Knapsack logo" />
        </a>
      </div>
      <h1>Quantum Knapsack</h1>
      <div className="card">
        <p>
        To address the learning curve associated with quantum computing, Quantum Knapsack introduces foundational concepts using a 
        variation of the classic knapsack problem. Through steady progression to higher-level concepts, our mission is to design puzzles 
        that spark interest in quantum computing without advanced math prerequisites.
        </p>
      </div>
      <p className="read-the-docs">
        Come back soon! Work in progress...
      </p>
    </>
  )
}

export default App
