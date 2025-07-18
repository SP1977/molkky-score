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
			<div className={styles.ribbonWrapper}>
				<p className={`${styles.ribbon} subtitle-white`}>
					{winner.name} a gagné!
				</p>
			</div>

			<ul className={styles.playersRankingEnding}>
				{[...sortedPlayers, ...eliminatedPlayers].map(
					(player, index) => {
						const isEliminated = eliminatedPlayers.some(
							(p) => p.id === player.id
						);
						return (
							<li key={player.id}>
								{index + 2}{" "}
								<span className="notbold">{player.name}</span>
								<span>
									{isEliminated ? "éliminé" : player.score}
								</span>
							</li>
						);
					}
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
