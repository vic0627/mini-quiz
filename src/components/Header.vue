<script setup lang="ts">
import { Upload } from "@element-plus/icons-vue";
import virtualUpload from "../utils/virtualUpload";
import { useQuestions } from "../store/useQuestions";
import { ElMessage } from "element-plus";

const store = useQuestions();

const uploadQuestions = async () => {
  try {
    const files = await virtualUpload(".json");
    console.log("resolved");
    await store.setData(files && files[0]);
    ElMessage.success("upload success, now start the quiz!");
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};
</script>

<template>
  <el-header class="fixed z-50 w-full backdrop-blur-2xl border-b-1 border-b-gray-600">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="flex items-center p-3">
          <img class="w-[2rem] h-[2rem] mr-3" src="/mini-quiz.svg" alt="mini-quiz" />
          <h1 class="text-xl text-nowrap">Mini Quiz</h1>
        </div>
      </el-col>
      <el-col :span="12" />
      <el-col :span="6">
        <div class="flex items-center p-3 justify-end">
          <el-button type="info" :icon="Upload" circle @click="uploadQuestions" />
          <el-button type="primary" disabled>Submit</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
