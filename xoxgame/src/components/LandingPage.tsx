import type { GameMode } from "../App"

interface LandingPageProps {
  onModeSelect: (mode: GameMode) => void
}

export default function LandingPage({ onModeSelect }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Choose Your Game Mode</h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
          onClick={() => onModeSelect("ai-easy")}
        >
          Play with AI
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg"
          onClick={() => onModeSelect("friend")}
        >
          Play with Friend
        </button>
      </div>
    </div>
  )
}

