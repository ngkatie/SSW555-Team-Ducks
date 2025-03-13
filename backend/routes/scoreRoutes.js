const express = require('express');
const router = express.Router();
const { addScore, getLeaderboard, getPlayerBestScore } = require('../controllers/scoreController');

// POST /api/scores - Add a new score
router.post('/', addScore);

// GET /api/scores/leaderboard - Get leaderboard
router.get('/leaderboard', getLeaderboard);

// GET /api/scores/player-best - Get player's best score
router.get('/player-best', getPlayerBestScore);

module.exports = router; 