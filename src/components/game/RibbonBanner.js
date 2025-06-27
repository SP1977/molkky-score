import styles from "../../styles/shared.module.css";
import { isTie } from "../../utils/scoreLogic";

function RibbonBanner({ leaders }) {
	if (!leaders.length) return null;

	const firstPlayer = leaders[0];
	const isFirstTurn = firstPlayer.score === 0;

	const equality = isTie(leaders);

	return (
		<div className={styles.ribbonWrapper}>
			<p className={styles.ribbon}>
				{isFirstTurn ? (
					<>
						<span className={styles.players}>
							{firstPlayer.name}
						</span>{" "}
						joue en premier
					</>
				) : (
					<>
						{equality ? "Égalité : " : "En tête : "}
						<span className={styles.players}>
							{equality
								? leaders.map((p) => p.name).join(", ")
								: firstPlayer.name}
						</span>
					</>
				)}
			</p>
		</div>
	);
}

export default RibbonBanner;
