<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { Search } from '@element-plus/icons-vue'

import { ROUTER_NAME } from '@/router'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <NotLogIn v-if="!useAuthStore().isLogin" />
  <div v-else class="management-view">
    <div class="management-view__header">
      <ElInput :placeholder="$t('shi-xiang')" :prefix-icon="Search" />
    </div>
    <ElScrollbar style="height: 0; flex: auto">
      <ElRow>
        <ElSkeleton :count="4" animated :loading="isLoading" class="cards-container">
          <template #template>
            <div class="card">
              <ElRow align="middle" justify="space-between" class="card__header">
                <ElCol :span="6">
                  <ElSkeletonItem variant="text" />
                </ElCol>
                <ElCol :span="12"></ElCol>
                <ElCol :span="6">
                  <ElSkeletonItem variant="button" />
                </ElCol>
              </ElRow>

              <ElDivider style="margin: 0"></ElDivider>

              <ElSkeletonItem variant="p" />
              <ElSkeletonItem variant="p" />
              <ElSkeletonItem variant="p" />
            </div>
          </template>
          <template #default>
            <div class="cards-container">
              <div class="card">
                <ElRow align="middle" justify="space-between" class="card__header">
                  <ElText size="large">{{ $t('zheng-fa-tui-song') }}</ElText>
                  <ElButton
                    plain
                    type="primary"
                    @click="
                      $router.push({
                        name: ROUTER_NAME.MANAGEMENT_LAW_ADD
                      })
                    "
                  >
                    <ElText size="small">
                      {{ $t('jin-ru-mo-kuai') }}
                    </ElText>
                    <ElIcon>
                      <EpArrowRight />
                    </ElIcon>
                  </ElButton>
                </ElRow>

                <ElDivider style="margin: 0"></ElDivider>

                <ElText class="card__main">{{ '向用户推送法律法规条文以及解读' }}</ElText>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElRow>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.management-view {
  height: 0;
  flex: auto;
  display: flex;
  flex-direction: column;

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
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin-bottom: 40vh;

    .card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      border-radius: var(--Radius-border-radius-base, 4px);
      border: 1px solid var(--Color-Border-border-color-light, #e4e7ed);
      background: var(--bg-color-overlay, #fff);

      /* box-shadow */
      box-shadow:
        0px 12px 32px 4px rgba(0, 0, 0, 0.04),
        0px 8px 20px 0px rgba(0, 0, 0, 0.08);

      .card__header {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
      }

      .card__main {
        align-self: auto;
        white-space: break-spaces;
        padding: 20px;
      }
    }
  }
}
</style>
