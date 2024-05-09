<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useAuthStore from '@/stores/auth'
import usePolicyStore from '@/stores/policy'
import useGroupStore from '@/stores/group'
import useMessageStore from '@/stores/message'
import { Search } from '@element-plus/icons-vue'
import { ElImage, ElSkeleton, ElSkeletonItem, ElSpace, dayjs } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/user'

const router = useRouter()
const route = useRoute()

const input = ref<string>()
const isLoading = ref(true)

const computedSessionList = computed(() => {
  if (sessionList.value.length > 0) {
    return sessionList.value.sort((a, b) => {
      const nowDate = dayjs().toString()
      if (!a.date) a.date = nowDate
      if (!b.date) b.date = nowDate
      return dayjs(a.date).isAfter(b.date) ? -1 : 1
    })
  } else {
    return []
  }
})
const sessionList = ref<
  Array<{
    id: number
    type: 'group' | 'private'
    title: string
    content: string
    date: string
    badge: number
    avatar:
      | {
          id: number
          src: string | undefined
        }
      | any
  }>
>([])

async function freshPolicy() {
  const policyPromise = usePolicyStore().getLatestPolicy()
  await policyPromise
}

async function freshPrivateMessages() {
  /* 增加私聊sessions */
  // 假设消息类型为any，根据实际情况调整
  const messagesBySender = new Map<number, Array<any>>()
  for (let message of useMessageStore().received) {
    if (!messagesBySender.has(message.senderId)) {
      messagesBySender.set(message.senderId, [message])
    } else {
      messagesBySender.get(message.senderId)?.push(message)
    }
  }

  messagesBySender.forEach((messages, senderId) => {
    /* 找出每个发送人最新时间的消息 */
    let unReadCounts = 0
    const latestMessage = messages.reduce(
      (latest, current) => {
        if (!current.isRead) unReadCounts++
        return dayjs(current.createdAt).isAfter(dayjs(latest.createdAt)) ? current : latest
      },
      { createdAt: '1970-01-01T00:00:00.000' }
    )

    const newSession = {
      id: senderId, // 假设senderId即为需要的id
      type: 'private', // 根据实际情况设置
      title: 'loading', // 假设消息对象中有发送人名称
      content: latestMessage.content, // 消息内容
      date: latestMessage.createdAt, // 消息创建时间
      badge: unReadCounts, // 消息未读数量
      avatar: undefined
    } as (typeof sessionList.value)[0]

    // 得到发送人头像
    useUserStore()
      .getProfileByUserId(senderId.toString())
      .then((res) => {
        newSession.avatar = res.avatar
        newSession.title = res.nickname
        sessionList.value.push(newSession)
      })
  })
}

async function freshGroupMessages() {
  /* 增加群组sessions */
  for (let group of useGroupStore().groups) {
    const newSession = {
      id: group.id,
      type: 'group',
      title: group.name,
      content: '',
      date: '',
      badge: 0,
      avatar: undefined
    } as (typeof sessionList.value)[0]
    /* 得到群组头像 */
    useGroupStore()
      .getGroupProfileByGroupId(group.id)
      .then((profile) => {
        newSession.avatar = profile.avatar
        sessionList.value.push(newSession)
      })
  }
}

async function freshData(showLoading = true) {
  isLoading.value = true
  const groupPromise = useGroupStore().getGroups(showLoading)
  const privateMessagesPromise = useMessageStore().getPrivate(showLoading)

  await groupPromise
  await privateMessagesPromise
  isLoading.value = false

  /* 清空sessions */
  sessionList.value = []
  /* 刷新消息 */
  freshPrivateMessages()
  freshGroupMessages()
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.MESSAGES)) {
      freshData(false)
    }
  }
)

onMounted(() => {
  if (useAuthStore().isLogin) {
    freshData()
    freshPolicy()
  }
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

      <ElSpace fill direction="vertical" :size="10" style="width: 100%">
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

        <ElSkeleton :count="4" animated :loading="isLoading" class="sessions-container">
          <template #template>
            <div class="session">
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
            </div>
          </template>
          <template #default>
            <div class="sessions-container">
              <div
                v-for="item in computedSessionList"
                :key="item.type + item.id"
                class="session"
                :class="{
                  isGroup: item.type === 'group'
                }"
              >
                <ElAvatar :src="item.avatar.src" class="avatar" size="large">
                  <ElIcon :size="32">
                    <EpConnection />
                  </ElIcon>
                </ElAvatar>
                <div class="content">
                  <ElRow>
                    <ElCol :span="16">
                      <ElText>{{ item.title }}</ElText>
                    </ElCol>
                    <ElCol :span="4" />
                    <ElCol :span="4">
                      <ElRow justify="end" align="middle" style="height: 100%">
                        <ElText type="info">{{
                          item.date ? dayjs(item.date).format('HH:mm') : ''
                        }}</ElText>
                      </ElRow>
                    </ElCol>
                  </ElRow>
                  <ElRow>
                    <ElCol :span="16">
                      <ElText>{{ item.content }}</ElText>
                    </ElCol>
                    <ElCol :span="4" />
                    <ElCol :span="4">
                      <ElRow justify="end" align="middle" style="height: 100%">
                        <div v-show="item.badge" class="dot">{{ item.badge }}</div>
                      </ElRow>
                    </ElCol>
                  </ElRow>
                </div>
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

  .sessions-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 10px;
  }

  .session {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: stretch;
    gap: 26px;

    padding: 16px;
    background-color: white;

    &.isGroup {
      background: var(--Color-Info-color-info-light-8, #e9e9eb);
    }

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
