import { useState, useEffect } from 'react';
import { scoreService } from '../services/scoreService';

const Leaderboard = ({ gameMode = 'classic' }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const data = await scoreService.getLeaderboard(gameMode);
                setLeaderboard(data);
            } catch (err) {
                setError('Failed to load leaderboard');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [gameMode]);

    if (loading) return <div>Loading leaderboard...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="leaderboard">
            <h2>Leaderboard - {gameMode}</h2>
            <div className="leaderboard-table">
                {leaderboard.map((entry, index) => (
                    <div key={entry._id} className="leaderboard-row">
                        <span className="rank">#{index + 1}</span>
                        <span className="player-name">{entry.playerName}</span>
                        <span className="score">{entry.score}</span>
                    </div>
                ))}
                {leaderboard.length === 0 && (
                    <div className="no-scores">No scores yet!</div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard; 