<template>
  <PageHeader title=" " style="width: 100%"></PageHeader>
  <ElSpace direction="vertical" class="user-login-view" alignment="stretch">
    <ElRow style="height: 107px" justify="center">
      <ElText>用户注册</ElText>
    </ElRow>
    <ElRow>
      <ElForm :model="form" style="width: 100%" label-position="top">
        <ElFormItem label="邮箱" style="margin-top: 150px">
          <ElInput v-model="form.email" placeholder="email" clearable></ElInput>
        </ElFormItem>
        <ElFormItem label="密码">
          <ElInput v-model="form.password" placeholder="password" clearable></ElInput>
        </ElFormItem>

        <ElFormItem style="margin-top: 56px">
          <ElRow style="width: 100%" justify="space-between">
            <ElLink type="info">忘记密码？</ElLink>
            <el-button type="primary" @click="onSubmit" style="padding: 15px 46px 15px 47px">
              LOGIN
            </el-button>
          </ElRow>
        </ElFormItem>
        <ElRow justify="center" style="margin-top: 24px">
          <ElLink type="info" @click="router.push(`/${ROUTER_NAME.USER_REGISTER}?step=0`)"
            >没有账号，点此注册</ElLink
          >
        </ElRow>
      </ElForm>
    </ElRow>
  </ElSpace>
</template>

<script setup lang="ts">
import { ElForm, ElLink, ElLoading, ElMessage, ElNotification, ElSpace, ElText } from 'element-plus'
import { useRouter } from 'vue-router'
import { ROUTER_NAME } from '@/router'
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  if (form.email || form.password) {
    const loadingInstance = ElLoading.service()
    const token = await useAuthStore().getToken(form.email, form.password)
    if (!token) {
      ElNotification.error({
        title: '登录失败',
        message: '邮箱或密码错误',
        duration: 2000,
        offset: 300
      })
    } else {
      ElNotification.success({
        title: '登录成功',
        message: token,
        duration: 2000,
        offset: 300
      })
      router.push(`/${ROUTER_NAME.USER}`)
      useUserStore().getUserStore()
    }
    loadingInstance.close()
  } else {
    ElMessage.error({
      message: '请输入邮箱和密码',
      duration: 1000,
      offset: 300
    })
  }
}
</script>

<style lang="scss" scoped>
.user-login-view {
  width: 100%;
  height: 100%;
  padding: 32px;
  background: var(--bg-color-overlay, #fff);
  box-shadow: 0px 0px 35px -5px rgba(0, 0, 0, 0.25) inset;
}
</style>
