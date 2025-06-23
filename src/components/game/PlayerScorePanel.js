import styles from "../../styles/shared.module.css";

function PlayerScorePanel({ player, isCurrent }) {
	return (
		<>
			<tr
				className={`${styles.tableTitles} ${
					isCurrent ? styles.highlightedRow : ""
				}`}
			>
				<td className="word-break">{player.name}</td>
				<td>{player.penalty}</td>
				<td>{player.score}</td>
			</tr>
			<tr className={isCurrent ? styles.highlightedRow : ""}>
				<td colSpan="4" className={styles.playerHistory}>
					{player.history?.join(" ")}
				</td>
			</tr>
		</>
	);
}

export default PlayerScorePanel;
