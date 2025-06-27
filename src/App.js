import { useMolkky } from "./components/contexts/MolkkyContext";
import PlayersRegistration from "./components/game/PlayerRegistration";
import PlayersList from "./components/game/PlayersList";
import Button from "./components/ui/Button";
import GameBoard from "./components/game/GameBoard";
import GameResult from "./components/game/GameResult";
import Modal from "./components/ui/Modal";

export default function App() {
	const {
		state: { status, winner },
		dispatch,
		players,
		shufflePlayers,
		handleAddPlayer,
		handleRemovePlayer,
		handleRestartSamePlayers,
		handleModifyPlayers,
		handleResetGame,
		message,
		setMessage,
	} = useMolkky();

	// Rendre le bouton de démarrage
	const renderStartButton = () => (
		<Button
			onClick={() => {
				shufflePlayers(players);
				dispatch({ type: "startGame" });
			}}
		>
			Commencer la partie
		</Button>
	);

	// Rendre le bouton de redémarrage avec les nouveaux joueurs
	const renderModifyPlayersButton = () => (
		<Button onClick={() => dispatch({ type: "startGame" })}>
			Redémarrer avec la nouvelle liste de joueurs
		</Button>
	);

	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Mölkky</h1>
				<h2 className="subtitle">Calculateur de score</h2>
			</header>

			<main>
				{status === "addPlayers" && (
					<>
						<PlayersRegistration onAddPlayer={handleAddPlayer} />
						<PlayersList
							players={players}
							onRemovePlayer={handleRemovePlayer}
						/>
					</>
				)}

				{/* Afficher le bouton de démarrage lorsque suffisamment de joueurs sont inscrits */}
				{players.length >= 2 &&
					status !== "letsPlay" &&
					status !== "gameOver" &&
					renderStartButton()}

				{/* Afficher la phase du jeu en cours */}
				{status === "letsPlay" && <GameBoard />}

				{/* Afficher la fin de la partie avec le gagnant */}
				{status === "gameOver" && winner && (
					<GameResult
						winner={winner}
						players={players}
						onRestartSamePlayers={handleRestartSamePlayers}
						onModifyPlayers={handleModifyPlayers}
						onResetGame={handleResetGame}
					/>
				)}

				{/* Afficher l'option de modification des joueurs après la fin du jeu */}
				{status === "modifyPlayers" && (
					<>
						<PlayersRegistration onAddPlayer={handleAddPlayer} />
						<PlayersList
							players={players}
							onRemovePlayer={handleRemovePlayer}
						/>
						{renderModifyPlayersButton()}
					</>
				)}
				<Modal message={message} onClose={() => setMessage("")} />
			</main>
		</div>
	);
}
