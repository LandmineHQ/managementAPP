<template>
  <ElDialog
    v-model:model-value="dialogVisible"
    align-center
    :show-close="false"
    class="assigment-dialog"
  >
  </ElDialog>
</template>

<script setup lang="ts">
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
