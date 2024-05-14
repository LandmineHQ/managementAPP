<template>
  <ElDialog v-model:model-value="dialogVisible" :show-close="false" class="assigment-dialog">
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
</script>

<style lang="scss">
.assigment-dialog {
  width: 100%;
}
</style>
