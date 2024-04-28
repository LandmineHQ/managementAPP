<template>
  <PageHeader title="我的培训"></PageHeader>
  <ElSpace size="small" fill class="training-view">
    <ElCard v-for="(item, index) in dataList" :key="index">
      <template #header>
        <ElImage fit="cover" :src="item.coverImage"></ElImage>
      </template>
      <template #default> body</template>
      <template #footer> footer </template>
    </ElCard>
  </ElSpace>
</template>

<script setup lang="ts">
import { ElCard, ElImage, ElSpace } from 'element-plus'

type CourseContent = {
  title: string
  time: Date
  progress: number
  content: string
  coverImage: string
}
const dataList = ref<Array<CourseContent>>()

dataList.value = [
  {
    title: '基础安全操作',
    time: new Date('2024-03-28'),
    progress: 0,
    content:
      '本课程旨在教授员工基本的安全操作知识，包括个人防护装备的正确使用、紧急情况下的应对措施等。',
    coverImage: ''
  },
  {
    title: '高级设备维护',
    time: new Date('2024-03-28'),
    progress: 0,
    content: '本课程提供对工业设备进行高级维护和故障排除的深入指导。',
    coverImage: ''
  }
]
</script>

<style scoped lang="scss">
.training-view {
  margin-top: 16px;

  padding: 0 16px;
}
</style>
