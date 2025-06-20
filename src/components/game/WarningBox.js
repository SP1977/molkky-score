import { useMolkky } from "../contexts/MolkkyContext";
import Warning from "../ui/Warning";
import styles from "../../styles/shared.module.css";

import { isFault, isEliminated } from "../../utils/scoreLogic";

function WarningBox() {
	const { players, currentPlayerIndex, message } = useMolkky();

	const currentPlayer = players[currentPlayerIndex];

	return (
		<>
			{message && (
				<div className={styles.warningBlock}>
					<p className={styles.warning}>{message}</p>
				</div>
			)}
			{isFault(currentPlayer.lastScore) && (
				<Warning message={`${currentPlayer.name} a fait une faute !`} />
			)}

			{isEliminated(currentPlayer.faults) && (
				<Warning message={`${currentPlayer.name} est éliminé.`} />
			)}
		</>
	);
}

export default WarningBox;
