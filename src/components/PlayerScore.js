import { useState } from "react";

function PlayerScore({ player, onScoreUpdate, isCurrent }) {
	// const inputRef = useRef(null);

	// Donner le focus à l'input lorsque le joueur est le "current player"
	// useEffect(() => {
	// 	if (isCurrent && inputRef.current) {
	// 		inputRef.current.focus();
	// 	}
	// }, [isCurrent]);

	const [score, setScore] = useState("");

	function handleScore(e) {
		e.preventDefault();
		const parsedScore = parseInt(score, 10); // Conversion en nombre
		if (isNaN(parsedScore)) return; // Ne rien faire si la conversion échoue
		if (parsedScore > 12) {
			alert("Le score maximum est de 12 !");
			setScore("");
			return; // Vérifier si le score est supérieur à 12 et empêcher l'envoi du score
		}
		onScoreUpdate(player.id, parsedScore); // Appeler la fonction passée par le parent
		setScore("");
	}

	return (
		<tr className="table-titles">
			<td>{player.name}</td>
			<td>{player.penalty}</td>
			<td>{player.score}</td>
			<td>
				{isCurrent ? (
					<form className="points-form" onSubmit={handleScore}>
						<input
							type="text"
							placeholder="points"
							value={score}
							onChange={(e) => setScore(e.target.value)}
						/>
						<button type="submit">
							<img
								src="./icons/plus2.svg"
								alt="ajouter les points"
								title="ajouter les points"
								className="btn-icon"
							/>
						</button>
					</form>
				) : (
					"-"
				)}
			</td>
		</tr>
	);
}

export default PlayerScore;
