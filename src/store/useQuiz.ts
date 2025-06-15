import { defineStore } from "pinia";
import parseQuestions from "../utils/parseQuestions";
import validateQuestions from "../utils/validateQuestions";
import shuffle from "../utils/shuffle";
import getId from "../utils/getId";

export const useQuiz = defineStore("quiz", {
  state: () => ({
    status: "standby" as QuizStatus,
    data: [] as Questions,
  }),
  getters: {
    questionsStatus(state) {
      return state.data.reduce((statusList, { id, status }) => {
        statusList[id] = status;
        return statusList;
      }, {} as Record<string, QuestionStatus>);
    },
    allAnswered() {
      return Object.values(this.questionsStatus).every(
        (stat) => stat === "answered"
      );
    },
    endQuiz(state) {
      return state.status === "completed";
    },
  },
  actions: {
    setDataWithJson(data: Questions) {
      for (const item of data) {
        item.id = getId();
        item.status = "unanswered";

        if (
          item.type === "fill" &&
          item.answers.every((ans) => typeof ans === "string")
        )
          item.answers = item.answers.map((ans) => [ans]);
      }
      this.data = data;
      this.shuffleData();
    },
    async setData(file: File | null) {
      const data = await parseQuestions(file);
      validateQuestions(data);
      this.setDataWithJson(data);
    },
    shuffleData() {
      shuffle(this.data);
      this.data.forEach(({ type, answers }) => {
        if (["single", "multiple"].includes(type)) shuffle(answers);
      });
    },
    setQuestionStatus(id: string, status: QuestionStatus) {
      const q = this.data.find(({ id: _id }) => _id === id);
      if (!q) return;
      q.status = status;
    },
  },
});
