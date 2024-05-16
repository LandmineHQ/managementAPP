import { DAEMON_HOST } from '@/api'
import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'
import { io, type Socket } from 'socket.io-client'

const useSocketStore = defineStore('socket', () => {
  const socket = ref<Socket>()

  async function estublish() {
    const useAuthStore = (await import('./auth')).default
    const useMessageStore = (await import('./message')).default
    const usePolicyStore = (await import('./policy')).default

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

    socket.value.on('chat', (data) => {
      console.log('chat:', data)
      const senderId = data.senderId
      const receiverId = data.receiverId
      const receiverGroupId = data.receiverGroupId
      if (receiverId) {
        useMessageStore().getReceivedById(senderId).push(data)
      } else {
        useMessageStore().getGroupById(receiverGroupId).push(data)
      }
    })

    socket.value.on('policy', (data) => {
      console.log('policy:', data)
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
