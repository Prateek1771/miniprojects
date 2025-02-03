import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QUIZ_QUESTIONS } from './Quizes';

export const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionCount = location.state?.questionCount || 10;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          moveToNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const moveToNextQuestion = () => {
    if (currentQuestion < questionCount - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeRemaining(30);
    } else {
      navigate('/results', { 
        state: { 
          selectedAnswers, 
          questions: QUIZ_QUESTIONS.slice(0, questionCount) 
        } 
      });
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-bold">
            Question {currentQuestion + 1} of {questionCount}
          </span>
          <div className={`text-xl font-bold ${timeRemaining <= 10 ? 'text-red-500' : 'text-white'}`}>
            Time: {timeRemaining}s
          </div>
        </div>
        
        <div className="text-white text-xl mb-6 min-h-[100px]">
          {QUIZ_QUESTIONS[currentQuestion].question}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`py-3 rounded-lg transition duration-300 text-sm md:text-base ${
                selectedAnswers[currentQuestion] === option 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={moveToNextQuestion}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
          >
            {currentQuestion < questionCount - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;