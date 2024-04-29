<template>
  <PageHeader title="安全生产"></PageHeader>
</template>

<script setup lang="ts">
import ROUTER_NAME from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const systemInfo = ref<any>()
const devicesInfo = ref<any>()

async function freshData() {
  const loadingInstance = ElLoading.service({ text: 'loading……' })

  await axios
    .get(`${DAEMON_HOST}/${ROUTER_NAME.MONITOR}/system`)
    .then((res) => {
      ElMessage.success({ message: '刷新成功', offset: 300 })
      systemInfo.value = res.data
    })
    .catch(() => {
      ElMessage.error({ message: '刷新失败', offset: 300 })
    })
  await axios
    .get(`${DAEMON_HOST}/${ROUTER_NAME.MONITOR}/devices`)
    .then((res) => {
      ElMessage.success({ message: '刷新成功', offset: 300 })
      devicesInfo.value = res.data
    })
    .catch(() => {
      ElMessage.error({ message: '刷新失败', offset: 300 })
    })

  loadingInstance.close()
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.USER_SECURITY)) {
      freshData()
    }
  }
)

onMounted(() => {
  freshData()
})
</script>

<style scoped lang="scss"></style>
