<script setup lang="ts">
import { ref, watch } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import virtualUpload from '../utils/virtualUpload'
import { useQuiz } from '../store/useQuiz'
import { ElMessage } from 'element-plus'
import misMidterm from '../assets/mis/midterm.json'
import misMidtermPart1 from '../assets/mis/midterm/part-1.json'
import misMidtermPart2 from '../assets/mis/midterm/part-2.json'
import misMidtermPart3 from '../assets/mis/midterm/part-3.json'
import misMidtermPart4 from '../assets/mis/midterm/part-4.json'
import misMidtermPart5 from '../assets/mis/midterm/part-5.json'

const quizLib: Record<string, Questions> = {
  'midterm 分批練習 1': misMidtermPart1 as Questions,
  'midterm 分批練習 2': misMidtermPart2 as Questions,
  'midterm 分批練習 3': misMidtermPart3 as Questions,
  'midterm 分批練習 4': misMidtermPart4 as Questions,
  'midterm 分批練習 5': misMidtermPart5 as Questions,
}

const midtermQuiz = misMidterm as Questions

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
            <el-option :value="midtermQuiz">midterm 大總匯</el-option>
            <el-option-group label="midterm 分批練習">
              <el-option
                v-for="(_, key) in quizLib"
                :key="key"
                :value="key"
                >{{ key }}</el-option
              >
            </el-option-group>
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
