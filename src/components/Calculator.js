import { useMolkky } from "./contexts/MolkkyContext";
import PlayerScore from "./PlayerScore";
import style from "./Button.module.css";

function Calculator() {
	const {
		players,
		handleScoreUpdate,
		handleUndo,
		currentPlayerIndex,
		topPlayers,
	} = useMolkky();

	// Vérifier si un score a déjà été introduit en cherchant un score supérieur à 0
	const isFirstScoreEntered = players.some((player) => player.score > 0);

	// Recherche du meilleur score :

	if (!players.length) return null;
	// Créer une nouvelle liste des joueurs avec le joueur actuel en premier
	const reorderedPlayers = [
		players[currentPlayerIndex],
		...players.filter((_, index) => index !== currentPlayerIndex),
	];

	return (
		<>
			<h3 class="subtitle-white">Partie en cours</h3>
			<table className="points-table">
				{topPlayers.length === 1 && isFirstScoreEntered && (
					<caption className="ranking">
						En tête:
						<span className="players">
							{` ${topPlayers[0].name} avec
						${topPlayers[0].score} points`}
						</span>
					</caption>
				)}
				{topPlayers.length > 1 && isFirstScoreEntered && (
					<caption className="ranking">
						Égalité:
						<span className="players">
							{` ${topPlayers
								.map((player) => player.name)
								.join(", ")}`}
						</span>
					</caption>
				)}

				<thead>
					<tr className="table-titles">
						<th>Nom</th>
						<th>Fautes</th>
						<th>Total</th>
						<th>Points</th>
					</tr>
				</thead>

				<tbody>
					{reorderedPlayers.map((player, index) => (
						<PlayerScore
							player={player}
							key={player.id}
							onScoreUpdate={handleScoreUpdate}
							isCurrent={index === 0}
						/>
					))}
				</tbody>
			</table>
			{isFirstScoreEntered && (
				<button className={`${style.btn}`} onClick={handleUndo}>
					Annuler dernier score
				</button>
			)}
		</>
	);
}

export default Calculator;
