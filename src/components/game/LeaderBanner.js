import styles from "../../styles/shared.module.css";
import { isTie } from "../../utils/scoreLogic";

function LeaderBanner({ leaders }) {
	if (!leaders.length || leaders[0].score === 0) return null;

	const equality = isTie(leaders);

	return (
		<div className={styles.ribbonWrapper}>
			<caption className={styles.ribbon}>
				{equality ? "Égalité entre : " : "En tête : "}
				<span className={styles.players}>
					{equality
						? leaders.map((p) => p.name).join(", ")
						: leaders[0].name}
				</span>
			</caption>
		</div>
	);
}

export default LeaderBanner;
