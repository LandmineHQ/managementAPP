<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'
import useSocketStore from '@/stores/socket'
import usePolicyStore from '@/stores/policy'
import { useDark, useToggle } from '@vueuse/core'
import { ElButton, ElScrollbar } from 'element-plus'
import useMessageStore, { type MessageType } from '@/stores/message'
import axios from 'axios'
import { DAEMON_HOST } from '@/api'

const isDark = useDark()
const darkToggle = useToggle(isDark)
const inputText = ref('这里是一条全局通知')

async function authToken() {
  const email = 'yuyunxi@gmail.com'
  const password = 'AGqvSiojPw'
  await useAuthStore().getToken(email, password)
  console.log(useAuthStore().token)
}
async function getUser() {
  await useUserStore().updateUser()
  console.log(useUserStore())
}
function estublishSocketIo() {
  useSocketStore().estublish()
}
function sendMsgSocketIo() {
  useSocketStore().sendMsg('greetings from client')
}
async function getPolicies() {
  usePolicyStore().getAllPolicies()
}
function getReceivedMessage() {
  useMessageStore().getPrivate(false)
}
function pushGloalNotification() {
  axios.get(`${DAEMON_HOST}/debug/push`, {
    params: {
      msg: inputText.value
    }
  })
}
function sendMessage(type: 'private' | 'group') {
  const msg: any = {
    type: 'text',
    receiverId: undefined,
    receiverGroupId: undefined,
    content: inputText.value
  }

  switch (type) {
    case 'private':
      msg.receiverId = 5
      break
    case 'group':
      msg.receiverGroupId = 1
      break
  }
  useMessageStore().sendMessage(msg as MessageType)
}
</script>

<template>
  <PageHeader></PageHeader>
  <ElScrollbar>
    <ElForm label-position="top">
      <ElFormItem label="设置">
        <ElButton size="large" type="danger" @click="darkToggle()">
          {{ `isDark: ${isDark}` }}
        </ElButton>
      </ElFormItem>
      <ElFormItem label="登录">
        <ElRow>
          <ElButton @click="authToken" type="primary" size="large">auth token</ElButton>
          <ElButton @click="getUser" size="large">get user</ElButton>
        </ElRow>
      </ElFormItem>
      <ElFormItem label="Socket.IO">
        <ElRow>
          <ElButton @click="estublishSocketIo" size="large" type="primary"
            >estublish SocketIo</ElButton
          >
          <ElButton @click="sendMsgSocketIo" size="large" type="primary"
            >send msg SocketIo</ElButton
          >
        </ElRow>
      </ElFormItem>
      <ElFormItem label="全局通知">
        <ElRow>
          <ElInput v-model:model-value="inputText" />
          <ElButton @click="pushGloalNotification" size="large">全局推送</ElButton>
        </ElRow>
      </ElFormItem>
      <ElFormItem label="消息">
        <ElRow>
          <ElButton @click="getPolicies" size="large" type="primary">得到政法详情</ElButton>
          <ElButton @click="getReceivedMessage" size="large">得到接收消息</ElButton>
        </ElRow>
        <ElRow>
          <ElInput v-model:model-value="inputText" />
          <ElButton @click="sendMessage('private')">发送消息到userId 5</ElButton>
          <ElButton @click="sendMessage('group')">发送消息到groupId 1</ElButton>
        </ElRow>
      </ElFormItem>
    </ElForm>
  </ElScrollbar>
</template>

<style scoped lang="scss"></style>
