import { DAEMON_HOST } from '@/api'
import { defineStore } from 'pinia'
import { io, type Socket } from 'socket.io-client'

const useSocketStore = defineStore('socket', () => {
  const socket = ref<Socket>()

  async function estublish() {
    const useAuthStore = (await import('./auth')).default

    const socket = io(`${DAEMON_HOST}`, {
      auth: {
        token: useAuthStore().token
      }
    })

    socket.on('connection', (data) => {
      console.log(data)
    })
  }

  function sendMsg(msg: string) {
    socket.value?.send('msg: ' + msg)
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
