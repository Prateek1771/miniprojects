import { useEffect } from "react"
import { calculateWinner } from "./Board"

interface AIPlayerProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
  difficulty: "easy" | "medium" | "hard"
}

export default function AIPlayer({ xIsNext, squares, onPlay, difficulty }: AIPlayerProps) {
  useEffect(() => {
    if (!xIsNext && !calculateWinner(squares)) {
      const timer = setTimeout(() => {
        makeAIMove()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [xIsNext, squares])

  function makeAIMove() {
    let move: number
    switch (difficulty) {
      case "easy":
        move = makeRandomMove()
        break
      case "medium":
        move = Math.random() < 0.5 ? makeBestMove() : makeRandomMove()
        break
      case "hard":
        move = makeBestMove()
        break
      default:
        move = makeRandomMove()
    }

    const nextSquares = squares.slice()
    nextSquares[move] = "O"
    onPlay(nextSquares)
  }

  function makeRandomMove(): number {
    const availableMoves = squares.reduce((acc: number[], square, index) => {
      if (square === null) {
        acc.push(index)
      }
      return acc
    }, [])
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  function makeBestMove(): number {
    let bestScore = Number.NEGATIVE_INFINITY
    let bestMove = -1
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = "O"
        const score = minimax(squares, 0, false)
        squares[i] = null
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    return bestMove
  }

  function minimax(board: (string | null)[], depth: number, isMaximizing: boolean): number {
    const winner = calculateWinner(board)
    if (winner === "O") return 10 - depth
    if (winner === "X") return depth - 10
    if (board.every((square) => square !== null)) return 0

    if (isMaximizing) {
      let bestScore = Number.NEGATIVE_INFINITY
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O"
          const score = minimax(board, depth + 1, false)
          board[i] = null
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Number.POSITIVE_INFINITY
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X"
          const score = minimax(board, depth + 1, true)
          board[i] = null
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  return null
}

