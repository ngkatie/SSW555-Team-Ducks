import { useState, useEffect } from 'react';
import { scoreService } from '../services/scoreService';
import Leaderboard from './Leaderboard';
import Qubit from './Qubit/Qubit';
import EntanglementLines from './Qubit/EntanglementLines';

const Game = () => {
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [qubits, setQubits] = useState([]);
    const [entangledPairs, setEntangledPairs] = useState([]);
    const [selectedQubit, setSelectedQubit] = useState(null);

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

    // Initialize qubits
    useEffect(() => {
        const initialQubits = Array(5).fill(null).map((_, index) => ({
            id: index,
            position: { x: 0, y: 0 },
            entangledWith: []
        }));
        setQubits(initialQubits);
    }, []);

    const handlePositionChange = (qubitId, position) => {
        setQubits(prev => prev.map(qubit => 
            qubit.id === qubitId ? { ...qubit, position } : qubit
        ));
    };

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
        setEntangledPairs([]);
        setSelectedQubit(null);
    };

    const handleQubitSelect = (qubitData) => {
        setScore(prev => prev + qubitData.value);
    };

    const handleEntangle = (qubitId) => {
        if (selectedQubit === null) {
            setSelectedQubit(qubitId);
        } else if (selectedQubit !== qubitId) {
            // Create new entanglement pair
            const newPair = [selectedQubit, qubitId].sort();
            if (!entangledPairs.some(pair => 
                pair[0] === newPair[0] && pair[1] === newPair[1]
            )) {
                setEntangledPairs(prev => [...prev, newPair]);
                
                // Update qubits' entangledWith arrays
                setQubits(prev => prev.map(qubit => {
                    if (qubit.id === selectedQubit) {
                        return { ...qubit, entangledWith: [...qubit.entangledWith, qubitId] };
                    }
                    if (qubit.id === qubitId) {
                        return { ...qubit, entangledWith: [...qubit.entangledWith, selectedQubit] };
                    }
                    return qubit;
                }));
            }
            setSelectedQubit(null);
        }
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
                    <div className="entanglement-instructions" style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        <h3>How to Entangle Qubits:</h3>
                        <p>1. Double-click the first qubit you want to entangle</p>
                        <p>2. Double-click the second qubit to create the connection</p>
                        <p>Watch for the green pulsing line between entangled qubits!</p>
                    </div>
                    <div className="qubits-container" style={{ 
                        position: 'relative',
                        minHeight: '400px',
                        padding: '20px',
                        background: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '10px'
                    }}>
                        <EntanglementLines qubits={qubits} entangledPairs={entangledPairs} />
                        <div className="qubits-grid" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(3, 1fr)', 
                            gap: '20px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 2
                        }}>
                            {qubits.map((qubit) => (
                                <Qubit
                                    key={qubit.id}
                                    id={qubit.id}
                                    onSelect={handleQubitSelect}
                                    onEntangle={handleEntangle}
                                    entangledWith={qubit.entangledWith}
                                    onPositionChange={handlePositionChange}
                                />
                            ))}
                        </div>
                    </div>
                    <button onClick={handleGameOver}>End Game</button>
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