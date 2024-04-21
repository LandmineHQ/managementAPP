<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { ElContainer, ElMain, ElButton, ElCard, ElHeader, ElPageHeader, ElText } from 'element-plus'
import { useRoute } from 'vue-router'

const isDark = useDark()
const darkToggle = useToggle(isDark)
const route = useRoute()
</script>

<template>
  <ElContainer>
    <ElHeader>
      <ElPageHeader>
        <template #title>
          <ElText type="info" size="large">
            {{ route.name }}
          </ElText>
        </template>
      </ElPageHeader>
    </ElHeader>
    <ElMain>
      <ElButton size="large" type="danger" @click="darkToggle()">{{
        `isDark: ${isDark}`
      }}</ElButton>
    </ElMain>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
  </ElContainer>
</template>

<style scoped lang="scss"></style>
