import React from "react";

function PlayersList({ players, onRemovePlayer }) {
	return (
		<ul className="players-block">
			{players.map((player) => (
				<li className="playerlist" key={player.id}>
					{player.name}
					<button onClick={() => onRemovePlayer(player.id)}>
						<img
							src="./icons/croix.svg"
							alt="supprimer ce joueur"
							title="supprimer ce jour"
						/>
					</button>
				</li>
			))}
		</ul>
	);
}

export default PlayersList;
