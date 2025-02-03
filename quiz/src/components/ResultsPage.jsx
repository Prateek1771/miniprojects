import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const ResultsPage = () => {
  const location = useLocation();
  const { selectedAnswers, questions } = location.state || {};
  
  const calculateResults = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      } else if (selectedAnswers[index] === undefined) {
        unansweredCount++;
      } else {
        wrongCount++;
      }
    });
    
    return {
      correct: correctCount,
      wrong: wrongCount,
      unanswered: unansweredCount,
      total: questions.length
    };
  };
  
  const results = calculateResults();
  const scorePercentage = ((results.correct / results.total) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Quiz Results</h2>
        <div className="mb-6">
          <div className="text-2xl font-bold text-white mb-2">
            Score: {scorePercentage}%
          </div>
          <div className="flex justify-around mb-6">
            <div>
              <div className="text-green-500 text-4xl font-bold">{results.correct}</div>
              <div className="text-white">Correct</div>
            </div>
            <div>
              <div className="text-red-500 text-4xl font-bold">{results.wrong}</div>
              <div className="text-white">Wrong</div>
            </div>
            <div>
              <div className="text-yellow-500 text-4xl font-bold">{results.unanswered}</div>
              <div className="text-white">Unanswered</div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-xl text-white mb-4">Detailed Performance</h3>
            <div className="flex justify-between">
              <div className="text-white">Total Questions:</div>
              <div className="font-bold text-white">{results.total}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-green-500">Correct Answers:</div>
              <div className="font-bold text-green-500">{results.correct}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-red-500">Wrong Answers:</div>
              <div className="font-bold text-red-500">{results.wrong}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-yellow-500">Unanswered:</div>
              <div className="font-bold text-yellow-500">{results.unanswered}</div>
            </div>
          </div>

          <div className="space-y-4">
            <Link 
              to="/" 
              className="w-full block py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition duration-300"
            >
              Restart Quiz
            </Link>
            
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold rounded-lg hover:from-green-700 hover:to-teal-600 transition duration-300"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;