import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome/Welcome'
import Round2 from './Rounds/Round2/Round2'
import Round3 from './Rounds/Round3/Round3'
import Knapsack from './Knapsack/Knapsack';
import Qubit from './Qubit/Qubit';

function GamePage() {
  return (
    <div>
      <Welcome/>

      <div>
        <Knapsack/>
      </div>

    </div>
  );
}

export default GamePage;
