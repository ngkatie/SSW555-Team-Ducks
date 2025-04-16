import React from 'react';
import { Box } from '@mui/material';
import RoundWrapper from '../game/Rounds/RoundWrapper'
import Knapsack from './Knapsack/Knapsack';
import Qubit from './Qubit/Qubit';

function GamePage() {
  return (
    <div>
      <RoundWrapper key={"1"}/>

      <div>
        <Knapsack/>
      </div>

    </div>
  );
}

export default GamePage;
