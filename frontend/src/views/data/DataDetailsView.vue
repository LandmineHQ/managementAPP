<template>
  <PageHeader :title="tableName + $t('xiang-qing')" />
  <el-table :data="rawTableData" class="table-container">
    <el-table-column
      v-for="key in columns"
      :key="key"
      :prop="key"
      :label="key"
      show-overflow-tooltip
    ></el-table-column>
  </el-table>
  <ElButton @click="generateXlsx" type="primary" class="generateButton">报表生成</ElButton>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import XLSX from 'xlsx'

import usePersonStore from '@/stores/person.ts'
import { ROUTER_NAME } from '@/router'

const route = useRoute()
const tableName = computed(() => {
  const tableValue = route.query.table
  if (!tableValue) return 'Person'
  return tableValue as string
})
const rawTableData = ref<any>([])
const columns = computed(() => {
  if (rawTableData.value.length > 0) {
    // 假设所有对象都有相同的键，所以我们只查看第一个对象
    return Object.keys(rawTableData.value[0])
  }
  return []
})

async function freshData() {
  const data = await usePersonStore().getAllPeole(tableName.value)
  rawTableData.value = data
}

function generateXlsx() {
  // 创建一个新的工作簿
  const wb = XLSX.utils.book_new()
  // 将JSON数据转换为工作表
  const ws = XLSX.utils.json_to_sheet(rawTableData.value)
  // 将工作表添加到工作簿的第一个位置，命名为"Report"
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  // 保存工作簿到文件，这里的文件名为"{tableName}_report_{date}.xlsx"
  XLSX.writeFile(wb, `${tableName.value}_report_${new Date().getTime()}.xlsx`)
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.DATA_DETAILS)) {
      freshData()
    }
  }
)

onMounted(() => {
  freshData()
})
</script>

<style scoped lang="scss">
.table-container {
  width: 100%;
  height: 0;
  flex: auto;
}

.generateButton {
  margin: 16px;
  padding: 16px;
  height: 64px;

  border-radius: 16px;
}
</style>
