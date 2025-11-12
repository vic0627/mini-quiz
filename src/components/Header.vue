<script setup lang="ts">
import { ref, watch } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import virtualUpload from '../utils/virtualUpload'
import { useQuiz } from '../store/useQuiz'
import { ElMessage } from 'element-plus'
import ch02_1 from '../assets/wireless/ch02-無線區域網路.json'
import ch02_2 from '../assets/wireless/ch02-IP與Subnet概念.json'
import ch03 from '../assets/wireless/ch03-無線隨意網路.json'
import ch04 from '../assets/wireless/ch04-無線隨意網路.json'
import shuffle from '../utils/shuffle'

const quizLib: Record<string, Questions> = {
  'ch02-無線區域網路': ch02_1 as Questions,
  'ch02-IP與Subnet概念': ch02_2 as Questions,
  'ch03-無線隨意網路': ch03 as Questions,
  'ch04-無線隨意網路': ch04 as Questions,
}

const totalQuiz = [...ch02_1, ...ch02_2, ...ch03, ...ch04]
shuffle(totalQuiz)
totalQuiz.length = 50

const quizStore = useQuiz()

const uploadQuestions = async () => {
  try {
    const files = await virtualUpload('.json')
    await quizStore.setData(files && files[0])
    ElMessage.success('upload success, now start the quiz!')
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

const selectedQuiz = ref('')

watch(selectedQuiz, (quizName) => {
  const selected = Array.isArray(quizName) ? quizName : quizLib[quizName]
  if (selected) quizStore.status = 'inProgress'
  quizStore.setDataWithJson(selected ?? [])
})

const submit = () => {
  quizStore.status = 'completed'
}

const reset = () => {
  selectedQuiz.value = ''
  quizStore.status = 'standby'
}
</script>

<template>
  <el-header class="fixed z-50 w-full backdrop-blur-2xl border-b-1 border-b-gray-600">
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
            <el-option-group label="無線網路">
              <el-option
                v-for="(_, key) in quizLib"
                :key="key"
                :value="key"
                >{{ key }}</el-option
              >
            </el-option-group>
            <el-option :value="totalQuiz">無線網路期中模擬測驗</el-option>
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
