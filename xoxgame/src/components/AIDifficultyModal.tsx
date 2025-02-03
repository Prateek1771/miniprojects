interface AIDifficultyModalProps {
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
  onClose: () => void;
}

export default function AIDifficultyModal({ onSelect, onClose }: AIDifficultyModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Select AI Difficulty</h2>
        <div className="flex flex-col space-y-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => onSelect("easy")}
          >
            Easy
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            onClick={() => onSelect("medium")}
          >
            Medium
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => onSelect("hard")}
          >
            Hard
          </button>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
