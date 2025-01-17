import { useMolkky } from "./components/contexts/MolkkyContext";
import PlayersInscription from "./components/PlayersInscription";
import PlayersList from "./components/PlayersList";
import Button from "./components/Button";
import Calculator from "./components/Calculator";
import Ending from "./components/Ending";

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
			<header class="header">
				<h1 className="title">Mölkky</h1>
				<h2 className="subtitle">Calculateur de score</h2>
			</header>
			<main>
				{/* Afficher le bouton d'inscription des joueurs lorsque la partie n'a pas encore commencé */}
				{status === "appStarted" && (
					<Button onClick={() => dispatch({ type: "subscribe" })}>
						Inscrivez des joueurs!
					</Button>
				)}

				{/* Afficher la phase d'ajout de joueurs */}
				{status === "addPlayers" && (
					<>
						<PlayersInscription onAddPlayer={handleAddPlayer} />
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
				{status === "letsPlay" && <Calculator />}

				{/* Afficher la fin de la partie avec le gagnant */}
				{status === "gameOver" && winner && (
					<Ending
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
						<PlayersInscription onAddPlayer={handleAddPlayer} />
						<PlayersList
							players={players}
							onRemovePlayer={handleRemovePlayer}
						/>
						{renderModifyPlayersButton()}
					</>
				)}
			</main>
		</div>
	);
}
