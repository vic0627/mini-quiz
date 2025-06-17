<script setup lang="ts">
import { useQuiz } from "../store/useQuiz";

const quizStore = useQuiz();

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ block: "center", behavior: "smooth" });
};

const getBtnType = (id: string) => {
  const status = quizStore.questionsStatus[id];
  return (
    (
      {
        answered: "success",
        unanswered: "default",
        correct: "success",
        incorrect: "danger",
      } as Record<QuestionStatus, string>
    )[status] ?? "default"
  );
};
</script>

<template>
  <div
    v-if="quizStore.$state.data.length"
    class="max-md:hidden max-h-60 overflow-y-scroll fixed top-20 left-5 border-1 border-gray-600 rounded-xl backdrop-blur-2xl p-5 grid grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <el-button
      v-for="(item, index) in quizStore.$state.data"
      plain
      :type="getBtnType(item.id)"
      class="!m-0 !w-10 !h-10"
      @click.prevent="scrollTo(item.id)"
    >
      {{ index + 1 }}
    </el-button>
  </div>
</template>
