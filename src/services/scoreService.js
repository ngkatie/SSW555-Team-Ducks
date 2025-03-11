const API_BASE_URL = 'http://localhost:5000/api';

export const scoreService = {
    // Add a new score
    async addScore(playerName, score, gameMode = 'classic') {
        try {
            const response = await fetch(`${API_BASE_URL}/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerName, score, gameMode }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding score:', error);
            throw error;
        }
    },

    // Get leaderboard
    async getLeaderboard(gameMode = 'classic', limit = 10) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/scores/leaderboard?gameMode=${gameMode}&limit=${limit}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            throw error;
        }
    },

    // Get player's best score
    async getPlayerBestScore(playerName, gameMode = 'classic') {
        try {
            const response = await fetch(
                `${API_BASE_URL}/scores/player-best?playerName=${playerName}&gameMode=${gameMode}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching player best score:', error);
            throw error;
        }
    },
}; 