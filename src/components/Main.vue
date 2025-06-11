<script setup lang="ts">
import quizExampleJson from "../assets/quiz-example.json";
import shuffle from "../utils/shuffle";
import Fill from "./questions/Fill.vue";
import MultipleChoice from "./questions/MultipleChoice.vue";
import SingleChoice from "./questions/SingleChoice.vue";

const quizExample = quizExampleJson as Questions;

shuffle(quizExample);

console.log(quizExample);
</script>

<template>
  <el-main>
    <el-row :gutter="24">
      <el-col :span="3" />
      <el-col :span="18">
        <template v-for="quiz in quizExample">
          <SingleChoice v-if="quiz.type === 'single'" :key="quiz.question" :quiz="quiz" />
          <MultipleChoice v-if="quiz.type === 'multiple'" :key="quiz.question" :quiz="quiz" />
          <Fill v-if="quiz.type === 'fill'" :key="quiz.question" :quiz="quiz" />
        </template>
      </el-col>
      <el-col :span="3" />
    </el-row>
  </el-main>
</template>
