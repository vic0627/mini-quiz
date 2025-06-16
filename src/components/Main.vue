<script setup lang="ts">
import Fill from "./questions/Fill.vue";
import MultipleChoice from "./questions/MultipleChoice.vue";
import SingleChoice from "./questions/SingleChoice.vue";
import { useQuiz } from "../store/useQuiz";

const quizStore = useQuiz();
</script>

<template>
  <el-main class="mt-20">
    <el-row :gutter="24">
      <el-col :xs="1" :sm="5" />
      <el-col :xs="22" :sm="14" class="!flex flex-col gap-10">
        <template v-for="(quiz, index) in quizStore.$state.data">
          <SingleChoice v-if="quiz.type === 'single'" :key="quiz.id" :index="index" :quiz="quiz" />
          <MultipleChoice v-if="quiz.type === 'multiple'" :key="quiz.id" :index="index" :quiz="quiz" />
          <Fill v-if="quiz.type === 'fill'" :key="quiz.id" :index="index" :quiz="quiz" />
        </template>
      </el-col>
      <el-col :xs="1" :sm="5" />
    </el-row>
  </el-main>
</template>
