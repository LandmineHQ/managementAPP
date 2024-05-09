<template>
  <PageHeader></PageHeader>
  <ElScrollbar>
    <div v-for="(item, index) in images" :key="index">
      <ElRow class="image-box" align="top">
        <ElCol :span="4">
          <ElText>{{ `id: ${index + 1}` }}</ElText>
        </ElCol>
        <ElCol :span="20">
          <ElImage :src="item" fit="contain"></ElImage>
        </ElCol>
      </ElRow>
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import useImageStore from '@/stores/image'
import { ElImage } from 'element-plus'

useImageStore().getCounts()
let counts = computed(() => {
  let data = useImageStore().counts
  return data || 0
})
const images = computed(() => {
  const res = ref<Array<string>>(Array.from({ length: counts.value }))
  for (let i = 0; i < res.value.length; i++) {
    const id = i + 1
    useImageStore()
      .getImageById(id)
      .then((image) => {
        res.value[i] = image
      })
  }
  return res.value
})
</script>

<style scoped lang="scss"></style>
