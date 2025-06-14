<script setup lang="ts">
import { computed, ref, useId } from "vue";

const { index, quiz } = defineProps<{
  index: number;
  quiz: FillQuestion;
}>();

const staticIds = quiz.answers.map(() => useId());

const value = ref<string[]>([]);

const isCorrect = computed(() => {
  const allCorrect = value.value.every((ans, i) => quiz.answers[i].includes(ans));
  return allCorrect;
});
</script>

<template>
  <div class="p-6 border-1 border-gray-600 rounded-xl" :id="quiz.id">
    <p class="flex pb-5 gap-3">
      <span>{{ index + 1 }}. </span>
      <span v-html="quiz.question" />
    </p>
    <div class="w-full flex flex-col gap-3 pl-5">
      <div v-for="(id, index) in staticIds" :key="id" class="w-full flex gap-3">
        <span>{{ index + 1 }}. </span>
        <el-input v-model="value[index]" />
      </div>
    </div>
  </div>
</template>
