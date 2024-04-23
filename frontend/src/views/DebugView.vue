<script setup lang="ts">
import { getUser } from '@/api'
import HeaderPage from '@/components/HeaderPage.vue'
import { useDark, useToggle } from '@vueuse/core'
import { ElContainer, ElMain, ElButton, ElHeader, ElScrollbar, ElAside } from 'element-plus'

const isDark = useDark()
const darkToggle = useToggle(isDark)

function click() {
  getUser()
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
          <ElButton @click="click">按钮</ElButton>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss"></style>
