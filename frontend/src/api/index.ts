// @ts-ignore
import useAuthStore from '@/stores/auth'
import axios from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import i18n from '@/locales'

let loadingInstance: any
let requestCount = 0
const DAEMON_HOST = 'http://192.168.31.11:3001'

function initAxios() {
  console.log(`loadding axios`)

  axios.interceptors.request.use(
    (config) => {
      loadingInstance = ElLoading.service({ text: i18n.global.t('common.loading') })
      requestCount++

      const token = useAuthStore().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    },
    (error) => {
      return rejectError(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
      if (response.data && response.data.error) {
        return rejectError(response.data.error)
      }
      closeLoading()
      return response
    },
    (error) => {
      return rejectError(error)
    }
  )
}

function rejectError(error: any) {
  closeLoading()
  ElNotification.error({
    message: error,
    offset: 300,
    showClose: false
  })
  return Promise.reject(error)
}

function closeLoading() {
  requestCount--
  if (requestCount > 0) return
  if (loadingInstance) {
    loadingInstance.close()
  }
}

export default initAxios
export { DAEMON_HOST }
