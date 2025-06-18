/**
 * Vérifie si un score représente une faute (0 points marqués).
 * @param {number} score
 * @returns {boolean}
 */
export function isFault(score) {
	return score === 0;
}

/**
 * Calcule le score total d’un joueur à partir de son historique.
 * @param {number[]} history
 * @returns {number}
 */
export function calculateTotalScore(history) {
	return history.reduce((total, val) => total + val, 0);
}

/**
 * Vérifie si un joueur est éliminé (3 fautes ou plus).
 * @param {number} faults
 * @returns {boolean}
 */
export function isEliminated(faults) {
	return faults >= 3;
}

/**
 * Vérifie si un joueur a atteint exactement 50 points.
 * @param {number} score
 * @returns {boolean}
 */
export function isWinner(score) {
	return score === 50;
}

/**
 * Retourne le ou les joueurs ayant le score le plus élevé.
 * @param {Array<{ name: string, score: number }>} players
 * @returns {Array} liste des leaders (un ou plusieurs en cas d'égalité)
 */
export function getLeader(players) {
	const max = Math.max(...players.map((p) => p.score));
	return players.filter((p) => p.score === max);
}

/**
 * Indique s'il y a égalité entre plusieurs joueurs.
 * @param {Array<{ name: string, score: number }>} players
 * @returns {boolean}
 */
export function isTie(players) {
	const leaders = getLeader(players);

	// S'il n'y a pas encore de score > 0, pas d'égalité pertinente
	const hasScore = players.some((p) => p.score > 0);
	return hasScore && leaders.length > 1;
}
