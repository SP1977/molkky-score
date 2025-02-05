import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const MolkkyContext = createContext();

const initialState = {
	status: "appStarted",
	winner: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "subscribe":
			return {
				...state,
				status: "addPlayers",
			};
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
			return { status: "appStarted" };

		default:
			throw new Error("Action inconnue");
	}
}

function MolkkyProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [players, setPlayers] = useState([]);
	const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
	const [topPlayers, setTopPlayers] = useState([]);
	const [history, setHistory] = useState([]);
	const [winner, setWinner] = useState(null);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

	function shufflePlayers(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	function handleAddPlayer(player) {
		setPlayers((prev) => [...prev, player]);
	}

	function handleRemovePlayer(playerId) {
		setPlayers((prev) => prev.filter((player) => player.id !== playerId));
	}

	function handleEndGame(winner) {
		setWinner(winner);
		dispatch({ type: "endGame", winner });
	}

	function handleRestartSamePlayers() {
		// Fusionner les joueurs actifs et éliminés
		const resetPlayers = [...players, ...eliminatedPlayers]
			.filter(Boolean) // On garde uniquement les joueurs valides
			.map((player) => ({
				...player,
				score: 0, // Remettre les scores à 0
				penalty: 0, // Remettre les pénalités à 0
			}));

		// Mettre à jour les joueurs actifs et vider les joueurs éliminés
		setPlayers(resetPlayers);
		setEliminatedPlayers([]); // On s'assure que cette liste est bien vidée
		setCurrentPlayerIndex(0); // Redémarrer à partir du premier joueur

		dispatch({ type: "restartSamePlayers" });
	}

	function handleModifyPlayers() {
		// Réintégrer tous les joueurs (actifs et éliminés)
		const allPlayers = [...players, ...eliminatedPlayers];

		// Réinitialiser les scores et pénalités des joueurs
		const resetPlayers = allPlayers.map((player) => ({
			...player,
			score: 0, // Réinitialise les scores
			penalty: 0, // Réinitialise les pénalités
		}));

		// Mettre à jour les états
		setPlayers(resetPlayers); // Réinitialiser la liste des joueurs actifs
		setEliminatedPlayers([]); // Vider la liste des joueurs éliminés

		// Basculer vers l'état de modification
		dispatch({ type: "modifyPlayers" });
	}

	function handleResetGame() {
		setPlayers([]);
		dispatch({ type: "resetGame" });
	}

	useEffect(() => {
		if (players.length > 0) {
			const maxScore = Math.max(...players.map((player) => player.score));
			setTopPlayers(
				players.filter((player) => player.score === maxScore)
			);
		}
	}, [players]);

	// Mise à jour du score du joueur
	function handleScoreUpdate(playerId, newScore) {
		setPlayers((prevPlayers) => {
			const updatedPlayers = prevPlayers
				.map((player) => {
					if (player.id === playerId) {
						let updatedPenalty = player.penalty;
						let updatedScore = player.score + newScore;

						// Si le joueur marque plus de 50, réinitialiser à 25
						if (updatedScore > 50) {
							updatedScore = 25;
						}

						// Si le score est exactement 50, c'est le gagnant
						if (updatedScore === 50) {
							setWinner(player);
							handleEndGame(player);
							return { ...player, score: updatedScore };
						}

						// Si le score est 0, incrémenter les pénalités
						if (newScore === 0) {
							updatedPenalty += 1;

							// Afficher un avertissement au début du 3e tour
							if (updatedPenalty === 2) {
								alert(
									`${player.name}, attention ! Si vous faites 0 points encore une fois, vous serez éliminé.`
								);
							}

							// Éliminer le joueur après 3 pénalités
							if (updatedPenalty >= 3) {
								setEliminatedPlayers((prev) => {
									const updatedEliminated = [...prev, player];
									return updatedEliminated;
								});
								return null; // Retirer le joueur des joueurs actifs
							}
						} else {
							updatedPenalty = 0; // Réinitialiser les pénalités si le joueur marque
						}

						// Historique des scores
						setHistory((prevHistory) => [
							...prevHistory,
							{
								...player,
								score: player.score,
								penalty: player.penalty,
							},
						]);

						// Met à jour le joueur actif
						return {
							...player,
							score: updatedScore,
							penalty: updatedPenalty,
						};
					}
					return player; // Pas de changement pour les autres joueurs
				})
				.filter(Boolean); // Supprime les joueurs éliminés

			// Vérification : aucun joueur restant
			if (updatedPlayers.length === 0) {
				alert("Tous les joueurs ont été éliminés. Fin du jeu !");
				return [];
			}

			// Vérification : un seul joueur restant
			if (updatedPlayers.length === 1) {
				const remainingPlayer = updatedPlayers[0];
				handleEndGame(remainingPlayer);
				return updatedPlayers;
			}

			// Retourne la liste mise à jour
			return updatedPlayers;
		});

		// Réajuster l’index du joueur actuel
		setCurrentPlayerIndex((prevIndex) => {
			const activePlayers = players.filter(Boolean);
			if (activePlayers.length === 0) return 0; // Personne actif
			return (prevIndex + 1) % activePlayers.length;
		});
	}

	function handleUndo() {
		const lastState = history.pop();
		if (lastState) {
			setPlayers((prevPlayers) =>
				prevPlayers.map((player) =>
					player.id === lastState.id ? lastState : player
				)
			);
			setHistory(history);
			setCurrentPlayerIndex(
				(prevIndex) => (prevIndex - 1 + players.length) % players.length
			);
		}
	}

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
			}}
		>
			{children}
		</MolkkyContext.Provider>
	);
}

function useMolkky() {
	const context = useContext(MolkkyContext);
	if (context === undefined)
		throw new Error("MolkkyContext was used outside of the PostProvider");
	return context;
}

export { MolkkyProvider, useMolkky };
