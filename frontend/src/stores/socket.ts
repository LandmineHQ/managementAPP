import { DAEMON_HOST } from '@/api'
import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'
import { io, type Socket } from 'socket.io-client'

const useSocketStore = defineStore('socket', () => {
  const socket = ref<Socket>()

  async function estublish() {
    const useAuthStore = (await import('./auth')).default

    if (socket.value) {
      socket.value.disconnect()
    }
    socket.value = io(`${DAEMON_HOST}`, {
      auth: {
        token: useAuthStore().token
      }
    })

    socket.value.on('connection', (data) => {
      console.log(data)
    })

    socket.value.on('message', (data) => {
      ElNotification({ message: data, offset: 300, showClose: false })
    })
  }

  function sendMsg(msg: string) {
    socket.value?.send(msg)
  }

  return {
    /* state */
    socket,

    /* methods */
    estublish,
    sendMsg
  }
})

export default useSocketStore
