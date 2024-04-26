<script setup lang="ts">
import ROUTER_NAME from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import { useDark, useToggle } from '@vueuse/core'
import axios from 'axios'
import { ElContainer, ElMain, ElButton, ElHeader, ElScrollbar, ElAside } from 'element-plus'

const isDark = useDark()
const darkToggle = useToggle(isDark)

function click1() {
  axios
    .post(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}`, {
      email: 'yuyunxi@gmail.com',
      password: 'AGqvSiojPw'
    })
    .then((res) => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
    })
}
function click2() {
  axios
    .get(`${DAEMON_HOST}/${ROUTER_NAME.USER}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <ElContainer>
    <ElHeader height="auto">
      <HeaderPage />
    </ElHeader>
    <ElContainer>
      <ElAside width="auto">
        <ElScrollbar></ElScrollbar>
      </ElAside>
      <ElMain>
        <ElScrollbar>
          <ElButton size="large" type="danger" @click="darkToggle()">
            {{ `isDark: ${isDark}` }}
          </ElButton>
          <ElButton @click="click1" type="primary" size="large">按钮1</ElButton>
          <ElButton @click="click2" size="large">按钮2</ElButton>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss"></style>
