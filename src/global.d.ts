declare global {
  type QuestionType = "single" | "multiple" | "fill";
  type ChoiceAnswer = {
    text: string;
    isCorrect: boolean;
  };
  type FillAnswer = string[];
  type Question<Q extends QuestionType, A extends ChoiceAnswer | FillAnswer> = {
    type: Q;
    question: string;
    answers: A[];
    explanation?: string;
  };
  type QuestionState = {
    id: string;
    status: QuestionStatus;
  };
  type SingleChoiceQuestion = Question<"single", ChoiceAnswer> & QuestionState;
  type MultipleChoiceQuestion = Question<"multiple", ChoiceAnswer> &
    QuestionState;
  type FillQuestion = Question<"fill", FillAnswer> & QuestionState;
  type Questions = (
    | SingleChoiceQuestion
    | MultipleChoiceQuestion
    | FillQuestion
  )[];
  type QuizStatus = "standby" | "inProgress" | "completed";
  type QuestionStatus = "unanswered" | "answered" | "correct" | "incorrect";
}

export {};
