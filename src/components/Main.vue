<script setup lang="ts">
import Fill from "./questions/Fill.vue";
import MultipleChoice from "./questions/MultipleChoice.vue";
import SingleChoice from "./questions/SingleChoice.vue";
import { useQuestions } from "../store/useQuestions";

const questionsStore = useQuestions();

questionsStore.$subscribe((_, state) => {
  console.log(state.data);
});
</script>

<template>
  <el-main class="mt-20">
    <el-row :gutter="24">
      <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="5" />
      <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="14" class="!flex flex-col gap-10">
        <template v-for="(quiz, index) in questionsStore.$state.data">
          <SingleChoice v-if="quiz.type === 'single'" :key="quiz.id" :index="index" :quiz="quiz" />
          <MultipleChoice v-if="quiz.type === 'multiple'" :key="quiz.id" :index="index" :quiz="quiz" />
          <Fill v-if="quiz.type === 'fill'" :key="quiz.id" :index="index" :quiz="quiz" />
        </template>
      </el-col>
      <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="5" />
    </el-row>
  </el-main>
</template>
