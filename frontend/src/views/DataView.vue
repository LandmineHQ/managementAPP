<script setup lang="ts">
import NotLogIn from '@/components/NotLogIn.vue'
import { ROUTER_NAME } from '@/router'
import useAuthStore from '@/stores/auth'

const isLoading = ref(false)

const sessions = ref([
  {
    display: '',
    name: 'Person',
    content: `
id: number
name: string
gender: string
`
  },
  {
    display: '消息',
    name: 'message',
    content: `
type: string
content: string
isRead: boolean
`
  },
  {
    display: '用户',
    name: 'user',
    content: `
email: string
password: string
nickname: string
`
  },
  {
    display: '培训',
    name: 'training',
    content: `
personId: number,
instructorId: number,
progress: number
`
  },
  {
    display: '群组',
    name: 'group',
    content: `
name: string
description: string
avatarId: number
`
  },
  {
    display: '图片',
    name: 'image',
    content: `
id: number
src: string
`
  },
  {
    display: '政法',
    name: 'policy',
    content: `
name: string
type: string
content: string
`
  },
  {
    name: 'UserGroup',
    content: `
userId: number
groupId: number
`
  }
])
const computedSessions = computed(() => {
  return sessions.value
})
</script>

<template>
  <div class="data-view">
    <NotLogIn v-if="!useAuthStore().isLogin" />
    <ElScrollbar v-else>
      <ElRow>
        <ElSkeleton :count="4" animated :loading="isLoading" class="table-sessions">
          <template #template>
            <div class="session">23333</div>
          </template>
          <template #default>
            <div class="table-sessions">
              <TransitionGroup name="list">
                <div v-for="(item, index) in computedSessions" :key="index">
                  <div class="session-card">
                    <ElRow align="middle" justify="space-between" class="session-card__header">
                      <ElText size="large">
                        {{ item.display || item.name }}
                      </ElText>
                      <ElButton
                        plain
                        @click="
                          $router.push({
                            name: ROUTER_NAME.DATA_DETAILS,
                            query: {
                              table: item.name
                            }
                          })
                        "
                      >
                        <ElText type="info" size="small">
                          {{ $t('cha-kan-xiang-qing') }}
                        </ElText>
                        <ElIcon>
                          <EpArrowRight />
                        </ElIcon>
                      </ElButton>
                    </ElRow>

                    <ElDivider style="margin: 0"></ElDivider>

                    <ElText class="session-card__main">
                      {{ item.content + '\n......' }}
                    </ElText>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </template>
        </ElSkeleton>
      </ElRow>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.data-view {
  height: 0;
  flex: auto;
}

.table-sessions {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 40vh;

  .session-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    border-radius: 12px;
    border: 1px solid var(--Color-Border-border-color-light, #e4e7ed);
    background: var(--Color-Background-bg-color, #fff);

    .session-card__header {
      display: flex;
      padding: 20px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
    }

    .session-card__main {
      align-self: auto;
      white-space: break-spaces;
      padding: 20px;
    }
  }
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
