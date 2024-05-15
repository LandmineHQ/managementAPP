<template>
  <ElDialog
    v-model:model-value="dialogVisible"
    align-center
    :show-close="false"
    class="assigment-dialog"
  >
    <template #header="{ titleId, titleClass }">
      <ElRow align="middle" :class="titleClass" :id="titleId" justify="center">
        <ElText size="large">
          {{ $t('ren-wu-fen-pei') }}
        </ElText>
      </ElRow>
    </template>
    <template #default>
      <ElRow align="middle" justify="space-between">
        <ElRow>头像</ElRow>
        <ElRow>
          <ElInput placeholder="搜索" />
        </ElRow>
      </ElRow>
      <ElScrollbar class="task-view">
        <ElSpace>
          <div v-for="(item, index) in task" :key="index">
            <div class="task-card"></div>
          </div>
        </ElSpace>
      </ElScrollbar>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElSpace } from 'element-plus'

type TaskType = {
  id: number
  content: string
}[]

const emit = defineEmits({
  'update:task': (task: TaskType) => {
    if (task) return true
    return false
  }
})

const dialogVisible = defineModel('dialogVisible', {
  type: Boolean,
  default: true
})

const task = ref<Array<TaskType>>([])
</script>

<style lang="scss">
.assigment-dialog {
  width: 100%;
  height: 80%;
}
</style>
