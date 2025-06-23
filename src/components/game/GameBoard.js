import { useMolkky } from "../contexts/MolkkyContext";
import LeaderBanner from "./LeaderBanner";
import ScoreTable from "./ScoreTable";
import WarningBox from "./WarningBox";
import ScorePad from "./ScorePad";
import GameResult from "./GameResult";
import { isWinner, getLeader } from "../../utils/scoreLogic";

const GameBoard = () => {
	const {
		players,
		currentPlayerIndex,
		setCurrentPlayerIndex, // 🔧 nécessite d'être exposé dans le context
	} = useMolkky();

	// Sécurité si aucun joueur
	if (!players.length) return null;

	// Vérifie que l'index est toujours valide
	const validIndex = Math.min(currentPlayerIndex, players.length - 1);
	const currentPlayer = players[validIndex];

	// Répare l'index si cassé
	if (currentPlayerIndex !== validIndex) {
		setCurrentPlayerIndex(validIndex);
		return null; // attend le prochain render avec l'index corrigé
	}

	const leaders = getLeader(players);
	const gameOver = players.some((p) => isWinner(p.score));

	if (gameOver) {
		return <GameResult winner={leaders[0]} />;
	}

	return (
		<>
			<h3 className="subtitle-white">Tour de : {currentPlayer.name}</h3>
			<WarningBox />
			<LeaderBanner leaders={leaders} />
			<ScoreTable players={players} currentPlayer={currentPlayer} />
			<ScorePad />
		</>
	);
};

export default GameBoard;
