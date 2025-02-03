import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import GameBoard from "./components/GameBoard";
import AIDifficultyModal from "./components/AIDifficultyModal";
import "./App.css";

export type GameMode = "ai-easy" | "ai-medium" | "ai-hard" | "friend" | null;

function App() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function handleModeSelect(mode: GameMode) {
    if (mode === "friend") {
      setGameMode(mode);
    } else {
      setShowAIModal(true);
    }
  }

  function handleAIDifficultySelect(difficulty: "easy" | "medium" | "hard") {
    setGameMode(`ai-${difficulty}` as GameMode);
    setShowAIModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Tic-Tac-Toe</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        {gameMode === null ? <LandingPage onModeSelect={handleModeSelect} /> : <GameBoard gameMode={gameMode} />}
      </div>
      {showAIModal && <AIDifficultyModal onSelect={handleAIDifficultySelect} onClose={() => setShowAIModal(false)} />}
    </div>
  );
}

export default App;

