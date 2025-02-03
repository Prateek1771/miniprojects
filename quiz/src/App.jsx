import React, { useState, useEffect } from 'react';

const QUIZ_QUESTIONS = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Central Processor Utility"],
    correctAnswer: "Central Processing Unit"
  },
  {
    question: "What is an algorithm?",
    options: ["A hardware component", "A step-by-step procedure for solving a problem", "A type of computer network", "A programming language"],
    correctAnswer: "A step-by-step procedure for solving a problem"
  },
  {
    question: "What is binary?",
    options: ["A type of computer", "A number system with two digits (0 and 1)", "A programming technique", "A computer component"],
    correctAnswer: "A number system with two digits (0 and 1)"
  },
  {
    question: "What does RAM stand for?",
    options: ["Random Access Memory", "Read Access Memory", "Random Algorithmic Memory", "Read Algorithmic Memory"],
    correctAnswer: "Random Access Memory"
  },
  {
    question: "What is an API?",
    options: ["A programming language", "Application Programming Interface", "Advanced Programming Instruction", "Automated Program Integration"],
    correctAnswer: "Application Programming Interface"
  },
  {
    question: "What is object-oriented programming?",
    options: ["A programming paradigm using objects and classes", "A type of computer hardware", "A network configuration", "A database design"],
    correctAnswer: "A programming paradigm using objects and classes"
  },
  {
    question: "What is a compiler?",
    options: ["A type of computer virus", "A program that translates high-level code to machine code", "A computer network", "A type of computer memory"],
    correctAnswer: "A program that translates high-level code to machine code"
  },
  {
    question: "What is a boolean?",
    options: ["A complex mathematical concept", "A data type with two possible values (true or false)", "A type of computer network", "A programming language"],
    correctAnswer: "A data type with two possible values (true or false)"
  },
  {
    question: "What does HTTP stand for?",
    options: ["High Transfer Text Protocol", "Hyper Text Transfer Protocol", "Hyper Transfer Text Protocol", "High Text Transfer Protocol"],
    correctAnswer: "Hyper Text Transfer Protocol"
  },
  {
    question: "What is recursion?",
    options: ["A type of computer virus", "A programming technique where a function calls itself", "A network configuration", "A hardware component"],
    correctAnswer: "A programming technique where a function calls itself"
  },
  {
    question: "What is a database?",
    options: ["A type of computer", "An organized collection of data", "A programming language", "A computer component"],
    correctAnswer: "An organized collection of data"
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Systematic Query Language", "Standard Query Language"],
    correctAnswer: "Structured Query Language"
  },
  {
    question: "What is an operating system?",
    options: ["A computer program that manages computer hardware and software", "A type of computer virus", "A programming language", "A network protocol"],
    correctAnswer: "A computer program that manages computer hardware and software"
  },
  {
    question: "What is a loop in programming?",
    options: ["A type of computer cable", "A control structure that repeats a block of code", "A network configuration", "A data type"],
    correctAnswer: "A control structure that repeats a block of code"
  },
  {
    question: "What is cloud computing?",
    options: ["Computing using actual clouds", "Delivery of computing services over the internet", "A type of computer hardware", "A programming technique"],
    correctAnswer: "Delivery of computing services over the internet"
  },
  {
    question: "What is an algorithm's time complexity?",
    options: ["The physical size of the algorithm", "The amount of time an algorithm takes to complete", "The number of lines of code", "The memory used by the algorithm"],
    correctAnswer: "The amount of time an algorithm takes to complete"
  },
  {
    question: "What is Big O notation?",
    options: ["A mathematical notation describing algorithm performance", "A programming language", "A type of computer network", "A hardware specification"],
    correctAnswer: "A mathematical notation describing algorithm performance"
  },
  {
    question: "What is a network protocol?",
    options: ["A set of rules governing network communication", "A type of computer virus", "A programming language", "A hardware component"],
    correctAnswer: "A set of rules governing network communication"
  },
  {
    question: "What is encapsulation in OOP?",
    options: ["A packaging technique", "Hiding internal details and providing an interface", "A type of network security", "A programming language feature"],
    correctAnswer: "Hiding internal details and providing an interface"
  },
  {
    question: "What is a cache?",
    options: ["A type of computer virus", "A high-speed data storage layer", "A network configuration", "A programming technique"],
    correctAnswer: "A high-speed data storage layer"
  },
  {
    question: "What is a variable in programming?",
    options: ["A constant value", "A storage location paired with an associated symbolic name", "A type of computer hardware", "A network protocol"],
    correctAnswer: "A storage location paired with an associated symbolic name"
  },
  {
    question: "What does DNS stand for?",
    options: ["Digital Name System", "Domain Name System", "Dynamic Network Service", "Distributed Network System"],
    correctAnswer: "Domain Name System"
  },
  {
    question: "What is a firewall?",
    options: ["A type of computer", "A network security system", "A programming technique", "A data storage method"],
    correctAnswer: "A network security system"
  },
  {
    question: "What is inheritance in OOP?",
    options: ["A legal concept", "A mechanism where a class can inherit properties from another class", "A network configuration", "A database design"],
    correctAnswer: "A mechanism where a class can inherit properties from another class"
  },
  {
    question: "What is polymorphism?",
    options: ["A type of computer virus", "The ability of different objects to respond in a unique way to the same message", "A network protocol", "A hardware component"],
    correctAnswer: "The ability of different objects to respond in a unique way to the same message"
  },
  {
    question: "What is blockchain?",
    options: ["A type of computer network", "A decentralized and distributed ledger technology", "A programming language", "A computer component"],
    correctAnswer: "A decentralized and distributed ledger technology"
  },
  {
    question: "What is machine learning?",
    options: ["A type of computer hardware", "A branch of AI that allows systems to learn and improve from experience", "A network configuration", "A programming technique"],
    correctAnswer: "A branch of AI that allows systems to learn and improve from experience"
  },
  {
    question: "What is TCP/IP?",
    options: ["A programming language", "A set of communication protocols for interconnected networks", "A computer component", "A database system"],
    correctAnswer: "A set of communication protocols for interconnected networks"
  },
  {
    question: "What is a kernel?",
    options: ["A type of computer virus", "The core of an operating system", "A network protocol", "A programming technique"],
    correctAnswer: "The core of an operating system"
  },
  {
    question: "What is scalability?",
    options: ["A type of computer hardware", "The ability of a system to handle growing amount of work", "A network configuration", "A programming language feature"],
    correctAnswer: "The ability of a system to handle growing amount of work"
  }
];

function QuizApp() {
  const [stage, setStage] = useState('setup');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Prepare quiz questions when starting the quiz
  const startQuiz = () => {
    // Always use all 30 questions for a comprehensive CS quiz
    setQuizQuestions(QUIZ_QUESTIONS);
    setStage('quiz');
  };

  // Timer and question progression logic
  useEffect(() => {
    let timer;
    if (stage === 'quiz' && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else if (timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [stage, timeRemaining]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  // Move to next question or submit quiz
  const handleNextQuestion = () => {
    setTimeRemaining(30);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStage('result');
    }
  };

  // Calculate quiz results
  const calculateResult = () => {
    let correctCount = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    return {
      correct: correctCount,
      wrong: quizQuestions.length - correctCount,
      percentage: Math.round((correctCount / quizQuestions.length) * 100)
    };
  };

  // Restart quiz
  const restartQuiz = () => {
    setStage('setup');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(30);
  };

  // Render setup stage
  const renderSetupStage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">CS Concepts Quiz</h1>
        <div className="text-center text-white mb-4">
          Quiz Details:
          <p className="text-gray-300">• Total Questions: 30</p>
          <p className="text-gray-300">• Time per Question: 30 seconds</p>
        </div>
        <button 
          onClick={startQuiz}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition duration-300"
        >
          Start CS Concepts Quiz
        </button>
      </div>
    </div>
  );

  // Render quiz stage
  const renderQuizStage = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
          {/* Question Tracker */}
          <div className="absolute top-4 left-4 text-white text-xl font-bold">
            Question {currentQuestionIndex + 1}/30
          </div>

          {/* Timer */}
          <div className="absolute top-4 right-4 text-white text-2xl font-bold">
            {timeRemaining}s
          </div>

          {/* Question */}
          <h2 className="text-2xl text-white mb-6 text-center">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`py-3 rounded-lg text-white transition duration-300 ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNextQuestion}
            className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition duration-300"
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  };

  // Render result stage
  const renderResultStage = () => {
    const result = calculateResult();

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Quiz Result</h1>
          <div className="mb-6">
            <div className="text-green-400 text-2xl mb-2">Correct: {result.correct}/30</div>
            <div className="text-red-400 text-2xl mb-2">Wrong: {result.wrong}/30</div>
            <div className="text-blue-400 text-2xl">Percentage: {result.percentage}%</div>
          </div>
          <button 
            onClick={restartQuiz}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition duration-300"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  };

  // Render different stages based on current stage
  return (
    <>
      {stage === 'setup' && renderSetupStage()}
      {stage === 'quiz' && renderQuizStage()}
      {stage === 'result' && renderResultStage()}
    </>
  );
}

export default QuizApp;