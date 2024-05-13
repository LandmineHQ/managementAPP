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
  const receivedMessages = ref(new Map<string, Message[]>())
  const sentMessages = ref(new Map<string, Message[]>())
  const groupsMessages = ref(new Map<string, Message[]>())

  function getReceivedById(id: string | number): Message[] {
    if (typeof id === 'number') id = id.toString()

    let messages = receivedMessages.value.get(id)
    if (!messages) {
      receivedMessages.value.set(id, [])
      messages = receivedMessages.value.get(id)! // Use non-null assertion operator as we just set it
    }

    return messages
  }

  function getSentById(type: 'group' | 'private', id: string | number): Message[] {
    if (typeof id === 'number') id = id.toString()

    let messages = sentMessages.value.get(`${type}-${id}`)
    if (!messages) {
      sentMessages.value.set(`${type}-${id}`, [])
      messages = sentMessages.value.get(`${type}-${id}`)! // Use non-null assertion operator as we just set it
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
          groupsMessages.value.set(item.groupId, item.messages)
        })
      })

    return groupsMessages.value
  }

  async function getPrivate(showLoading = true) {
    receivedMessages.value.clear()
    sentMessages.value.clear()
    await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => {
        res.data.receivedMessages.forEach((item: Message) => {
          const sentByUserMSG = receivedMessages.value.get(item.senderId.toString())
          if (sentByUserMSG) {
            sentByUserMSG.push(item)
          } else {
            receivedMessages.value.set(item.senderId.toString(), [item])
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

  async function sendMessage(msg: any) {
    const data = await axios
      .post(`${DAEMON_HOST}/${ROUTER_NAME.MESSAGE}`, msg, {})
      .then((res) => res.data)
    return data
  }

  return {
    /* states */
    receivedMessages,
    sentMessages,
    groupsMessages,

    /* methods */
    getGroups,
    getPrivate,
    getReceivedById,
    getSentById,

    sendMessage
  }
})

export default useMessageStore
