import { useMolkky } from "../contexts/MolkkyContext";
import PlayerScorePanel from "./PlayerScorePanel";
import Warning from "../ui/Warning";
import Button from "../ui/Button";
import styles from "../../styles/shared.module.css";

import {
	isFault,
	isWinner,
	isEliminated,
	getLeader,
	isTie,
} from "../../utils/scoreLogic";

const ScoreCalculator = () => {
	const {
		players,
		handleScoreUpdate,
		handleUndo: undoScore,
		currentPlayerIndex,
		hasScoredThisTurn,
		message,
	} = useMolkky();

	const currentPlayer = players[currentPlayerIndex];
	const leaders = getLeader(players);
	const isEquality = isTie(players);
	const gameOver = players.some((p) => isWinner(p.score));

	const handleScore = (playerId, score) => {
		handleScoreUpdate(playerId, score);
	};

	const handleUndo = () => {
		undoScore();
	};

	// Joueur courant en tête
	const reorderedPlayers = [
		currentPlayer,
		...players.filter((_, i) => i !== currentPlayerIndex),
	];

	return (
		<>
			<h3 className="subtitle-white">Tour de : {currentPlayer.name}</h3>
			{message && (
				<div className={styles.warningBlock}>
					<p className={styles.warning}>{message}</p>
				</div>
			)}
			{isFault(currentPlayer.lastScore) && (
				<Warning message={`${currentPlayer.name} a fait une faute !`} />
			)}

			{isEliminated(currentPlayer.faults) && (
				<Warning message={`${currentPlayer.name} est éliminé.`} />
			)}

			{!gameOver && (
				<>
					{leaders.length > 0 &&
						leaders[0].score > 0 &&
						!isEquality && (
							<caption className={styles.ranking}>
								En tête:{" "}
								<span className={styles.players}>
									{leaders[0].name}
								</span>
							</caption>
						)}

					{leaders.length > 0 &&
						leaders[0].score > 0 &&
						isEquality && (
							<caption className={styles.ranking}>
								Égalité entre :{" "}
								<span className={styles.players}>
									{leaders.map((p) => p.name).join(", ")}
								</span>
							</caption>
						)}
					<table className={styles.scoreTable}>
						<thead>
							<tr className={styles.tableTitles}>
								<th>Nom</th>
								<th>Fautes</th>
								<th>Total</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{reorderedPlayers.map((player) => (
								<PlayerScorePanel
									key={player.id}
									player={player}
									isCurrent={player.id === currentPlayer.id}
									onScoreUpdate={handleScore}
								/>
							))}
						</tbody>
					</table>

					{hasScoredThisTurn && (
						<Button onClick={handleUndo} label="Annuler le score" />
					)}
				</>
			)}

			{gameOver && (
				<div className="game-over">
					<h3>Partie terminée ! Gagnant : {leaders[0].name}</h3>
				</div>
			)}
		</>
	);
};

export default ScoreCalculator;
