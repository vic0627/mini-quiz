<script setup lang="ts">
import { computed, ref, useId } from "vue";

const { index, quiz } = defineProps<{
  index: number;
  quiz: SingleChoiceQuestion;
}>();

const answers = quiz.answers.map((item) => ({ ...item, id: useId() }));

const value = ref<string>("");

const isCorrect = computed(() => {
  const ans = answers.find(({ id }) => id === value.value);
  return ans?.isCorrect ?? false;
});
</script>

<template>
  <div class="p-6 border-1 border-gray-600 rounded-xl">
    <p class="flex pb-5 gap-3">
      <span>{{ index + 1 }}. </span>
      <span v-html="quiz.question" />
    </p>
    <el-radio-group v-model="value" class="w-full flex flex-col gap-3">
      <el-radio v-for="item in answers" :key="item.id" class="w-full !h-auto !p-3 !m-0" :value="item.id" border>
        {{ item.text }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
