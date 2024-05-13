<template>
  <PageHeader :title="chatTitle" :avatar="chatAvatar"></PageHeader>
  <ElScrollbar ref="scrollbarRef" class="chat-view">
    <ElSpace direction="vertical" alignment="stretch" size="small" class="chat-view-messages">
      <div v-for="item in computedMessages" :key="item.type + item.id" style="width: 100%">
        <div v-if="item.type !== 'divider'" class="chat-view-message-item">
          <ElAvatar :size="48" :src="item.avatar">
            <ElIcon :size="24">
              <EpUser />
            </ElIcon>
          </ElAvatar>

          <div class="content">
            <div v-if="item.type === 'image'" class="content-item image">
              <ElImage :src="item.content" fit="cover" />
            </div>
            <div v-else class="content-item text">
              <ElText>{{ item.content }}</ElText>
            </div>
          </div>

          <div class="date">
            <ElText>
              {{ dayjs(item.date).format('HH:mm') }}
            </ElText>
          </div>
        </div>
        <ElDivider v-else content-position="center">
          <ElText type="info" size="default">
            {{ dayjs(item.date).format('YYYY年MM月DD日') }}
          </ElText>
        </ElDivider>
      </div>
    </ElSpace>
  </ElScrollbar>
  <InputComponent @submit="sendMessage" />
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useImageStore from '@/stores/image'
import useMessageStore from '@/stores/message'
import useUserStore from '@/stores/user'
import { ElImage, ElNotification, ElScrollbar, ElSpace, dayjs } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import InputComponent from '@/components/InputComponent.vue'

const router = useRouter()
const route = useRoute()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const chatType = computed(() => {
  const type = route.query.type as string
  if (type) {
    return type
  }
  return 'none'
})
const chatId = computed(() => {
  const id = route.query.id as string
  if (id) {
    return id
  }
  return '-1'
})
const chatTitle = ref<string>()
const messages = ref<
  Array<{
    id: string
    type: string
    content: string
    avatar: string
    date: string
  }>
>([])
const computedMessages = computed(() => {
  // 按时间排序
  const sortedMessages = messages.value.sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
  )
  const result: Array<any> = []

  sortedMessages.forEach((message, index) => {
    // 如果是第一条消息或者当前消息与前一条消息不是同一天，则添加分隔符
    if (index === 0 || !dayjs(message.date).isSame(dayjs(sortedMessages[index - 1].date), 'day')) {
      result.push({
        type: 'divider',
        date: message.date
      })
    }
    result.push(message)
  })

  return result
})
const chatAvatar = ref<string>('abc')

const sendMessage: InstanceType<typeof InputComponent>['onSubmit'] = async (input) => {
  const sendMsg = { ...input, receiverId: chatId.value }
  const res = await useMessageStore().sendMessage(sendMsg)
  console.log(res)
}

async function freshPrivate() {
  messages.value.length = 0

  useMessageStore()
    .getReceivedById(chatId.value)
    .forEach(async (item) => {
      const senderProfile = await useUserStore().getProfileByUserId(item.senderId.toString())
      const newMessage = {
        id: item.id.toString(),
        type: item.type,
        content: '',
        avatar: senderProfile.avatar.src,
        date: item.createdAt
      }

      switch (item.type) {
        case 'image': {
          const image = await useImageStore().getImageById(item.content)
          newMessage.content = image
          break
        }
        case 'task': {
          break
        }
        case 'text':
        case 'record': {
          newMessage.content = item.content as string
          break
        }
      }
      messages.value.push(newMessage)
    })

  const profile = await useUserStore().getProfileByUserId(chatId.value)
  chatTitle.value = profile.nickname
  chatAvatar.value = profile.avatar.src
}

function scrollToBottom() {
  if (scrollbarRef.value) {
    const warpRef = scrollbarRef.value.wrapRef!
    const viewRef = warpRef.firstChild! as HTMLDivElement
    const rect = viewRef.getBoundingClientRect()
    console.log(viewRef, rect)
    scrollbarRef.value.setScrollTop(rect.bottom * 2)
  }
}

async function freshGroup() {}

async function freshView() {
  console.log(chatType.value, chatId.value)

  switch (chatType.value) {
    case 'group': {
      await freshGroup()
      break
    }
    case 'private': {
      await freshPrivate()
      break
    }
    default: {
      ElNotification.error({
        message: '未知message类型',
        offset: 300,
        showClose: false
      })
    }
  }

  scrollToBottom()
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.MESSAGES_CHAT)) {
      freshView()
    }
  }
)

onMounted(() => {
  freshView()
})
</script>

<style scoped lang="scss">
.chat-view {
  background: var(--bg-color, #fff);

  position: relative;

  .chat-view-messages {
    padding: 26px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .chat-view-message-item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;

      .el-avatar {
        flex: none;
      }

      .content {
        width: 0;
        position: relative;
        flex: auto;

        .content-item {
          width: fit-content;
          max-width: 100%;
          border-radius: 12px;
          background: var(--Color-Primary-color-primary, #409eff);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
          overflow: hidden;

          &.text {
            padding: 16px;
          }

          &.image {
            height: 195px;
          }
        }

        .el-text {
          color: #000;
          text-align: center;
          font-family: Arial;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 125% */
          letter-spacing: -0.01px;
        }

        .el-image {
          height: 100%;
        }
      }

      .date {
        padding-left: 16px;
        align-self: flex-start;
      }
    }
  }
}
</style>
