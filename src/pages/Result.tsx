import { useEffect, useMemo } from 'react';
import { useQuizzData } from '../providers/QuizzDataProvider';
import { useNavigate } from 'react-router-dom';
import { QuestionResult } from '../components/QuestionResult';

const getResultColor = (score: number) => ({
  color:
    score <= 1
      ? 'red'
      : score <= 3
      ? 'yellow'
      : 'green',
  fontWeight: 'bold',
});

const Result: React.FC = () => {
  // Navigator
  const navigate = useNavigate();

  const { questions, shuffledAnswersList, answers, reset } = useQuizzData();

  // We calculate the score based on the answers provided
  const score = useMemo(() => {
    let total = 0;
    questions.forEach((question, idx) => {
      if (answers.get(idx) === question.correct_answer) {
        total += 1;
      }
    });
    return total;
  }, [questions, answers]);
  
  // UseEffects
  useEffect(() => {
    if (questions.length === 0 || answers.size === 0) {
      // If there are no questions or answers, redirect to the home page as the user should not be on this page
      navigate('/');
    }
  }, [questions, answers, navigate]);
  
  return (
    <main className="mt-4">
      <h1 className="text-center">Results</h1>
      {questions.map((question, questionIndex) => (
        <QuestionResult
          key={questionIndex}
          questionLabel={question.question}
          allAnswers={shuffledAnswersList[questionIndex]}
          questionIndex={questionIndex}
          selectedAnswer={answers?.get(questionIndex) || null}
          correctAnswer={question.correct_answer}
        />
      ))}
      <p className="text-center" style={getResultColor(score)}>Your final score is: {score}</p>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary w-50"
          onClick={() => {
            reset();
            navigate('/');
          }}
        >
          Create a new quiz
        </button>
      </div>
    </main>
  );
};

export default Result;
