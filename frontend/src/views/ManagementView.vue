<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { Search } from '@element-plus/icons-vue'

const isLoading = ref(true)
</script>

<template>
  <NotLogIn v-if="!useAuthStore().isLogin" />
  <div v-else class="management-view">
    <div class="management-view__header">
      <ElInput placeholder="事项" :prefix-icon="Search" />
    </div>
    <ElScrollbar>
      <ElSkeleton :count="4" :loading="isLoading" animated class="cards-container">
        <template #template>
          <div class="card">
            <ElRow>
              <ElSkeletonItem variant="h1" />
              <ElSkeletonItem variant="button" />
            </ElRow>
            <ElDivider style="margin: 0" />
            <ElSkeletonItem variant="text" />
          </div>
        </template>
        <template #default>
          <div class="cards-container"></div>
        </template>
      </ElSkeleton>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.management-view {
  .management-view__header {
    display: flex;
    height: 56px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    background: var(--bg-color, #fff);

    .el-input {
      display: flex;
      width: 300px;
      padding: 6px 10px;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
  }

  .cards-container {
    .card {
    }
  }
}
</style>
