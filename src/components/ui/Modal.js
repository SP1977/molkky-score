import styles from "../../styles/shared.module.css";

const Modal = ({ message, onClose }) => {
	if (!message) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>
				<p className="notbold">{message}</p>
			</div>
		</div>
	);
};

export default Modal;
