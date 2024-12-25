'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import fetchTrivia from '../../lib/triviaFetch';

interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function decodeHtml(html: string): string {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
}

export default function Home() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const fetchTriviaQuestions = async () => {
    const triviaQuestions = await fetchTrivia(); 
    setQuestions(triviaQuestions);
    setLoading(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  useEffect(() => {
    fetchTriviaQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (questions[currentQuestion].correct_answer === answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (loading) return <div className="text-center p-6">Loading trivia questions...</div>;

  if (currentQuestion >= questions.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mb-6 overflow-hidden">
          Game Over!
        </h1>
        <p>Thank you for playing 🙏</p>
        <p className="text-xl mt-4">Your score: {score}</p>
        <button
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onClick={fetchTriviaQuestions}
        >
          Retry
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="overflow-hidden">
        <Image src="/trivy_logo.svg" alt="Trivy" width={256} height={256} />
      </div>

      <div className="p-6 rounded-lg shadow-md w-full max-w-lg">
        <p className="text-xl text-center font-medium mb-6">
          {decodeHtml(question.question)}
        </p>
        <div className="space-y-4">
          {question.incorrect_answers
            .concat(question.correct_answer)
            .sort()
            .map((answer, index) => (
              <button
                key={index}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onClick={() => handleAnswer(answer)}
              >
                {decodeHtml(answer)}
              </button>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-6 text-lg text-white">
        <p>Score: {score}</p>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
      </div>
    </div>
  );
}