<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import { useQuiz } from "../../store/useQuiz";
import findAnswer from "../../utils/findAnswer";

const quizStore = useQuiz();

const { index, quiz } = defineProps<{
  index: number;
  quiz: FillQuestion;
}>();

const answers = quiz.answers.map((item) => ({ answers: item, id: useId() }));

const value = ref(
  answers.reduce((val, { id }) => {
    val[id] = "";
    return val;
  }, {} as Record<string, string>)
);

const isCorrect = computed(() => {
  const allCorrect = Object.entries(value.value).every(
    ([id, val]) => val && findAnswer(answers, id)?.answers.includes(val)
  );
  return allCorrect;
});

const questionResult = computed(() =>
  quizStore.endQuiz ? (isCorrect.value ? "success" : "danger") : ""
);

watch(
  value,
  (value) => {
    quizStore.setQuestionStatus(
      quiz.id,
      Object.values(value).some(Boolean) ? "answered" : "unanswered"
    );
  },
  { deep: true }
);

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

const getInputResult = (id: string) => {
  if (!quizStore.endQuiz) return;

  const { answers: ans } = findAnswer(answers, id) ?? {};
  const isCorrectAns = ans?.includes(value.value[id]);

  if (isCorrectAns) return "success";
  else return "danger";
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
    <div class="w-full flex flex-col gap-3 pl-5">
      <div
        v-for="(item, index) in answers"
        :key="item.id"
        :class="[getInputResult(item.id)]"
      >
        <div :class="['w-full', 'flex', 'gap-3']">
          <span>{{ index + 1 }}. </span>
          <el-input v-model="value[item.id]" />
        </div>
        <p
          v-if="getInputResult(item.id) === 'danger'"
          class="text-sm pl-8 pt-2"
        >
          {{ findAnswer(answers, item.id)?.answers.join() }}
        </p>
      </div>
    </div>
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
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-color-success-light-5) inset !important;
    background-color: var(--el-color-success-light-9) !important;
  }

  .el-input__inner,
  > div:first-child > span:first-child {
    color: var(--el-color-success) !important;
  }
}
::v-deep .danger {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-color-danger-light-5) inset !important;
    background-color: var(--el-color-danger-light-9) !important;
  }

  .el-input__inner,
  > div:first-child > span:first-child {
    color: var(--el-color-danger) !important;
  }
}
</style>
