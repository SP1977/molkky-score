import {
	createContext,
	useContext,
	useReducer,
	useState,
	useEffect,
	useMemo,
} from "react";
import {
	isFault,
	isEliminated,
	isWinner,
	getLeader,
} from "../../utils/scoreLogic";

const MolkkyContext = createContext();

const initialState = {
	status: "addPlayers",
	winner: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "addPlayers":
			return { ...state, status: "form" };
		case "startGame":
			return { ...state, status: "letsPlay" };
		case "endGame":
			return { ...state, status: "gameOver", winner: action.winner };
		case "restartSamePlayers":
			return { ...state, status: "letsPlay" };
		case "modifyPlayers":
			return { ...state, status: "addPlayers" };
		case "resetGame":
			return { status: "addPlayers" };
		default:
			throw new Error("Action inconnue");
	}
}

function MolkkyProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [players, setPlayers] = useState([]);
	const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
	const [history, setHistory] = useState([]);
	const [winner, setWinner] = useState(null);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
	const [message, setMessage] = useState("");
	const [score, setScore] = useState("");
	const [hasScoredThisTurn, setHasScoredThisTurn] = useState(false);
	const canUndo = history.length > 0;

	const shufflePlayers = (array) => array.sort(() => Math.random() - 0.5);

	function handleAddPlayer(player) {
		setPlayers((prev) => [...prev, player]);
	}

	function handleRemovePlayer(playerId) {
		setPlayers((prev) => prev.filter((p) => p.id !== playerId));
	}

	function handleEndGame(winner) {
		setWinner(winner);
		dispatch({ type: "endGame", winner });
	}

	function clearHistory() {
		setHistory([]);
		setHasScoredThisTurn(false);
		setMessage("");
	}

	function handleRestartSamePlayers() {
		const resetPlayers = [...players, ...eliminatedPlayers].map((p) => ({
			...p,
			score: 0,
			penalty: 0,
		}));

		setPlayers(resetPlayers);
		setEliminatedPlayers([]);

		// Recalculate currentPlayerIndex
		setCurrentPlayerIndex((i) =>
			resetPlayers.length === 0 ? 0 : i >= resetPlayers.length ? 0 : i
		);

		clearHistory();
		dispatch({ type: "restartSamePlayers" });
	}

	function handleModifyPlayers() {
		const resetPlayers = [...players, ...eliminatedPlayers].map((p) => ({
			...p,
			score: 0,
			penalty: 0,
		}));
		setPlayers(resetPlayers);
		setEliminatedPlayers([]);
		setCurrentPlayerIndex((i) => (i >= resetPlayers.length ? 0 : i));
		clearHistory();
		dispatch({ type: "modifyPlayers" });
	}

	function handleResetGame() {
		setPlayers([]);
		setEliminatedPlayers([]);
		setHistory([]);
		setCurrentPlayerIndex(0);
		dispatch({ type: "resetGame" });
	}

	// Main logic for handling score updates
	function handleScoreUpdate(playerId, newScore) {
		// only for robustness, as the numpad limits already the score to numbers between 0 and 12
		if (isNaN(newScore) || newScore < 0 || newScore > 12) {
			setMessage("Le score doit être compris entre 0 et 12!");
			setScore("");
			return;
		}

		setMessage("");

		// Find the current player and their index
		const currentPlayer = players.find((p) => p.id === playerId);
		if (!currentPlayer) return;

		let eliminated = false;

		// Update the player's score and penalty
		const updatedPlayers = players
			.map((player) => {
				if (player.id !== playerId) return player;

				let updatedScore = player.score + newScore;
				if (updatedScore > 50) updatedScore = 25;

				let updatedPenalty = player.penalty;

				// Faults and elimination logic
				if (isFault(newScore)) {
					updatedPenalty++;
					if (updatedPenalty === 2) {
						setMessage(
							`${player.name} : si vous ne marquez pas de points au prochain tour, vous serez éliminé.`
						);
					}
					if (isEliminated(updatedPenalty)) {
						eliminated = true;
						setEliminatedPlayers((prev) => [...prev, player]);
						setMessage(`${player.name} a été éliminé.`);
						setHasScoredThisTurn(false);
						setHistory([]);
						return null;
					}
				} else {
					updatedPenalty = 0;
				}

				// History and winner logic
				const updatedPlayer = {
					...player,
					score: updatedScore,
					penalty: updatedPenalty,
				};
				setHistory((h) => [...h, { ...player }]);
				if (isWinner(updatedScore)) {
					setWinner(updatedPlayer);
					handleEndGame(updatedPlayer);
				}
				return updatedPlayer;
			})
			.filter(Boolean);

		// If one player remains, end the game (the remaining player is the winner)
		if (updatedPlayers.length === 1) handleEndGame(updatedPlayers[0]);
		setPlayers(updatedPlayers);
		if (eliminated) return;

		// Fix: ensure currentPlayerIndex is updated relative to remaining players
		const validIndex = updatedPlayers.findIndex((p) => p.id === playerId);
		const nextIndex =
			validIndex >= 0 ? (validIndex + 1) % updatedPlayers.length : 0;
		setCurrentPlayerIndex(nextIndex);
		setHasScoredThisTurn(true);
	}

	function handleUndo() {
		if (history.length === 0) return;

		const newHistory = [...history];
		const last = newHistory.pop();

		if (!last) return;

		const updatedPlayers = players.map((p) =>
			p.id === last.id ? last : p
		);
		setPlayers(updatedPlayers);
		// setHistory(newHistory);
		setHistory([]);

		// Find the index of the last player in the updated players list
		const restoredPlayerIndex = players.findIndex((p) => p.id === last.id);
		if (restoredPlayerIndex !== -1) {
			setCurrentPlayerIndex(restoredPlayerIndex);
		}
		setHasScoredThisTurn(false);
	}

	const topPlayers = useMemo(() => getLeader(players), [players]);

	useEffect(() => {
		getLeader(players);
	}, [players]);

	return (
		<MolkkyContext.Provider
			value={{
				state,
				dispatch,
				players,
				shufflePlayers,
				handleAddPlayer,
				handleRemovePlayer,
				handleEndGame,
				handleRestartSamePlayers,
				handleModifyPlayers,
				handleResetGame,
				currentPlayerIndex,
				topPlayers,
				winner,
				handleScoreUpdate,
				handleUndo,
				eliminatedPlayers,
				setEliminatedPlayers,
				message,
				setMessage,
				score,
				setScore,
				hasScoredThisTurn,
				canUndo,
				setCurrentPlayerIndex,
			}}
		>
			{children}
		</MolkkyContext.Provider>
	);
}

function useMolkky() {
	const context = useContext(MolkkyContext);
	if (context === undefined)
		throw new Error("MolkkyContext must be used within a MolkkyProvider");
	return context;
}

export { MolkkyProvider, useMolkky };
