import type { Question } from './Question';

/**
 * Context data for the quiz, including questions and answers.
 */
export type QuizzData = {
  /**
   * List of questions in the quiz.
   */
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  /**
   * The list of shuffled answers for each question.
   */
  shuffledAnswersList: string[][];
  /**
   * List of answers selected by the user, mapped by question index.
   */
  answers: Map<number, string>;
  setAnswers: (a: Map<number, string>) => void;
  /**
   * Function to reset the quiz data.
   */
  reset: () => void;
};
