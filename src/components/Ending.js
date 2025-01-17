import style from "./Button.module.css";
import React from "react";

function Ending({
	winner,
	players,
	onRestartSamePlayers,
	onModifyPlayers,
	onResetGame,
}) {
	// Trier les joueurs restants par ordre décroissant de points
	const sortedPlayers = players
		.filter((player) => player.id !== winner.id) // Exclure le gagnant
		.sort((a, b) => b.score - a.score); // Trier par score décroissant

	return (
		<div className="ending">
			<h3 className="subtitle-white winner">{winner.name} a gagné!</h3>
			<h4 className="subtitle-white">Classement des autres joueurs :</h4>
			<ul class="players-ranking-ending">
				{sortedPlayers.map((player) => (
					<li key={player.id}>
						{player.name} - {player.score} points
					</li>
				))}
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
