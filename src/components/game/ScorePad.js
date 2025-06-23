import { useMolkky } from "../contexts/MolkkyContext";
import NumberPad from "../ui/NumberPad";

const ScorePad = () => {
	const {
		players,
		currentPlayerIndex,
		handleScoreUpdate,
		handleUndo,
		canUndo,
	} = useMolkky();
	const currentPlayer = players[currentPlayerIndex];

	const handleClick = (value) => {
		if (currentPlayer) handleScoreUpdate(currentPlayer.id, value);
	};

	return (
		<NumberPad
			onClick={handleClick}
			onUndo={handleUndo}
			disabled={!canUndo}
		/>
	);
};

export default ScorePad;
