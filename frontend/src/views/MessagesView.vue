<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useAuthStore from '@/stores/auth'
import usePolicyStore from '@/stores/policy'
import { Search } from '@element-plus/icons-vue'
import { ElImage, ElSkeleton, ElSkeletonItem, ElSpace } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const input = ref<string>()
const isLoading = ref(true)

async function freshData() {
  setTimeout(async () => {
    await usePolicyStore().getLatestPolicy()
    isLoading.value = false
  }, 500)
}

onMounted(() => {
  freshData()
})
</script>

<template>
  <div class="messages-view">
    <NotLogIn v-if="!useAuthStore().isLogin" />
    <ElScrollbar v-else class="scroll-main">
      <el-input v-model="input" placeholder="搜索" class="search-input">
        <template #prepend>
          <ElButton :icon="Search" size="small"></ElButton>
        </template>
      </el-input>

      <ElSpace fill direction="vertical" style="width: 100%">
        <div class="laws-helper" @click="router.push(`/${ROUTER_NAME.MESSAGES_POLICY}`)">
          <ElRow>
            <ElCol :span="12">
              <ElImage
                class="image"
                :src="usePolicyStore().latestPolicy.cover.src"
                fit="cover"
              ></ElImage>
            </ElCol>
            <ElCol :span="1"></ElCol>
            <ElCol :span="8">
              {{ `政法小助手` }}
            </ElCol>
          </ElRow>
        </div>

        <ElSkeleton
          v-for="(item, index) in 2"
          :key="index"
          class="sessions"
          animated
          :loading="isLoading"
        >
          <template #template>
            <el-skeleton-item class="avatar" variant="circle" />
            <div class="content">
              <ElRow>
                <ElCol :span="16">
                  <ElSkeletonItem style="width: 50%" variant="h1" />
                </ElCol>
                <ElCol :span="4" />
                <ElCol :span="4">
                  <ElSkeletonItem variant="text" />
                </ElCol>
              </ElRow>
              <ElRow>
                <ElCol :span="16">
                  <ElSkeletonItem style="width: 90%" variant="text" />
                </ElCol>
                <ElCol :span="4" />
                <ElCol :span="4">
                  <ElRow justify="end">
                    <ElSkeletonItem class="dot loading" variant="circle" />
                  </ElRow>
                </ElCol>
              </ElRow>
            </div>
          </template>
          <template #default>
            <div class="sessions">
              <ElAvatar class="avatar" size="large" />
              <div class="content">
                <ElRow>
                  <ElCol :span="16">
                    <ElText>{{ `Mortar` }}</ElText>
                  </ElCol>
                  <ElCol :span="4" />
                  <ElCol :span="4">
                    <ElRow justify="end" align="middle" style="height: 100%">
                      <ElText type="info">{{ `22:14` }}</ElText>
                    </ElRow>
                  </ElCol>
                </ElRow>
                <ElRow>
                  <ElCol :span="16">
                    <ElText>{{ `刘涛：你需要看看这个` }}</ElText>
                  </ElCol>
                  <ElCol :span="4" />
                  <ElCol :span="4">
                    <ElRow justify="end" align="middle" style="height: 100%">
                      <div class="dot">{{ 5 }}</div>
                    </ElRow>
                  </ElCol>
                </ElRow>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElSpace>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.messages-view {
  .search-input {
    height: 42px;
    margin: 16px auto;
    display: flex;
    width: 218px;

    border-radius: 18px;
    background: var(--bg-color-overlay, #fff);
    overflow: hidden;

    .el-input-group__prepend,
    .el-input__wrapper {
      box-shadow: none;
    }

    .el-input-group__prepend {
      background-color: var(--bg-color-overlay, #fff);
    }
  }

  .scroll-main {
    padding: 0 16px;
  }

  .sessions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: stretch;
    gap: 26px;

    padding: 16px;
    background: var(--Color-Info-color-info-light-8, #e9e9eb);

    .avatar {
      flex: none;
      width: 64px;
      height: 64px;
    }

    .content {
      flex: auto;

      .dot {
        width: 16px;
        height: 16px;
      }

      .dot:not(.loading) {
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 9px;
        border: 1px solid var(--color-white, #fff);
        background: var(--color-danger, #f56c6c);

        color: var(--color-white, #fff);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
      }
    }
  }

  .laws-helper {
    padding: 16px 91px 8px 16px;
    background: var(--bg-color-overlay, #fff);

    .image {
      width: 100%;
      height: 64px;
    }
  }
}
</style>
