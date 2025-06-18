import styles from "../../styles/shared.module.css";

function Button({ children, label, onClick, small = false, icon = false }) {
	let btnClass = styles.btn;

	if (icon) {
		btnClass = styles.iconBtn;
	} else if (small) {
		btnClass = `${styles.btn} ${styles.btnSmall}`;
	}

	return (
		<button className={btnClass} onClick={onClick}>
			{children || label}
		</button>
	);
}

export default Button;
