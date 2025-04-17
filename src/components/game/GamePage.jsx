import React from 'react';
import { useParams } from 'react-router-dom';
import RoundWrapper from '../game/Rounds/RoundWrapper'
import Knapsack from './Knapsack/Knapsack';

const GamePage = () => {
  const { roundId } = useParams();
  console.log(roundId);

  return (
    <div>
      <RoundWrapper roundId={roundId}/>
      <div>
        <Knapsack/>
      </div>
    </div>
  );
}

export default GamePage;
