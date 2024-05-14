<template>
  <PageHeader :title="chatTitle" :avatar="chatAvatar"></PageHeader>
  <ElScrollbar ref="scrollbarRef" class="chat-view">
    <ElSpace direction="vertical" alignment="stretch" size="small" class="chat-view-messages">
      <div v-for="item in computedMessages" :key="item.type + item.id">
        <div
          v-if="item.type !== 'divider'"
          class="chat-view-message-item"
          :class="{
            reverse: item.isReverse
          }"
        >
          <ElAvatar :size="48" :src="item.avatar">
            <ElIcon :size="24">
              <EpUser />
            </ElIcon>
          </ElAvatar>

          <div class="content">
            <div v-if="item.type === 'image'" class="content-item image">
              <ElImage :src="item.content" fit="cover" />
            </div>
            <div v-else-if="item.type === 'record'" class="content-item content-box">
              <label>
                <ElRow align="middle" class="record">
                  <input
                    type="checkbox"
                    @change="playRecord($event, item.content)"
                    class="record-chebox"
                  />

                  <ElText type="info">{{ `[${$t('lu-yin')}]` }}</ElText>
                  <ElIcon :size="24" color="white" class="icon-play">
                    <EpVideoPlay />
                  </ElIcon>
                  <ElIcon :size="24" color="red" class="icon-pause">
                    <EpVideoPause />
                  </ElIcon>
                </ElRow>
              </label>
            </div>
            <div v-else class="content-item content-box">
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
import useMessageStore, { type MessageType } from '@/stores/message'
import useUserStore from '@/stores/user'
import { ElImage, ElNotification, ElScrollbar, ElSpace, dayjs } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/locales'

import InputComponent from '@/components/InputComponent.vue'
import useGroupStore from '@/stores/group'

const router = useRouter()
const route = useRoute()
const t = i18n.global.t

const audio = new Audio()

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
    isReverse: boolean
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

  nextTick(() => {
    scrollToBottom()
  })

  return result
})
const chatAvatar = ref<string>('abc')

const sendMessage: InstanceType<typeof InputComponent>['onSubmit'] = async (input) => {
  let sendMsg = { ...input } as MessageType
  if (chatType.value === 'group') {
    sendMsg.receiverGroupId = parseInt(chatId.value)
  } else {
    sendMsg.receiverId = parseInt(chatId.value)
  }
  const res = await useMessageStore().sendMessage(sendMsg)
  console.log('sendMsg', res)

  freshView()
}

function playRecord(event: Event, base64: string) {
  const checkbox = event.target as HTMLInputElement
  const isChecked = checkbox.checked

  stopPlayRecord()
  if (isChecked) {
    if (audio.src != base64) {
      audio.src = base64
    }
    audio.play().catch(() => {
      ElNotification.error({
        message: t('bo-fang-lu-yin-shi-bai'),
        offset: 300
      })
    })
    audio.addEventListener(
      'ended',
      () => {
        checkbox.checked = false
      },
      { once: true }
    ) // 使用{ once: true }参数确保事件监听器在触发一次后自动移除
  }
}

function stopPlayRecord() {
  if (audio.src) {
    audio.pause()
    audio.currentTime = 0
  }
}

async function resolveMessage(message: MessageType) {
  const senderProfile = await useUserStore().getProfileByUserId(message.senderId.toString())
  const newMessage = {
    id: message.id.toString(),
    type: message.type,
    content: '',
    avatar: senderProfile.avatar.src,
    date: message.createdAt,
    isReverse: message.senderId.toString() === useUserStore().uid!.toString()
  }

  switch (message.type) {
    case 'image': {
      const image = (await useImageStore().getImageById(message.content)) as string
      newMessage.content = image
      break
    }
    case 'task': {
      break
    }
    case 'text':
    case 'record': {
      newMessage.content = message.content as string
      break
    }
  }
  messages.value.push(newMessage)
}

async function freshPrivate() {
  useMessageStore()
    .getReceivedById(chatId.value)
    .forEach((item) => {
      resolveMessage(item)
    })

  if (chatId.value !== useUserStore().uid?.toString()) {
    useMessageStore()
      .getSentById('private', chatId.value)
      .forEach((item) => {
        resolveMessage(item)
      })
  }

  const profile = await useUserStore().getProfileByUserId(chatId.value)
  chatTitle.value = profile.nickname
  chatAvatar.value = profile.avatar.src
}

function scrollToBottom() {
  if (scrollbarRef.value) {
    const warpRef = scrollbarRef.value.wrapRef!
    const viewRef = warpRef.firstChild! as HTMLDivElement
    const rect = viewRef.getBoundingClientRect()
    scrollbarRef.value.setScrollTop(rect.bottom * 2)
  }
}

async function freshGroup() {
  useMessageStore()
    .getGroupById(chatId.value)
    .forEach((item) => {
      resolveMessage(item)
    })

  const profile = await useGroupStore().getGroupProfileByGroupId(chatId.value)
  chatTitle.value = profile.name
  chatAvatar.value = profile.avatar.src
}

async function freshView() {
  console.log(chatType.value, chatId.value)
  messages.value.length = 0

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

  nextTick(() => {
    scrollToBottom()
  })
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

      &.reverse {
        flex-direction: row-reverse;

        .content {
          display: flex;
          justify-content: flex-end;
        }
      }

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

          &.content-box {
            padding: 16px;
          }

          &.image {
            height: 195px;
          }

          & .record {
            .record-chebox {
              display: none;

              & ~ .el-text {
                margin-right: 4px;
                color: white;
              }

              & ~ .icon-play {
                display: block;
              }

              & ~ .icon-pause {
                display: none;
              }

              &:checked {
                & ~ .el-text {
                  color: red;
                }

                & ~ .icon-play {
                  display: none;
                }

                & ~ .icon-pause {
                  display: block;
                }
              }
            }
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
