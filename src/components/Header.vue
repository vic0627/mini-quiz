<script setup lang="ts">
import { Upload } from "@element-plus/icons-vue";
</script>

<template>
  <el-header class="fixed w-full border-b-1 border-b-gray-600">
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
          <el-button type="info" :icon="Upload" circle />
          <el-button type="primary" disabled>Submit</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
