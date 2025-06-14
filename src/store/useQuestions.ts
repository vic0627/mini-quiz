import { defineStore } from "pinia";
import quizExampleJson from "../assets/quiz-example.json";
import parseQuestions from "../utils/parseQuestions";
import validateQuestions from "../utils/validateQuestions";
import shuffle from "../utils/shuffle";
import getId from "../utils/getId";

export const useQuestions = defineStore("questions", {
  state: () => ({
    data: quizExampleJson.map((item) => ({ id: getId(), ...item })) as Questions,
  }),
  actions: {
    async setData(file: File | null) {
      const data = await parseQuestions(file);
      validateQuestions(data);
      for (const item of data) {
        item.id = getId();
      }
      this.data = data;
      this.shuffleData();
    },
    shuffleData() {
      shuffle(this.data);
      this.data.forEach(({ type, answers }) => {
        if (["single", "multiple"].includes(type)) shuffle(answers);
      });
    },
  },
});
