import { useState, useEffect } from 'react';
import './ScoreTest.css';

function ScoreTest() {
    const [playerName, setPlayerName] = useState('');
    const [score, setScore] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const submitScore = async (e) => {
        e.preventDefault();
        if (!playerName || !score) {
            setMessage('Please enter both player name and score');
            return;
        }
        try {
            const response = await fetch('http://localhost:5001/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerName,
                    score: Number(score),
                    gameMode: 'classic'
                })
            });
            const data = await response.json();
            setMessage('Score submitted successfully!');
            setPlayerName('');
            setScore('');
            fetchLeaderboard();
        } catch (error) {
            setMessage('Error submitting score');
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/scores/leaderboard');
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            setMessage('Error fetching leaderboard');
        }
    };

    const getMedalEmoji = (index) => {
        switch(index) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return `${index + 1}.`;
        }
    };

    return (
        <div className="leaderboard-container">
            <div className="score-submission">
                <h1>Quantum Knapsack Leaderboard</h1>
                <form onSubmit={submitScore} className="score-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Player Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="player-input"
                        />
                        <input
                            type="number"
                            placeholder="Score"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="score-input"
                        />
                        <button type="submit" className="submit-button">
                            Submit Score
                        </button>
                    </div>
                </form>
                {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
            </div>

            <div className="leaderboard-section">
                <div className="leaderboard-header">
                    <h2>Top Players</h2>
                    <button onClick={fetchLeaderboard} className="refresh-button">
                        🔄 Refresh
                    </button>
                </div>
                <div className="leaderboard-table">
                    {leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <div key={entry.id} className={`leaderboard-entry ${index < 3 ? 'top-three' : ''}`}>
                                <span className="rank">{getMedalEmoji(index)}</span>
                                <span className="player-name">{entry.playerName}</span>
                                <span className="score">{entry.score.toLocaleString()}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-scores">No scores yet. Be the first to play!</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScoreTest; 