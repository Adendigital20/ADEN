"use client";

import { useState } from "react";
import { submitQuizScore } from "./actions";
import Link from "next/link";

type Question = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
};

export default function QuizClient({ formationId, questions }: { formationId: string, questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let currentScore = 0;
    
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore++;
      }
    });

    setScore(currentScore);
    await submitQuizScore(formationId, currentScore, questions.length);
    setIsFinished(true);
    setIsSubmitting(false);
  };

  if (isFinished) {
    const passed = score >= questions.length / 2;
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-6 text-[#0A2540]">Résultat du QCM</h2>
        <div className={`text-5xl font-extrabold mb-4 ${passed ? 'text-[#25D366]' : 'text-red-500'}`}>
          {score} / {questions.length}
        </div>
        <p className="text-lg text-gray-700 mb-8">
          {passed ? "Félicitations, vous avez validé ce test !" : "Vous n'avez pas obtenu la moyenne. Révisez et réessayez !"}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => { setIsFinished(false); setCurrentIndex(0); setAnswers({}); }} 
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Recommencer
          </button>
          <Link href="/mes-cours" className="bg-[#FF6B00] text-white px-6 py-2 rounded hover:bg-[#e56000] transition">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const selectedOption = answers[currentQuestion.id];

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-gray-500 uppercase">Question {currentIndex + 1} sur {questions.length}</span>
        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#FF6B00] h-2.5 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

      <div className="space-y-4 mb-8">
        {['A', 'B', 'C', 'D'].map((opt) => {
          const optionValue = currentQuestion[`option${opt}` as keyof Question];
          return (
            <div 
              key={opt}
              onClick={() => handleSelectOption(opt)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition ${selectedOption === opt ? 'border-[#FF6B00] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 border ${selectedOption === opt ? 'border-[#FF6B00] bg-[#FF6B00] text-white' : 'border-gray-400'}`}>
                  {opt}
                </div>
                <span>{optionValue}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        <button 
          onClick={handlePrevious} 
          disabled={currentIndex === 0}
          className="px-4 py-2 text-gray-600 disabled:opacity-50 hover:bg-gray-100 rounded transition"
        >
          Précédent
        </button>

        {currentIndex === questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length < questions.length}
            className="bg-[#25D366] text-white px-6 py-2 rounded font-bold hover:bg-[#1ebe57] transition disabled:opacity-50"
          >
            {isSubmitting ? "Validation..." : "Terminer et voir le score"}
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="bg-[#0A2540] text-white px-6 py-2 rounded hover:bg-[#1a385b] transition"
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}
