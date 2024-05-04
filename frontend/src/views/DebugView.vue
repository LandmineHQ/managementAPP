<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'
import useSocketStore from '@/stores/socket'
import { useDark, useToggle } from '@vueuse/core'
import { ElButton, ElScrollbar } from 'element-plus'

const isDark = useDark()
const darkToggle = useToggle(isDark)

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
</script>

<template>
  <PageHeader></PageHeader>
  <ElScrollbar>
    <ElButton size="large" type="danger" @click="darkToggle()">
      {{ `isDark: ${isDark}` }}
    </ElButton>
    <ElButton @click="authToken" type="primary" size="large">auth token</ElButton>
    <ElButton @click="getUser" size="large">get user</ElButton>
    <ElButton @click="estublishSocketIo" size="large" type="primary">estublish SocketIo</ElButton>
    <ElButton @click="sendMsgSocketIo" size="large" type="primary">send msg SocketIo</ElButton>
  </ElScrollbar>
</template>

<style scoped lang="scss"></style>
