import { useState } from "react"
import Board from "./Board"
import AIPlayer from "./AIPlayer"
import type { GameMode } from "../App"

interface GameBoardProps {
  gameMode: GameMode
}

export default function GameBoard({ gameMode }: GameBoardProps) {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function restartGame() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start"
    return (
      <li key={move} className="mb-2">
        <button
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mr-8 mb-8 md:mb-0 flex-1">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        {gameMode?.startsWith("ai-") && (
          <AIPlayer
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            difficulty={gameMode.split("-")[1] as "easy" | "medium" | "hard"}
          />
        )}
        <div className="mt-4 flex justify-center">
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Restart Game
          </button>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Game History</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

