import { useMolkky } from "../contexts/MolkkyContext";
import styles from "../../styles/shared.module.css";
import PlayerScorePanel from "./PlayerScorePanel";

function ScoreTable() {
	const { players, handleScoreUpdate, currentPlayerIndex } = useMolkky();

	// Joueur courant en tête
	const handleScore = (playerId, score) => {
		handleScoreUpdate(playerId, score);
	};

	const currentPlayer = players[currentPlayerIndex];

	const reorderedPlayers = [
		currentPlayer,
		...players.filter((_, i) => i !== currentPlayerIndex),
	];

	return (
		<table className={styles.scoreTable}>
			<thead>
				<tr className={styles.tableTitles}>
					<th>Nom</th>
					<th>Fautes</th>
					<th>Total</th>
					{/* <th>Points</th> */}
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
	);
}

export default ScoreTable;
