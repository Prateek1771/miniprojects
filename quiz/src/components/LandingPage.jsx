import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [questionCount, setQuestionCount] = useState(10);
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz', { state: { questionCount } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">CS Quiz Master</h1>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Select Number of Questions</label>
          <input 
            type="range" 
            min="5" 
            max="30" 
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-white mt-2">{questionCount} Questions</div>
        </div>
        <button 
          onClick={startQuiz}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition duration-300"
        >
          Start Computer Science Quiz
        </button>
      </div>
    </div>
  );
};

export default LandingPage;