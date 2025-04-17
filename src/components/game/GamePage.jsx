import React from 'react';
import { useParams } from 'react-router-dom';
import RoundWrapper from '../game/Rounds/RoundWrapper'
import Knapsack from './Knapsack/Knapsack';
import LockedPage from '../LockedPage';

const GamePage = () => {
  const { roundId } = useParams();
  const locked = ["2", "3"];

  return (
    <div>
      {locked.includes(roundId) ? 
        <LockedPage roundNum={roundId}/> : 
        <div>
          <RoundWrapper roundId={roundId}/>
          <div><Knapsack/></div>
        </div>
      }

    </div>
  );
}

export default GamePage;
