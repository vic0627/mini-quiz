<script setup lang="ts">
import { useQuestions } from "../store/useQuestions";

const questionsStore = useQuestions();

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="max-md:hidden fixed top-20 left-5">
    <el-button v-for="(item, index) in questionsStore.$state.data" size="small" @click="scrollTo(item.id)">
      {{ index + 1 }}
    </el-button>
  </div>
</template>
