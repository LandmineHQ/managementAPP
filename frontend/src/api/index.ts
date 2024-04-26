// @ts-ignore
import useAuthStore from '@/stores/auth'
import axios from 'axios'

export const DAEMON_HOST = 'http://192.168.31.11:3001'

function initAxios() {
  console.log(`loadding axios`)
  axios.interceptors.request.use(
    (config) => {
      const token = useAuthStore().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default initAxios
