export default (questions: Questions | null) => {
  if (!Array.isArray(questions)) throw new TypeError("questions must be an array");

  for (const question of questions) {
    if (typeof question !== "object" || question === null) throw new TypeError("questions contains invalid element");

    const { type, question: q, answers: a } = question;

    switch (type) {
      case "single":
        if (!a.every(({ text }) => typeof text === "string"))
          throw new TypeError("answers for single choice questions contains invalid types");
        if (a.reduce((count, { isCorrect }) => (isCorrect ? ++count : count), 0) !== 1)
          throw new Error("single choice question must contains 1 correct answer only");
        break;
      case "multiple":
        if (!a.every(({ text }) => typeof text === "string"))
          throw new TypeError("answers for multiple choice questions contains invalid types");
        if (!a.some(({ isCorrect }) => isCorrect))
          throw new Error("multiple choice question must contains at least 1 correct answer");
        break;
      case "fill":
        if (!a.every((ans) => ans.every((val) => typeof val === "string")))
          throw new TypeError("answers for fill question must be a two dimension string array");
        break;
      default:
        throw new Error(`undefined type '${type}'`);
    }

    if (typeof q !== "string") throw new TypeError("question must be a string");
  }
};
