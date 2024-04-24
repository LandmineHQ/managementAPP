// @ts-ignore
import axios from 'axios'

const DAEMON_HOST = 'http://192.168.31.11:3001'

function initAxios() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
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
export { DAEMON_HOST }
