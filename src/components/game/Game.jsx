import { useState, useEffect } from 'react';
import { scoreService } from '../../services/scoreService';
import Leaderboard from '../leaderboard/Leaderboard';
import DecoherenceEffect from './DecoherenceEffect';

const Game = () => {
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [showDecoherence, setShowDecoherence] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    // Fetch player's best score when component mounts
    useEffect(() => {
        const fetchBestScore = async () => {
            if (playerName) {
                try {
                    const data = await scoreService.getPlayerBestScore(playerName);
                    setBestScore(data.score);
                } catch (error) {
                    console.error('Failed to fetch best score:', error);
                }
            }
        };
        fetchBestScore();
    }, [playerName]);

    const handleGameOver = async () => {
        if (!playerName) return;
        
        try {
            await scoreService.addScore(playerName, score);
            setGameOver(true);
        } catch (error) {
            console.error('Failed to save score:', error);
        }
    };

    const startNewGame = () => {
        setScore(0);
        setGameOver(false);
    };

    const handleDecoherenceComplete = () => {
        setShowDecoherence(false);
        // Add any game logic that should happen after decoherence
    };

    // Call this function whenever you want to trigger the decoherence effect
    const triggerDecoherence = () => {
        setShowDecoherence(true);
    };

    return (
        <div className="game-container">
            {!playerName ? (
                <div className="player-input">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>
            ) : !gameOver ? (
                <div className="game-play">
                    <div className="score-display">
                        <div>Current Score: {score}</div>
                        <div>Best Score: {bestScore}</div>
                    </div>
                    {/* Your game components go here */}
                    <button onClick={handleGameOver}>End Game</button>
                    <DecoherenceEffect 
                        isActive={showDecoherence} 
                        onComplete={handleDecoherenceComplete}
                    />
                </div>
            ) : (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Final Score: {score}</p>
                    <button onClick={startNewGame}>Play Again</button>
                </div>
            )}

            {/* Always show the leaderboard */}
            <Leaderboard gameMode="classic" />
        </div>
    );
};

export default Game; 