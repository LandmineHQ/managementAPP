<template>
  <ElContainer class="not-login--container">
    <ElHeader>
      <ElRow justify="center">
        <ElText size="large" type="info">请先登录</ElText>
      </ElRow>
    </ElHeader>
    <ElMain>
      <ElRow justify="center">
        <ElButton size="large" type="primary" @click="click">
          <ElText>LOG IN</ElText>
        </ElButton>
      </ElRow>
    </ElMain>
  </ElContainer>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import { ElButton, ElContainer, ElHeader, ElMain, ElRow, ElText } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

function click() {
  router.push(`/${ROUTER_NAME.USER}`)
}
</script>

<style scoped lang="scss">
.not-login--container {
  background: var(--color-info-light-8, #e9e9eb);
}
</style>
