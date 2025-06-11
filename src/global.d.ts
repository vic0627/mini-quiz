declare global {
  type QuestionType = "single" | "multiple" | "fill";
  type ChoiceAnswer = {
    text: string;
    isCorrect: boolean;
  };
  type FillAnswer = {
    id: string;
    answers: string[];
  };
  type Question<Q extends QuestionType, A extends ChoiceAnswer | FillAnswer> = {
    type: Q;
    question: string;
    answers: A[];
    explanation?: string;
  };
  type SingleChoiceQuestion = Question<"single", ChoiceAnswer>;
  type MultipleChoiceQuestion = Question<"multiple", ChoiceAnswer>;
  type FillQuestion = Question<"fill", FillAnswer>;
  type Questions = (SingleChoiceQuestion | MultipleChoiceQuestion | FillQuestion)[];
}

export {};
