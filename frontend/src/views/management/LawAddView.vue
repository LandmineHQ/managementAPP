<template>
  <PageHeader :title="$t('zheng-fa-mo-kuai')" />
  <ElRow class="add-container">
    <ElForm>
      <ElFormItem label="标题">
        <ElInput v-model="inputLaw.title" placeholder="请输入标题"></ElInput>
      </ElFormItem>
      <ElFormItem label="内容">
        <ElInput type="textarea" v-model="inputLaw.content" placeholder="请输入内容"></ElInput>
      </ElFormItem>
      <ElFormItem label="分析">
        <ElInput type="textarea" v-model="inputLaw.analysis" placeholder="请输入分析"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="addLaw">{{ $t('tui-song') }}</ElButton>
      </ElFormItem>
    </ElForm>
  </ElRow>

  <ElDivider></ElDivider>
</template>

<script setup lang="ts">
import usePolicyStore from '@/stores/policy'
import { ElMessage } from 'element-plus'
import type { title } from 'process'

const inputLaw = reactive({
  title: '',
  content: '',
  analysis: ''
})

function addLaw() {
  if (!inputLaw.title || !inputLaw.content || !inputLaw.analysis) {
    ElMessage.error({
      message: '请填写完整信息',
      type: 'error',
      offset: 300
    })
    return
  }
  const law = {
    content: inputLaw
  }
  usePolicyStore().pushPolicy(law)
}
</script>

<style scoped lang="scss">
.add-container {
  margin-top: 16px;
  padding: 20px;
  background-color: #fff;

  .el-text {
    display: block;
    white-space: break-spaces;
    width: 100%;
  }
}
</style>
