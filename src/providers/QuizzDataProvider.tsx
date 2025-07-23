import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Question } from '../types/Question';
import type { QuizzData } from '../types/QuizzData';
import { shuffleArray } from '../services/UtilServices';

const QuizzDataContext = createContext<QuizzData | undefined>(undefined);

export const useQuizzData = () => {
  const context = useContext(QuizzDataContext);
  if (!context) throw new Error('useQuizzData must be used within a QuizzDataProvider');
  return context;
};

export const QuizzDataProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  
  // Memoize shuffled answers for each question
  const shuffledAnswersList = useMemo(() => {
    return questions.map(q => shuffleArray([q.correct_answer, ...q.incorrect_answers]));
  }, [questions]);

  const reset = () => {
    setQuestions([]);
    setAnswers(new Map());
  };

  return (
    <QuizzDataContext.Provider value={{
      questions,
      setQuestions,
      shuffledAnswersList,
      answers,
      setAnswers,
      reset
    }}>
      {children}
    </QuizzDataContext.Provider>
  );
};
