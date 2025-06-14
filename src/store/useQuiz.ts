import { defineStore } from "pinia";

export const useQuiz = defineStore("quiz", {
  state: () => ({
    status: "inProgress" as QuizStatus,
  }),
});
