import styles from "../../styles/shared.module.css";

const NumberPad = ({ onClick, onUndo, disabled = false }) => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	return (
		<div className={styles.numberPad}>
			<div className={styles.numpadGrid}>
				{numbers.map((n) => (
					<button key={n} onClick={() => onClick(n)}>
						{n}
					</button>
				))}
				<button onClick={() => onClick(0)} className={styles.zeroBtn}>
					0
				</button>
				<button
					onClick={onUndo}
					className={styles.undoBtn}
					disabled={disabled}
				>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default NumberPad;
