import React from 'react';
import { Link } from 'react-router-dom';
import qkLogo from '/logo.png';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Quantum Knapsack</h1>
      <div className="card">
        <p>
          To address the learning curve associated with quantum computing, Quantum Knapsack introduces foundational concepts using a variation of the classic knapsack problem.
        </p>
      </div>
      <Link to="/round/1">
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default LandingPage;
