import { decodeHtml } from '../services/UtilServices';
import type { QuestionResultProps } from '../types/QuestionProps';


export const QuestionResult: React.FC<QuestionResultProps> = ({ questionLabel, allAnswers, questionIndex, selectedAnswer, correctAnswer }) => {

  const getAnswerClassName = (answer: string, correctAnswer: string, selectedAnswer: string | null) => {
    let className = 'btn';
    if (answer === correctAnswer) {
      className += ' btn-success';
    } else if (selectedAnswer === answer && answer !== correctAnswer) {
      className += ' btn-danger';
    } else {
      className += ' btn-outline-primary';
    }
    return className;
  }


  return (
    <div className="mb-3 w-100" style={{ maxWidth: 600 }}>
      <div className="mb-2 text-center">
        <strong>{decodeHtml(questionLabel)}</strong>
      </div>
      <div className="d-flex flex-row justify-content-center gap-2">
        {allAnswers.map((answer, answerInder) => {
          let style: React.CSSProperties = { minWidth: 250 };
          let className = getAnswerClassName(answer, correctAnswer, selectedAnswer);
          return (
            <label key={answerInder} className={className + (selectedAnswer === answer ? ' active' : '')} style={style}>
              <input
                type="radio"
                name={`answer-${questionIndex}`}
                value={answer}
                checked={selectedAnswer === answer}
                readOnly
                className="d-none"
              />
              {decodeHtml(answer)}
            </label>
          );
        })}
      </div>
    </div>
  );
}
