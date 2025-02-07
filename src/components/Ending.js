import style from "./Button.module.css";
import React from "react";
import { useMolkky } from "./contexts/MolkkyContext";

function Ending({
	winner,
	players,
	onRestartSamePlayers,
	onModifyPlayers,
	onResetGame,
}) {
	const { eliminatedPlayers } = useMolkky();
	console.log("Liste des éliminés dans Ending :", eliminatedPlayers); // Debug
	// Trier les joueurs restants par ordre décroissant de points
	const sortedPlayers = players
		.filter((player) => player.id !== winner.id) // Exclure le gagnant
		.sort((a, b) => b.score - a.score); // Trier par score décroissant

	return (
		<div className="ending">
			<h3 className="subtitle-white winner">{winner.name} a gagné!</h3>
			<h4 className="subtitle-white">Classement des autres joueurs :</h4>
			<ul className="players-ranking-ending">
				{sortedPlayers.map((player) => (
					<li key={player.id}>
						{player.name} : {player.score} points
					</li>
				))}
				{eliminatedPlayers && eliminatedPlayers.length > 0 && (
					<>
						<ul className="players-ranking-ending">
							{eliminatedPlayers.map((player) => (
								<li key={player.id}>{player.name} : éliminé</li>
							))}
						</ul>
					</>
				)}
			</ul>
			<div className="restart-buttons">
				<button
					className={`${style.btn}`}
					onClick={onRestartSamePlayers}
				>
					Recommencer avec les mêmes joueurs
				</button>
				<button className={`${style.btn}`} onClick={onModifyPlayers}>
					Ajouter/Supprimer des joueurs
				</button>
				<button className={`${style.btn}`} onClick={onResetGame}>
					Recommencer à zéro
				</button>
			</div>
		</div>
	);
}

export default Ending;
