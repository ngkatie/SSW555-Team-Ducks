require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File path for scores
const scoresFilePath = path.join(__dirname, 'data', 'scores.json');

// Ensure the data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
        await fs.writeFile(scoresFilePath, JSON.stringify({ scores: [] }));
    }
}

// Initialize data directory
ensureDataDir();

// Read scores from file
async function readScores() {
    try {
        const data = await fs.readFile(scoresFilePath, 'utf8');
        return JSON.parse(data).scores;
    } catch (error) {
        return [];
    }
}

// Write scores to file
async function writeScores(scores) {
    await fs.writeFile(scoresFilePath, JSON.stringify({ scores }, null, 2));
}

// Routes
app.post('/api/scores', async (req, res) => {
    try {
        const { playerName, score, gameMode = 'classic' } = req.body;
        const newScore = {
            id: Date.now().toString(),
            playerName,
            score: Number(score),
            gameMode,
            createdAt: new Date().toISOString()
        };

        const scores = await readScores();
        scores.push(newScore);
        await writeScores(scores);

        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: 'Error saving score' });
    }
});

app.get('/api/scores/leaderboard', async (req, res) => {
    try {
        const { gameMode = 'classic', limit = 10 } = req.query;
        const scores = await readScores();
        
        const filteredScores = scores
            .filter(score => score.gameMode === gameMode)
            .sort((a, b) => b.score - a.score)
            .slice(0, Number(limit));

        res.json(filteredScores);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
});

app.get('/api/scores/player-best', async (req, res) => {
    try {
        const { playerName, gameMode = 'classic' } = req.query;
        const scores = await readScores();
        
        const playerScores = scores
            .filter(score => score.playerName === playerName && score.gameMode === gameMode)
            .sort((a, b) => b.score - a.score);

        const bestScore = playerScores[0] || { score: 0 };
        res.json(bestScore);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching player best score' });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
