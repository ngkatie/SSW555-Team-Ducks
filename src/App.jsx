<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
=======
import React from 'react'
import { useState } from 'react'
import qkLogo from '/logo.png'
import './App.css'
import FinalizeButton from './components/FinalizeButton/FinalizeButton'

function App() {
  const [isFinalized, setIsFinalized] = useState(false);

  const handleFinalize = () => {
    setIsFinalized(true);
  };

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
        <FinalizeButton 
          isFinalized={isFinalized}
          onFinalize={handleFinalize}
        />
      </div>
      <p className="read-the-docs">
        Come back soon! Work in progress...
      </p>
    </>
  )
>>>>>>> QK-30-Add-button-to-finalize-knapsack
}

export default App;
