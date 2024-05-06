<template>
  <PageHeader></PageHeader>
  <ElScrollbar>
    <div v-for="(item, index) in images" :key="index">
      <ElRow class="image-box" align="top">
        <ElCol :span="4">
          <ElText>{{ `id: ${index + 1}` }}</ElText>
        </ElCol>
        <ElCol :span="20">
          <ElImage :src="item" fit="contain" lazy></ElImage>
        </ElCol>
      </ElRow>
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import useImageStore from '@/stores/image'
import { ElImage } from 'element-plus'

const counts = 19
const images = ref<Array<string>>(
  Array.from({
    length: counts
  })
)

images.value.forEach((_, i) => {
  const id = i + 1
  useImageStore()
    .getImageById(id)
    .then((image) => {
      images.value[i] = image
    })
})
</script>

<style scoped lang="scss"></style>
