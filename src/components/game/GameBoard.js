import { useMolkky } from "../contexts/MolkkyContext";
import LeaderBanner from "./LeaderBanner";
import Button from "../ui/Button";
import ScoreTable from "./ScoreTable";
import WarningBox from "./WarningBox";
import { isWinner, getLeader } from "../../utils/scoreLogic";

const GameBoard = () => {
	const {
		players,
		handleUndo: undoScore,
		currentPlayerIndex,
		hasScoredThisTurn,
	} = useMolkky();

	const currentPlayer = players[currentPlayerIndex];
	const leaders = getLeader(players);
	const gameOver = players.some((p) => isWinner(p.score));

	const handleUndo = () => {
		undoScore();
	};

	return (
		<>
			<h3 className="subtitle-white">Tour de : {currentPlayer.name}</h3>
			<WarningBox />
			{!gameOver && (
				<>
					<LeaderBanner leaders={leaders} />
					<ScoreTable
						players={players}
						currentPlayer={currentPlayer}
					/>
					{hasScoredThisTurn && (
						<Button onClick={handleUndo} label="Annuler le score" />
					)}
				</>
			)}

			{gameOver && (
				<div className="game-over">
					<h3>Partie terminée ! Gagnant : {leaders[0].name}</h3>
				</div>
			)}
		</>
	);
};

export default GameBoard;
