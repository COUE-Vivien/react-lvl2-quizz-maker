
import { decodeHtml } from '../services/UtilServices';
import type { QuestionProps } from '../types/QuestionProps';

const Question: React.FC<QuestionProps> = ({ questionLabel, allAnswers, questionIndex, selectedAnswer, onSelect }) => (
  <div className="mb-3 w-100" style={{ maxWidth: 600 }}>
    <div className="mb-2 text-center">
      <strong>{decodeHtml(questionLabel)}</strong>
    </div>
    <div className="d-flex flex-row justify-content-center gap-2">
      {allAnswers.map((answer, answerIndex) => (
        <label key={answerIndex} className={`btn btn-outline-primary${selectedAnswer === answer ? ' active' : ''}`} style={{ minWidth: 250 }}>
          <input
            type="radio"
            name={`answer-${questionIndex}`}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() => onSelect(answer)}
            className="d-none"
          />
          {decodeHtml(answer)}
        </label>
      ))}
    </div>
  </div>
);

export default Question;
