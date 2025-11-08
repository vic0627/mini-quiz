<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import { useQuiz } from "../../store/useQuiz";
import findAnswer from "../../utils/findAnswer";

const quizStore = useQuiz();

const { index, quiz } = defineProps<{
  index: number;
  quiz: SingleChoiceQuestion;
}>();

const answers = quiz.answers.map((item) => ({ ...item, id: useId() }));

const value = ref<string>("");

const isCorrect = computed(() => {
  const ans = findAnswer(answers, value.value);
  return ans?.isCorrect ?? false;
});

const questionResult = computed(() =>
  quizStore.endQuiz ? (isCorrect.value ? "success" : "danger") : ""
);

watch(value, (value) => {
  quizStore.setQuestionStatus(
    quiz.id,
    value === "" ? "unanswered" : "answered"
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

  const isChosen = value.value === id;
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
    <el-radio-group
      v-model="value"
      class="w-full flex flex-col gap-3"
      :disabled="quizStore.endQuiz"
    >
      <el-radio
        v-for="item in answers"
        :key="item.id"
        :class="['w-full', '!h-auto', '!p-3', '!m-0', getOptionResult(item.id)]"
        :value="item.id"
        border
      >
        {{ item.text }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<style scoped>
:deep(.el-form-item__error) {
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

:deep(.success) {
  border-color: var(--el-color-success-light-5) !important;
  background-color: var(--el-color-success-light-9) !important;

  .el-radio__label {
    color: var(--el-color-success) !important;
  }
}
:deep(.danger) {
  border-color: var(--el-color-danger-light-5) !important;
  background-color: var(--el-color-danger-light-9) !important;

  .el-radio__label {
    color: var(--el-color-danger) !important;
  }
}
</style>
