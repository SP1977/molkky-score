import { useMolkky } from "../contexts/MolkkyContext";

function PlayerScore({ player, onScoreUpdate, isCurrent }) {
	const { score, setScore } = useMolkky();

	function handleScore(e) {
		e.preventDefault();
		const parsedScore = parseInt(score, 10);
		if (isNaN(parsedScore) || score === "") return;
		onScoreUpdate(player.id, parsedScore);
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
							autoFocus
							type="number"
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
