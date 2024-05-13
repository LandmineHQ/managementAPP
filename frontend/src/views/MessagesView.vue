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

function gotoChat(type: 'group' | 'private', id: string | number) {
  if (typeof id === 'number') id = id.toString()
  router.push({
    path: `/${ROUTER_NAME.MESSAGES_CHAT}`,
    query: {
      type: type,
      id: id
    }
  })
}

async function freshPolicy() {
  const policyPromise = usePolicyStore().getLatestPolicy()
  await policyPromise
}

async function freshPrivateMessages(showLoading = true) {
  await useMessageStore().getPrivate(showLoading)
  /* 增加私聊sessions */
  useMessageStore().receivedMessages.forEach((messages, senderId) => {
    /* 找出每个发送人最新时间的消息 */
    let unReadCounts = 0
    const latestMessage = messages.reduce((latest, current) => {
      if (!current.isRead) unReadCounts++
      return dayjs(current.createdAt).isAfter(dayjs(latest.createdAt)) ? current : latest
    })

    const newSession = {
      id: parseInt(senderId), // 假设senderId即为需要的id
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

async function freshGroupMessages(showLoading = true) {
  const promiseList = []
  promiseList.push(useMessageStore().getGroups(showLoading))
  promiseList.push(useGroupStore().getGroups(showLoading))

  for (let promise of promiseList) {
    await promise
  }
  promiseList.length = 0

  /* 增加群组sessions */
  for (let group of useGroupStore().groups) {
    const groupMessages = useMessageStore().groupsMessages.get(group.id)
    if (!groupMessages) continue
    let latestMessage: (typeof groupMessages)[0]
    if (groupMessages.length > 0) {
      latestMessage = groupMessages.reduce((accumulator, current) => {
        if (!accumulator.createdAt) accumulator.createdAt = dayjs().toString()
        if (!current.createdAt) current.createdAt = dayjs().toString()
        return dayjs(accumulator.createdAt).isAfter(dayjs(current.createdAt))
          ? accumulator
          : current
      })
    } else {
      latestMessage = {
        createdAt: dayjs().toString()
      } as (typeof groupMessages)[0]
    }

    const newSession = {
      id: group.id,
      type: 'group',
      title: group.name,
      content: '',
      date: latestMessage?.createdAt,
      badge: 0,
      avatar: undefined
    } as (typeof sessionList.value)[0]

    /* 得到群组与最新消息发送人的profile */
    const groupProfile = await useGroupStore().getGroupProfileByGroupId(group.id)
    newSession.avatar = groupProfile.avatar
    if (latestMessage.content) {
      const latestMessageSenderProfile = await useUserStore().getProfileByUserId(
        latestMessage.senderId.toString()
      )
      newSession.content = `${latestMessageSenderProfile.nickname}：${latestMessage.content}`
    }
    sessionList.value.push(newSession)
  }
}

async function freshData(showLoading = true) {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)

  /* 清空sessions */
  sessionList.value = []
  /* 刷新消息 */
  freshPrivateMessages(showLoading)
  freshGroupMessages(showLoading)
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

      <ElSpace direction="vertical" fill :size="10" style="width: 100%">
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
                @click="gotoChat(item.type, item.id)"
              >
                <ElAvatar :src="item.avatar.src" class="avatar" size="large">
                  <ElIcon :size="32">
                    <EpConnection />
                  </ElIcon>
                </ElAvatar>
                <div class="content">
                  <ElRow>
                    <ElCol :span="16">
                      <ElText>
                        {{ item.title }}
                      </ElText>
                    </ElCol>
                    <ElCol :span="4" />
                    <ElCol :span="4">
                      <ElRow justify="end" align="middle" style="height: 100%">
                        <ElText type="info">
                          {{ item.date ? dayjs(item.date).format('HH:mm') : '' }}
                        </ElText>
                      </ElRow>
                    </ElCol>
                  </ElRow>
                  <ElRow>
                    <ElCol :span="16">
                      <ElText truncated>
                        {{ item.content }}
                      </ElText>
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
  height: 0;
  flex: auto;

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
    width: 0px;
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
      width: 0;
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
