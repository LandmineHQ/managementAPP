<template>
  <PageHeader :title="data.course_content.title"></PageHeader>
  <ElScrollbar fill class="training-details-view">
    <div class="progress">
      <ElRow>
        <ElText style="z-index: 1" size="large">{{ `培训进度 ${data.progress} %` }}</ElText>
      </ElRow>
    </div>
    <el-steps class="steps" direction="vertical" :active="active">
      <el-step
        v-for="(item, index) in data.steps"
        :key="index"
        :title="item.title"
        :description="item.content"
      >
      </el-step>
    </el-steps>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useTrainingStore from '@/stores/training'
import type { ElText } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const paramId = computed(() => {
  return route.query.id
})
const active = computed(() => {
  return data.value.steps_active || 0
})
const progressTransition = computed(() => {
  return `translate(${data.value.progress - 100}%, -50%)`
})
const data = ref({
  course_content: {
    title: 'loading...'
  },
  progress: 80,
  steps: [
    {
      title: 'Step 1',
      content: 'Step 1 content'
    },
    {
      title: 'Step 2',
      content: 'Step 2 content'
    },
    {
      title: 'Step 3',
      content: 'Step 3 content'
    }
  ],
  steps_active: 0
})

function freshData() {
  for (let item of useTrainingStore().trainingList) {
    if (item.id.toString() !== paramId.value) continue

    data.value = item
    break
  }
}

watch(
  () => route.path,
  () => {
    if (route.path.includes(ROUTER_NAME.USER_TRAINING_DETAIL)) {
      freshData()
    }
  }
)
onMounted(() => {
  freshData()
})
</script>

<style scoped lang="scss">
.training-details-view {
  padding: 32px 16px;

  .progress {
    display: flex;
    height: 64px;
    padding: 0px 32px;
    align-items: center;
    position: relative;
    overflow: hidden;

    border-radius: 12px;
    background: #fff;
    box-shadow:
      0px 4px 4px 0px rgba(0, 0, 0, 0.25),
      -398px 0px 0px 0px rgba(0, 0, 0, 0.25) inset;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;

      left: 0;
      top: 50%;
      transform: v-bind(progressTransition);
      border-radius: 12px;
      background: var(--Color-Primary-color-primary-light-3, #79bbff);
      box-shadow:
        0px 4px 4px 0px rgba(0, 0, 0, 0.25),
        -131px 0px 0px 0px rgba(0, 0, 0, 0.25) inset;
    }
  }

  .steps {
    margin-top: 44px;
    gap: 12px;

    .el-step {
      height: 81px;
      padding: 16px 8px;

      border-radius: 12px;
      background: var(--Color-Background-bg-color, #fff);
    }
  }
}
</style>
