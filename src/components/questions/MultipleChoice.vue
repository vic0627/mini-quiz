<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import { useQuiz } from "../../store/useQuiz";
import findAnswer from "../../utils/findAnswer";

const quizStore = useQuiz();

const { index, quiz } = defineProps<{
  index: number;
  quiz: MultipleChoiceQuestion;
}>();

const answers = quiz.answers.map((item) => ({ ...item, id: useId() }));

const value = ref<string[]>([]);

const isCorrect = computed(() => {
  const allCorrect =
    value.value.length &&
    value.value.every((val) => findAnswer(answers, val)?.isCorrect);
  return allCorrect;
});

const questionResult = computed(() =>
  quizStore.endQuiz ? (isCorrect.value ? "success" : "danger") : ""
);

watch(value, (value) => {
  quizStore.setQuestionStatus(
    quiz.id,
    !value.length ? "unanswered" : "answered"
  );
});

watch(
  () => quizStore.status,
  (status) => {
    if (status === "inProgress") return;
    quizStore.setQuestionStatus(
      quiz.id,
      isCorrect.value ? "correct" : "incorrect"
    );
  }
);

const getOptionResult = (id: string) => {
  if (!quizStore.endQuiz) return;

  const isChosen = value.value.includes(id);
  const ans = findAnswer(answers, id);
  const isCorrectAns = ans?.isCorrect;

  if (isCorrectAns) return "success";
  else if (isChosen) return "danger";
};
</script>

<template>
  <el-form-item
    :class="[
      'p-6',
      'border-1',
      'border-gray-600',
      'rounded-xl',
      'backdrop-blur-2xl',
      questionResult,
    ]"
    :id="quiz.id"
    :error="quizStore.endQuiz && !isCorrect ? quiz.explanation : ''"
  >
    <p class="flex pb-5 gap-3 text-lg">
      <span>{{ index + 1 }}. </span>
      <span v-html="quiz.question" />
    </p>
    <el-checkbox-group
      v-model="value"
      class="w-full flex flex-col gap-3"
      :disabled="quizStore.endQuiz"
    >
      <el-checkbox
        v-for="item in answers"
        :key="item.id"
        :class="['w-full', '!h-auto', '!p-3', '!m-0', getOptionResult(item.id)]"
        :value="item.id"
        border
      >
        {{ item.text }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<style scoped>
::v-deep .el-form-item__error {
  display: block;
  position: static;
  margin-top: 1rem;
  line-height: 1rem;
}

.el-form-item.success {
  border-color: var(--el-color-success-light-5) !important;
  color: var(--el-color-success) !important;
}
.el-form-item.danger {
  border-color: var(--el-color-danger-light-5) !important;
  color: var(--el-color-danger) !important;
}

::v-deep .success {
  border-color: var(--el-color-success-light-5) !important;
  background-color: var(--el-color-success-light-9) !important;

  .el-checkbox__label {
    color: var(--el-color-success) !important;
  }
}
::v-deep .danger {
  border-color: var(--el-color-danger-light-5) !important;
  background-color: var(--el-color-danger-light-9) !important;

  .el-checkbox__label {
    color: var(--el-color-danger) !important;
  }
}
</style>
