import styles from "../../styles/shared.module.css";
import { useState } from "react";
import Button from "../ui/Button";

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
			<h3 className="subtitle-white">Qui joue?</h3>
			<form className={styles.registrationForm} onSubmit={handleSubmit}>
				<input
					autoFocus
					type="text"
					placeholder="Nom du joueur"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button small>
					<img
						src="./icons/plus1.svg"
						alt="ajouter un joueur"
						title="ajouter un jour"
						className="btn-icon"
					/>
				</Button>
			</form>
		</>
	);
}
export default PlayersInscription;
