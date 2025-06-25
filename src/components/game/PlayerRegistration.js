import styles from "../../styles/shared.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/Button";

function PlayersRegistration({ onAddPlayer }) {
	const [name, setName] = useState("");

	// Formate un nom : majuscule initiale, après tiret, suppression des espaces
	function formatName(name) {
		return name
			.trim()
			.split("-")
			.map(
				(part) =>
					part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
			)
			.join("-");
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!name.trim()) return;

		const id = uuidv4();
		const formattedName = formatName(name);
		const newPlayer = {
			id,
			name: formattedName,
			score: 0,
			penalty: 0,
		};
		onAddPlayer(newPlayer);
		setName("");
	}

	return (
		<>
			<div className={styles.ribbonWrapper}>
				<h3 className={styles.ribbon}>Inscrivez des joueurs!</h3>
			</div>
			<form className={styles.registrationForm} onSubmit={handleSubmit}>
				<input
					autoFocus
					type="text"
					placeholder="Nom"
					value={name}
					onChange={(e) => setName(e.target.value)}
					maxLength={30}
				/>
				<Button type="submit" small>
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

export default PlayersRegistration;
