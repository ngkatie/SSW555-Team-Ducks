import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome/Welcome'
import Knapsack from './Knapsack/Knapsack';
import Qubit from './Qubit/Qubit';

function GamePage() {
  return (
    <div>
      <Welcome/>

      <div>
        <Knapsack/>
        <Qubit/>
        <Qubit/>
        <Qubit/>
      </div>

    </div>
  );
}

export default GamePage;
