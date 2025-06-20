import styles from "../../styles/shared.module.css";

function Warning({ message = "" }) {
	if (!message) return null;

	return (
		<div className={styles.warningBlock}>
			<p className={styles.warning}>{message}</p>
		</div>
	);
}

export default Warning;
