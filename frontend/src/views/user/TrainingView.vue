<template>
  <PageHeader title="我的培训"></PageHeader>
  <ElScrollbar>
    <ElSpace size="large" fill class="training-view">
      <div class="card" v-for="(item, index) in useTrainingStore().trainingList" :key="index">
        <div class="cover">
          <ElImage fit="cover" :src="item.course_content.coverImage">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <EpPicture />
                </el-icon>
              </div>
            </template>
          </ElImage>
        </div>
        <div class="body">
          <ElSpace style="width: 100%" fill size="default">
            <ElRow justify="space-between">
              <ElText>{{ item.course_content.title }}</ElText>
              <ElText type="info" size="small">{{
                getFormatTime(item.course_content.time)
              }}</ElText>
            </ElRow>
            <ElRow align="middle" justify="start">
              <ElCol :span="16">
                <ElRow justify="start">
                  <ElText type="info" size="small">{{ item.course_content.content }}</ElText>
                </ElRow>
              </ElCol>
              <ElCol :span="8">
                <ElRow justify="end">
                  <ElLink @click="openDetails(item.id)" v-if="item.progress > 0" type="primary"
                    >继续学习</ElLink
                  >
                  <ElLink @click="openDetails(item.id)" v-else type="success">开始</ElLink>
                </ElRow>
              </ElCol>
            </ElRow>
          </ElSpace>
        </div>
      </div>
    </ElSpace>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElImage, ElLink, ElLoading, ElMessage, ElSpace, ElScrollbar, ElText } from 'element-plus'
import useTrainingStore from '@/stores/training'
import { useRoute, useRouter } from 'vue-router'
import { ROUTER_NAME } from '@/router'

const router = useRouter()
const route = useRoute()

function getFormatTime(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

function openDetails(id: number) {
  router.push({
    path: `/${ROUTER_NAME.USER_TRAINING_DETAIL}`,
    query: {
      id
    }
  })
}

async function freshData() {
  const loadingInstance = ElLoading.service({ text: '加载中……' })
  const isOK = await useTrainingStore().getTrainingList({})
  if (isOK) {
    ElMessage.success({ message: '加载成功', offset: 300 })
  } else {
    ElMessage.error({ message: '加载失败', offset: 300 })
  }
  loadingInstance.close()
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.USER_TRAINING)) {
      freshData()
    }
  }
)
</script>

<style scoped lang="scss">
.training-view {
  margin-top: 16px;
  margin-bottom: 30vh;

  padding: 0 16px;

  .card {
    height: 318px;
    overflow: hidden;

    border-radius: 12px;
    border: 1px solid var(--border-color-light, #e4e7ed);
    background: var(--bg-color-overlay, #fff);

    /* box-shadow */
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px 0px rgba(0, 0, 0, 0.08);

    .cover {
      width: 100%;
      height: 192px;
      overflow: hidden;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 64px;
      }
    }

    .body {
      width: 100%;
      padding: 14px;
    }
  }
}
</style>
