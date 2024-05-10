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
  const received = ref(new Map<string, Message[]>())
  const sent = ref(new Map<string, Message[]>())
  const groups = ref(new Map<string, Message[]>())

  function getReceivedById(id: string | number): Message[] {
    if (typeof id === 'number') id = id.toString()

    let messages = received.value.get(id)
    if (!messages) {
      received.value.set(id, [])
      messages = received.value.get(id)! // Use non-null assertion operator as we just set it
    }

    return messages
  }

  function getSentById(type: 'group' | 'private', id: string | number): Message[] {
    if (typeof id === 'number') id = id.toString()

    let messages = sent.value.get(`${type}-${id}`)
    if (!messages) {
      sent.value.set(`${type}-${id}`, [])
      messages = sent.value.get(`${type}-${id}`)! // Use non-null assertion operator as we just set it
    }

    return messages
  }

  async function getGroups(showLoading = true) {
    await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}/group`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => {
        res.data.forEach((item: any) => {
          groups.value.set(item.groupId, item.messages)
        })
      })

    return groups.value
  }

  async function getPrivate(showLoading = true) {
    received.value.clear()
    sent.value.clear()
    await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => {
        res.data.receivedMessages.forEach((item: Message) => {
          const receivedMessages = received.value.get(item.senderId.toString())
          if (receivedMessages) {
            receivedMessages.push(item)
          } else {
            received.value.set(item.senderId.toString(), [item])
          }
        })
        res.data.sentMessages.forEach((item: Message) => {
          let sentMessages
          if (item.receiverId) {
            sentMessages = getSentById('private', item.receiverId)
          } else {
            sentMessages = getSentById('group', item.receiverGroupId)
          }

          sentMessages.push(item)
        })
      })
  }

  return {
    /* states */
    received,
    sent,
    groups,

    /* methods */
    getGroups,
    getPrivate,
    getReceivedById,
    getSentById
  }
})

export default useMessageStore
