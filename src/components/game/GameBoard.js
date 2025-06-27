import { useMolkky } from "../contexts/MolkkyContext";
import { useMemo } from "react";
import RibbonBanner from "./RibbonBanner";
import ScoreTable from "./ScoreTable";
import ScorePad from "./ScorePad";
import GameResult from "./GameResult";
import { isWinner, getLeader } from "../../utils/scoreLogic";

const GameBoard = () => {
	const { players, currentPlayerIndex, setCurrentPlayerIndex } = useMolkky();

	const leaders = useMemo(() => getLeader(players), [players]);
	const gameOver = useMemo(
		() => players.some((p) => isWinner(p.score)),
		[players]
	);

	// security check: ensure there are players before proceeding
	if (!players.length) return null;

	// Verify if the current player index is valid
	const validIndex = Math.min(currentPlayerIndex, players.length - 1);
	const currentPlayer = players[validIndex];

	// Fix index if it is out of bounds
	if (currentPlayerIndex !== validIndex) {
		setCurrentPlayerIndex(validIndex);
		return null; // wait next render with the correct index
	}

	if (gameOver) {
		return <GameResult winner={leaders[0]} />;
	}

	return (
		<>
			<RibbonBanner leaders={leaders} />
			<ScoreTable players={players} currentPlayer={currentPlayer} />
			<ScorePad />
		</>
	);
};

export default GameBoard;
