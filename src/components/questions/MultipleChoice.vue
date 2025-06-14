<script setup lang="ts">
import { computed, ref, useId } from "vue";

const { index, quiz } = defineProps<{
  index: number;
  quiz: MultipleChoiceQuestion;
}>();

const answers = quiz.answers.map((item) => ({ ...item, id: useId() }));

const value = ref<string[]>([]);

const isCorrect = computed(() => {
  const allCorrect = value.value.every((val) => answers.find(({ id }) => id === val)?.isCorrect);
  return allCorrect;
});
</script>

<template>
  <div class="p-6 border-1 border-gray-600 rounded-xl" :id="quiz.id">
    <p class="flex pb-5 gap-3">
      <span>{{ index + 1 }}. </span>
      <span v-html="quiz.question" />
    </p>
    <el-checkbox-group v-model="value" class="w-full flex flex-col gap-3">
      <el-checkbox v-for="item in answers" :key="item.id" class="w-full !h-auto !p-3 !m-0" :value="item.id" border>
        {{ item.text }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
