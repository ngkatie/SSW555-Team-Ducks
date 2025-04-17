import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import GamePage from './components/game/GamePage';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/round/:roundId" element={<GamePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
