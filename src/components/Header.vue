<script setup lang="ts">
import { ref, watch } from "vue";
import { Upload } from "@element-plus/icons-vue";
import virtualUpload from "../utils/virtualUpload";
import { useQuiz } from "../store/useQuiz";
import { ElMessage } from "element-plus";
import statistic7 from "../assets/statistics-7.json";
import statistic8 from "../assets/statistics-8.json";
import statistic9 from "../assets/statistics-9.json";
import statistic10 from "../assets/statistics-10.json";
import statistic11 from "../assets/statistics-11.json";
import statistic12 from "../assets/statistics-12.json";

const quizLib: Record<string, Questions> = {
  第7次測驗: statistic7 as Questions,
  第8次測驗: statistic8 as Questions,
  第9次測驗: statistic9 as Questions,
  第10次測驗: statistic10 as Questions,
  第11次測驗: statistic11 as Questions,
  第12次測驗: statistic12 as Questions,
};

const totalQuiz = [
  ...statistic7,
  ...statistic8,
  ...statistic9,
  ...statistic10,
  ...statistic11,
  ...statistic12,
];

const quizStore = useQuiz();

const uploadQuestions = async () => {
  try {
    const files = await virtualUpload(".json");
    await quizStore.setData(files && files[0]);
    ElMessage.success("upload success, now start the quiz!");
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

const selectedQuiz = ref("");

watch(selectedQuiz, (quizName) => {
  const selected = Array.isArray(quizName) ? quizName : quizLib[quizName];
  if (selected) quizStore.status = "inProgress";
  quizStore.setDataWithJson(selected ?? []);
});

const submit = () => {
  quizStore.status = "completed";
};

const reset = () => {
  selectedQuiz.value = "";
  quizStore.status = "standby";
};
</script>

<template>
  <el-header
    class="fixed z-50 w-full backdrop-blur-2xl border-b-1 border-b-gray-600"
  >
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="flex items-center p-3">
          <img
            class="w-[2rem] h-[2rem] mr-3"
            src="/mini-quiz.svg"
            alt="mini-quiz"
          />
          <h1 class="text-xl text-nowrap">Mini Quiz</h1>
        </div>
      </el-col>
      <el-col :span="12" />
      <el-col :span="6">
        <div class="flex items-center p-3 justify-end">
          <el-button
            type="info"
            class="!hidden"
            :icon="Upload"
            circle
            @click="uploadQuestions"
          />
          <el-select
            v-model="selectedQuiz"
            :disabled="!!selectedQuiz"
            placeholder="Please select a quiz"
            class="mr-3"
          >
            <el-option-group label="機率統計">
              <el-option v-for="(_, key) in quizLib" :key="key" :value="key">{{
                key
              }}</el-option>
            </el-option-group>
            <el-option :value="totalQuiz">統計期末總測驗</el-option>
          </el-select>
          <el-button
            v-if="quizStore.status === 'inProgress'"
            type="primary"
            @click="submit"
          >
            Submit
          </el-button>
          <el-button
            v-else-if="quizStore.status === 'completed'"
            type="warning"
            @click="reset"
            >Reset</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
