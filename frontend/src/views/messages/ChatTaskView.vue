<template>
  <PageHeader title="任务分配" :avatar="chatAvatar" />
  <ElRow align="middle" justify="space-between" class="task-view-header">
    <ElCol :span="15">
      <ElScrollbar>
        <ElRow style="flex-direction: row; flex-wrap: nowrap; padding: 16px; gap: 8px">
          <ElRow align="middle" v-for="item in computedMembers" :key="item.id">
            <ElAvatar @click="addTask(item)" :size="46" :src="item.avatar.src" />
          </ElRow>
        </ElRow>
      </ElScrollbar>
    </ElCol>
    <ElCol :span="9">
      <ElInput v-model:model-value="inputText" placeholder="搜索" />
    </ElCol>
  </ElRow>
  <ElScrollbar>
    <ElSpace :size="16" direction="vertical" fill class="task-view">
      <div v-for="(item, index) in task" :key="index">
        <div class="task-card">
          <ElRow align="bottom" class="header">
            <ElAvatar v-if="item.profile" :size="46" :src="item.profile.avatar.src" />
            <ElAvatar v-else :size="46">
              <ElIcon v-if="item.id === -1" :size="32">
                <EpUser />
              </ElIcon>
              <ElText v-else>{{ item.id }}</ElText>
            </ElAvatar>
            <ElText v-if="item.profile" style="align-self: auto">{{
              item.profile.nickname
            }}</ElText>
            <div class="append">
              <ElIcon @click="removeTask(item.id)">
                <EpClose />
              </ElIcon>
            </div>
          </ElRow>
          <ElDivider style="margin: 0" />
          <ElRow class="main">
            <ElText
              contenteditable
              @input="updateContent($event, item)"
              @click="updateContent($event, null)"
            >
              {{ item.content ? item.content : '请分配任务……' }}
            </ElText>
          </ElRow>
        </div>
      </div>
    </ElSpace>
  </ElScrollbar>
  <ElRow align="middle" justify="center" class="submit-button">
    <ElButton type="primary" @click="submit">
      {{ $t('fa-qi-ren-wu') }}
    </ElButton>
  </ElRow>
</template>

<script setup lang="ts">
import { ElMessage, ElRow, ElSpace } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import useGroupStore from '@/stores/group'
import useUserStore from '@/stores/user'
import useMessageStore from '@/stores/message'

const route = useRoute()
const router = useRouter()
const chatId = computed(() => {
  const id = route.query.id as string
  if (!id) return undefined
  return id
})
const chatAvatar = ref('')

const task = ref<Array<any>>([
  {
    id: -1,
    content: ''
  }
])

const inputText = ref('')

const menbers = ref<Array<any>>([])
const computedMembers = computed(() => {
  const filtered = menbers.value.filter((user: any) => {
    const keyword = inputText.value.toLowerCase()
    if (user.id.toString().toLowerCase().includes(keyword)) return true
    if (user.nickname.toLowerCase().includes(keyword)) return true
    return false
  })
  return filtered
})

function updateContent(event: Event, item: any) {
  const target = event.target as HTMLSpanElement
  if (!item) {
    target.innerText = ''
  } else {
    item.content = target.innerText
  }
}

function addTask(item: any) {
  if (task.value.some((data: any) => data.id === item.id)) {
    ElMessage.error({
      message: '该成员已经分配过任务了',
      offset: 300
    })
    return
  }
  task.value.unshift({
    id: item.id,
    content: '',
    profile: item
  })
}

function removeTask(id: number) {
  task.value = task.value.filter((item: any) => {
    return item.id !== id
  })
}

function submit() {
  const msg = {
    type: 'task',
    content: task.value.map((item: any) => {
      return {
        id: item.id,
        content: item.content
      }
    }),
    receiverGroupId: parseInt(chatId.value!)
  }
  useMessageStore().sendMessage(msg)

  router.back()
}

async function freshTask() {
  if (!chatId.value) return
  const group = (await useGroupStore().getGroupProfileByGroupId(chatId.value)) as any
  chatAvatar.value = group.avatar.src

  // 使用 Promise.all 来等待所有的 Promise 完成
  const membersWithProfile = await Promise.all(
    group.users.map(async (user: any) => {
      return await useUserStore().getProfileByUserId(user.id)
    })
  )
  menbers.value = membersWithProfile
}

watch(chatId, () => {
  freshTask()
})

onMounted(() => {
  freshTask()
})
</script>

<style lang="scss">
.task-view-header {
  margin-top: 8px;

  background: var(--bg-color, #fff);
}

.title-view {
  padding: 16px;
}

.task-view {
  height: 100%;
  width: 100%;
  padding: 16px;

  .task-card {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    border-radius: 12px;
    border: 1px solid var(--Color-Border-border-color-light, #e4e7ed);
    background: var(--bg-color-overlay, #fff);

    /* box-shadow */
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px 0px rgba(0, 0, 0, 0.08);

    .header {
      width: 100%;
      height: 78px;
      padding: 16px;
      gap: 10px;
      justify-content: flex-end;

      .el-avatar {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }

      .append {
        height: 100%;
        width: 0;
        flex: auto;

        display: flex;
        justify-content: flex-end;
      }
    }

    .main {
      width: 100%;

      .el-text {
        padding: 16px;
        white-space: pre-wrap;

        width: 100%;
      }
    }
  }
}

.submit-button {
  padding: 8px 0;

  .el-button {
    display: flex;
    width: 171px;
    height: 48px;
    padding: 5px 16px;
    gap: 4px;
    flex-shrink: 0;

    border-radius: 100px;
    background: var(--color-primary, #409eff);
  }
}
</style>
