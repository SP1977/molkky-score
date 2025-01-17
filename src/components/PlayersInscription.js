import style from "./Button.module.css";

import { useState } from "react";

function PlayersInscription({ onAddPlayer }) {
	const [name, setName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const id = Date.now();
		const newPlayer = {
			id,
			name,
			score: 0,
			penalty: 0,
		};
		if (!name) return;
		onAddPlayer(newPlayer);
		setName("");
	}

	return (
		<>
			<h3 class="subtitle-white">Qui joue?</h3>
			<form className="inscription-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nom du joueur"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className={`${style.btn} ${style["btn-small"]}`}>
					<img
						src="./icons/plus1.svg"
						alt="ajouter un joueur"
						title="ajouter un jour"
						className="btn-icon"
					/>
				</button>
			</form>
		</>
	);
}
export default PlayersInscription;
