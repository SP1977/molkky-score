import styles from "../../styles/shared.module.css";
import { useMolkky } from "../contexts/MolkkyContext";
import Button from "../ui/Button";

function GameResult({
	winner,
	players,
	onRestartSamePlayers,
	onModifyPlayers,
	onResetGame,
}) {
	const { eliminatedPlayers } = useMolkky();
	// Trier les joueurs restants par ordre décroissant de points
	const sortedPlayers = players
		.filter((player) => player.id !== winner.id) // Exclure le gagnant
		.sort((a, b) => b.score - a.score); // Trier par score décroissant

	return (
		<div className="ending">
			<h3 className={`${styles.winner} subtitle-white`}>
				{winner.name} a gagné!
			</h3>
			<h4 className="subtitle-white">Classement des autres joueurs :</h4>
			<ul className={styles.playersRankingEnding}>
				{sortedPlayers.map((player) => (
					<li key={player.id}>
						{player.name} : {player.score} points
					</li>
				))}
				{eliminatedPlayers && eliminatedPlayers.length > 0 && (
					<>
						<ul className={styles.playersRankingEnding}>
							{eliminatedPlayers.map((player) => (
								<li key={player.id}>{player.name} : éliminé</li>
							))}
						</ul>
					</>
				)}
			</ul>
			<div className={styles.restartButtons}>
				<Button className={styles.btn} onClick={onRestartSamePlayers}>
					Rejouer avec les mêmes joueurs
				</Button>
				<Button className={`${styles.btn}`} onClick={onModifyPlayers}>
					Ajouter/Supprimer des joueurs
				</Button>
				<Button className={`${styles.btn}`} onClick={onResetGame}>
					Recommencer à zéro
				</Button>
			</div>
		</div>
	);
}

export default GameResult;
