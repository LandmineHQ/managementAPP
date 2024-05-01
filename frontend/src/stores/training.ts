import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { defineStore } from 'pinia'

type CourseContent = {
  title: string
  time: string
  progress: number
  content: string
  coverImage: string
}

type Training = {
  id: number
  person_id: number
  instructor_id: number
  progress: number
  course_content: CourseContent
  steps: Array<{ title: string; content: string }>
  steps_active: number
}

const useTrainingStore = defineStore('training', () => {
  const trainingList = ref<Array<Training>>([])

  async function getTrainingList(params: any) {
    await axios.get(`${DAEMON_HOST}/${ROUTER_NAME.TRAINING}`, { params }).then((res) => {
      trainingList.value = res.data
    })
  }

  return {
    trainingList,

    getTrainingList
  }
})

export default useTrainingStore
