import ROUTER_NAME from '#/routes/config'
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
}

const useTrainingStore = defineStore('training', () => {
  const trainingList = ref<Array<Training>>([])

  async function getTrainingList(params: any) {
    const isOK = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.TRAINING}`, { params })
      .then((res) => {
        if (res.data.error) {
          ElNotification.error(res.data.error)
          return
        }
        ElMessage.success({ message: '获取成功！', offset: 300 })
        trainingList.value = parseTrainingList(res.data)

        return true
      })
      .catch((error) => {
        ElNotification.error(error)
        return false
      })

    if (isOK) return true
    else return false
  }

  return {
    trainingList,

    getTrainingList
  }
})

export default useTrainingStore

function parseTrainingList(trainingList: Array<any>) {
  trainingList.forEach((training) => {
    training.course_content = JSON.parse(training.course_content)
  })
  return trainingList
}
