<template>
  <PageHeader :title="queryParam.toString()"></PageHeader>
  <ElRow class="profile-edit-view">
    <ElForm :model="form" label-position="top" class="form">
      <ElFormItem label="头像" v-if="isBase64" style="margin-top: 57px">
        <ElRow style="width: 100%" align="middle" justify="space-between">
          <ElCol :span="8">
            <ElAvatar :src="form.value" size="large"></ElAvatar>
          </ElCol>
          <ElCol :span="16">
            <ElUpload
              ref="uploadFile"
              :limit="1"
              :on-exceed="handleFileExceed"
              :auto-upload="false"
              :before-upload="beforeAvatarUpload"
              list-type="text"
              :on-change="handleFileChange"
            >
              <template #trigger>
                <ElButton type="primary" size="large">选择头像</ElButton>
              </template>
              <ElRow></ElRow>
              <template #tip>
                <ElText type="warning" size="small">只能选择一张图片，多余图片会被清除</ElText>
              </template>
            </ElUpload>
          </ElCol>
        </ElRow>
      </ElFormItem>
      <ElFormItem
        v-else
        style="margin-top: 57px"
        :label="queryParam?.toString() + ': ' + originValue"
      >
        <ElInput class="input" v-model="form.value" :placeholder="queryParam.toString()"></ElInput>
      </ElFormItem>
      <ElRow justify="end" style="margin-top: 57px">
        <ElFormItem>
          <ElButton class="submit-button" type="primary" @click="submit">修改</ElButton>
        </ElFormItem>
      </ElRow>
    </ElForm>
  </ElRow>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import {
  ElForm,
  ElLoading,
  ElMessage,
  ElInput,
  ElUpload,
  ElAvatar,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile,
  genFileId,
  ElText
} from 'element-plus'
import useUserStore from '@/stores/user'

const route = useRoute()
const router = useRouter()

// 定义一个响应式的ref来存储查询参数
const queryParam = ref(getEditAttribute() || 'null')

// 使用reactive定义form对象
const form = reactive({
  value: getEditAttributeValue()
})

const originValue = computed(() => {
  const value = getEditAttributeValue()
  return value
})

const isBase64 = computed(() => {
  // @ts-ignore
  if (typeof originValue.value === 'string' && originValue.value.startsWith('data:image')) {
    return true
  } else {
    return false
  }
})

const uploadFile = ref<UploadInstance>()

const handleFileExceed: UploadProps['onExceed'] = (files) => {
  uploadFile.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadFile.value!.handleStart(file)
}

const handleFileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFiles.length > 0) {
    const file = uploadFiles[0].raw // 获取原始文件对象
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string // 这里的result就是转换后的base64字符串
        form.value = base64 // 假设你有一个响应式对象form用于存储表单数据
      }
      reader.readAsDataURL(file) // 将文件读取为Data URL
    }
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 监视$route对象，特别是查询参数的变化
watch(
  () => route.query.editAttribute,
  (newVal) => {
    queryParam.value = newVal?.toString() || 'null'
    // 你也可以在这里更新form.value，如果需要的话
    form.value = getEditAttributeValue() // 或者根据newVal设置一个新的值
  }
)

function getEditAttribute() {
  if (route.query.editAttribute) {
    return route.query.editAttribute.toString()
  } else {
    return 'unknown'
  }
}

function getEditAttributeValue() {
  const key = queryParam.value as never
  let value
  if (key === 'password') {
    value = ''
  } else {
    value = useUserStore()[key]
  }
  return value
}

async function submit() {
  // 提交逻辑
  if (!form.value) {
    ElMessage.error({ message: '请输入修改内容', offset: 300 })
    return
  }
  const loadingInstance = ElLoading.service({ text: '修改中...' })
  const attributeName = queryParam.value.toString() as never
  const attributeValue = form.value as never

  await useUserStore().updateAttribute(attributeName, attributeValue)
  router.back()
  loadingInstance.close()
}
</script>

<style scoped lang="scss">
.profile-edit-view {
  .form {
    width: 100%;
    padding: 32px;
  }

  .input {
    width: 382px;
    height: 48px;

    background: var(--Color-Info-color-info-light-8, #e9e9eb);
  }

  .submit-button {
    height: 54px;
    width: 155px;
    padding: 15px 15px;

    border-radius: 15px;
  }
}
</style>
