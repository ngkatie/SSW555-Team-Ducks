const Score = require('../models/Score');

// Add a new score
exports.addScore = async (req, res) => {
    try {
        const { playerName, score, gameMode } = req.body;
        const newScore = await Score.create({
            playerName,
            score,
            gameMode
        });
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const { gameMode = 'classic', limit = 10 } = req.query;
        const leaderboard = await Score.find({ gameMode })
            .sort({ score: -1 })
            .limit(parseInt(limit))
            .select('playerName score createdAt');
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get player's best score
exports.getPlayerBestScore = async (req, res) => {
    try {
        const { playerName, gameMode = 'classic' } = req.query;
        const bestScore = await Score.findOne({ playerName, gameMode })
            .sort({ score: -1 })
            .select('score createdAt');
        res.status(200).json(bestScore || { score: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 