import type { Question } from "../types/Question";

const QUESTION_PER_PAGE = import.meta.env.VITE_QUESTION_PER_PAGE;
const API_ADDRESS = import.meta.env.VITE_QUESTIONNAIRE_API_ADDRESS;

export async function fetchQuestions(category: string, difficulty: string): Promise<Question[]> {
  try {
    const url = `${API_ADDRESS}?amount=${QUESTION_PER_PAGE}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch questions');
    const data = await res.json();
    return data && data.results ? data.results : [];
  } catch (error) {
    console.debug('Error when fetching questions:', error);
    throw new Error('Failed to fetch the questions.');
  }
}
