<template>
  <ElSpace fill :size="64" class="not-login--container">
    <ElRow justify="center">
      <ElText size="large" type="info">请先登录</ElText>
    </ElRow>
    <ElRow justify="center">
      <ElButton
        size="large"
        type="primary"
        @click="click"
        :style="{
          borderRadius: '15px',
          padding: '21px 70px 20px 71px'
        }"
      >
        <ElText size="large">LOG IN</ElText>
      </ElButton>
    </ElRow>
  </ElSpace>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import { ElButton, ElRow, ElSpace, ElText } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

function click() {
  router.push(`/${ROUTER_NAME.USER}`)
}
</script>

<style scoped lang="scss">
.not-login--container {
  width: 100%;
  height: 291px;
  padding: 32px 16px;
  background: var(--color-info-light-8, #e9e9eb);
}
</style>
