import styles from "../../styles/shared.module.css";

function PlayerScorePanel({ player, isCurrent }) {
	return (
		<div>
			<div
				className={`${styles.playerScoreRow} ${
					isCurrent ? styles.highlightedRow : ""
				}`}
			>
				<div className="word-break">{player.name}</div>
				<div className="flex-end">{player.penalty}</div>
				<div className="flex-end">{player.score}</div>
			</div>
			{/* <tr className={isCurrent ? styles.highlightedRow : ""}>
				<td colSpan="4" className={styles.playerHistory}>
					{player.history?.join(" ")}
				</td>
			</tr> */}
		</div>
	);
}

export default PlayerScorePanel;
