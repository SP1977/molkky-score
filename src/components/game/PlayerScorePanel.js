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
				<div className="flex-end">{"❌".repeat(player.penalty)}</div>
				<div className="flex-end">{player.score}</div>
			</div>
		</div>
	);
}

export default PlayerScorePanel;
