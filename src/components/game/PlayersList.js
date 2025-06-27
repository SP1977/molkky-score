import styles from "../../styles/shared.module.css";
import Button from "../ui/Button";

function PlayersList({ players, onRemovePlayer }) {
	return (
		<ul className={styles.playersBlock}>
			{players.map((player) => (
				<li className={`${styles.playerList} notbold`} key={player.id}>
					{player.name}
					<Button icon onClick={() => onRemovePlayer(player.id)}>
						<img
							src="./icons/croix.svg"
							alt="supprimer ce joueur"
							title="supprimer ce jour"
						/>
					</Button>
				</li>
			))}
		</ul>
	);
}

export default PlayersList;
