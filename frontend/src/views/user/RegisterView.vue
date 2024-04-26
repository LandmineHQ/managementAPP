<template>
  <PageHeader :title="title"></PageHeader>
  <ElForm :model="form" label-position="top" style="width: 100%" class="register-view">
    <ElRow justify="center">
      <ElText class="title" size="large" type="primary">{{ title }}</ElText>
    </ElRow>

    <ElFormItem label="昵称" v-if="step === '0'">
      <ElInput class="input" v-model="form.nickname" placeholder="nickname" />
    </ElFormItem>

    <ElFormItem label="邮箱" v-if="step === '1'">
      <ElInput class="input" v-model="form.email" placeholder="email" />
    </ElFormItem>

    <ElFormItem label="验证码" v-if="step === '2'">
      <ElRow align="middle" style="height: 48px; width: 100%">
        <ElCol class="code-char" :span="4" v-for="(char, index) in codeChars" :key="index">
          <ElRow justify="center" style="height: 100%" class="code-value">
            <ElText>
              {{ char }}
            </ElText>
          </ElRow>
        </ElCol>
      </ElRow>
      <ElInput class="input code" v-model="form.code" placeholder="code" />
    </ElFormItem>

    <ElFormItem label="密码" v-if="step === '3'">
      <ElInput class="input" v-model="form.password" placeholder="password" />
    </ElFormItem>

    <ElFormItem>
      <ElRow justify="end" style="width: 100%">
        <ElButton class="submit" type="primary" @click="submit">
          {{ submitButtonContent }}
        </ElButton>
      </ElRow>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import { ElText } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const step = computed(() => {
  const currentStep = route.query.step
  if (!currentStep) {
    return '0'
  } else {
    return currentStep as string
  }
})

const title = computed(() => {
  switch (true) {
    case step.value === '0':
      return '注册账户'
    case step.value === '1':
      return '邮箱'
    case step.value === '2':
      return '验证码'
    case step.value === '3':
      return '密码'
    default:
      return '忘记密码'
  }
})

const submitButtonContent = computed(() => {
  return step.value !== '3' ? '下一步' : '提交'
})

const form = reactive({
  nickname: '',
  email: '',
  code: '',
  password: ''
})

// 计算属性，将code字符串转换为字符数组
const codeChars = computed(() => {
  const data = form.code.split('')
  while (data.length < 6) {
    data.push('_')
  }
  return data
})

watch(
  () => form.code,
  (newValue) => {
    // 仅保留数字，并限制长度为6
    if (newValue.length > 6) {
      form.code = newValue.replace(/\D/g, '').slice(0, 6)
    }
  }
)

function submit() {
  if (submitButtonContent.value === '下一步') {
    router.push(`/${ROUTER_NAME.USER_REGISTER}?step=${parseInt(step.value) + 1}`)
  } else {
    // submit
    console.table(form)
  }
}
</script>

<style scoped lang="scss">
.register-view {
  margin-top: 8px;
  height: 100%;
  padding: 32px;
  background: var(--bg-color-overlay, #fff);
  box-shadow: 0px 0px 35px -5px rgba(0, 0, 0, 0.25) inset;

  .title {
    margin-top: 190px;

    height: 107px;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 85.714% */
    letter-spacing: -0.01px;
  }

  .input {
    height: 48px;
    background: var(--Color-Info-color-info-light-9, #f4f4f5);

    &.code {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  .code-char {
    padding: 6px;

    .code-value {
      border-radius: 9px;
      padding: 8px 4px;
      background: var(--Color-Info-color-info-light-9, #f4f4f5);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }

  .submit {
    margin-top: 73px;
    display: flex;
    width: 155px;
    height: 54px;
    padding: 15px 53px 15px 54px;
    justify-content: center;
    align-items: center;

    border-radius: 15px;
    background: var(--Color-Primary-color-primary-light-5, #9fceff);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
}
</style>
