export type BaseQuestionProps = {
  questionLabel: string;
  allAnswers: string[];
  questionIndex: number;
  selectedAnswer: string | null;
};

export type QuestionProps = BaseQuestionProps & {
  onSelect: (answer: string) => void;
};

// Extends the QuestionProps and add the "correctAnswer" property
export type QuestionResultProps = BaseQuestionProps & {
  correctAnswer: string;
};