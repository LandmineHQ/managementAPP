import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

type Message = {
  id: number
  type: string

  isRead: boolean
  content: string | number

  receiverGroupId: number
  receiverId: number
  senderId: number

  createdAt: string
  updatedAt: string
}

const useMessageStore = defineStore('message', () => {
  const received = ref<Array<Message>>([])
  const sent = ref<Array<Message>>([])
  const groups = ref([])

  async function getGroups() {
    await axios.get(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}/group`).then((res) => {
      groups.value = res.data
    })

    return groups.value
  }

  async function getPrivate(showLoading = true) {
    await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => {
        received.value = res.data.receivedMessages
        sent.value = res.data.sentMessages
      })
  }

  return {
    /* states */
    received,
    sent,
    groups,

    /* methods */
    getGroups,
    getPrivate
  }
})

export default useMessageStore
