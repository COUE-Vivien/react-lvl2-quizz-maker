import { useState, useEffect } from 'react';
import { useQuizzData } from '../providers/QuizzDataProvider';
import Question from './Question';
import { useNavigate } from 'react-router-dom';


const QuizzQuestionnaire: React.FC = () => {
  // Navigator
  const navigate = useNavigate();

  // States
  const { questions, shuffledAnswersList, setAnswers } = useQuizzData();
  const [showQuizzValidation, setShowQuizzValidation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());

  // useEffects
  useEffect(() => {
    // We verify if we can show the validation button
    // It should only be shown when all questions have been answered
    setShowQuizzValidation(selectedAnswers.size === questions.length);
  }, [selectedAnswers, questions.length]);

  // Internal functions
  const handleValidate = () => {
    setAnswers(new Map(selectedAnswers));
    // Navigate to the results page
    navigate('/result');
  }


  return (
    <div className="mt-4">
      <h1 className="text-center">Quizz Questionnaire</h1>
      <div className="d-flex flex-column align-items-center gap-4">
        {questions?.map((question, questionIndex) => (
          <Question
            key={questionIndex}
            questionLabel={question.question}
            allAnswers={shuffledAnswersList[questionIndex]}
            questionIndex={questionIndex}
            selectedAnswer={selectedAnswers.get(questionIndex) || null}
            onSelect={answer => {
              setSelectedAnswers(sel => {
                const newMap = new Map(sel);
                newMap.set(questionIndex, answer);
                return newMap;
              });
            }}
          />
        ))}
      </div>
      {showQuizzValidation && (
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleValidate} >Validate</button>
        </div>
      )}
    </div>
  );
};

export default QuizzQuestionnaire;
