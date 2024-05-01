<template>
  <PageHeader title="安全生产"></PageHeader>
</template>

<script setup lang="ts">
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { ROUTER_NAME as FRONT_ROUTER_NAME } from '@/router/index'
import { ROUTER_NAME as BACK_ROUTER_NAME } from '#/routes/config'

const router = useRouter()
const route = useRoute()

const systemInfo = ref<any>()
const devicesInfo = ref<any>()

async function freshData() {
  axios.get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/system`).then((res) => {
    systemInfo.value = res.data
  })
  axios.get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/devices`).then((res) => {
    devicesInfo.value = res.data
  })
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(FRONT_ROUTER_NAME.USER_SECURITY)) {
      freshData()
    }
  }
)

onMounted(() => {
  freshData()
})
</script>

<style scoped lang="scss"></style>
