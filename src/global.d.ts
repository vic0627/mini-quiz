declare global {
  type QuestionType = "single" | "multiple" | "fill";
  type ChoiceAnswer = {
    text: string;
    isCorrect: boolean;
  };
  type FillAnswer = string[];
  type Question<Q extends QuestionType, A extends ChoiceAnswer | FillAnswer> = {
    id: string;
    type: Q;
    question: string;
    answers: A[];
    explanation?: string;
  };
  type SingleChoiceQuestion = Question<"single", ChoiceAnswer>;
  type MultipleChoiceQuestion = Question<"multiple", ChoiceAnswer>;
  type FillQuestion = Question<"fill", FillAnswer>;
  type Questions = (SingleChoiceQuestion | MultipleChoiceQuestion | FillQuestion)[];
  type QuizStatus = "inProgress" | "completed";
  type QuestionStatus = "unanswered" | "answered" | "correct" | "incorrect";

}

export {};
