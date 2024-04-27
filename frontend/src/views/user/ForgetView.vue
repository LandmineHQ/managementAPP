<template>
  <PageHeader title="找回密码"></PageHeader>
  <ElForm class="forget-view" label-position="top">
    <ElRow style="width: 100%" justify="center">
      <ElText class="title">{{ title }}</ElText>
    </ElRow>
    <ElFormItem
      v-if="currentStep === FORGET_STEP.STEP_0_EMAIL"
      class="inputs"
      v-model="form"
      label="邮箱"
    >
      <ElInput class="item" v-model="form.email" placeholder="example@gmail.com"></ElInput>
    </ElFormItem>

    <ElFormItem
      v-if="currentStep === FORGET_STEP.STEP_1_CODE"
      class="inputs"
      v-model="form"
      label="验证码"
    >
      <ElInput class="item" v-model="form.code" placeholder="123456"></ElInput>
    </ElFormItem>

    <ElFormItem
      v-if="currentStep === FORGET_STEP.STEP_2_PASSWORD"
      class="inputs"
      v-model="form"
      label="密码"
    >
      <ElInput class="item" v-model="form.password" placeholder="your new password"></ElInput>
    </ElFormItem>

    <ElFormItem class="buttons">
      <ElRow style="width: 100%" justify="end">
        <ElButton @click="submit" class="item" type="primary">NEXT</ElButton>
      </ElRow>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { ElText } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  code: '',
  password: ''
})

enum FORGET_STEP {
  STEP_0_EMAIL = '0',
  STEP_1_CODE = '1',
  STEP_2_PASSWORD = '2'
}

const currentStep = computed(() => {
  const step = route.query.step
  if (!step) return FORGET_STEP.STEP_0_EMAIL
  else return step as FORGET_STEP
})

const title = computed(() => {
  switch (currentStep.value) {
    case FORGET_STEP.STEP_0_EMAIL:
      return '请输入邮箱'
    case FORGET_STEP.STEP_1_CODE:
      return '请输入验证码'
    case FORGET_STEP.STEP_2_PASSWORD:
      return '请输入新密码'
    default:
      return 'ERROR'
  }
})

async function submit() {
  function nextStep() {
    router.push({
      query: {
        step: parseInt(currentStep.value) + 1
      }
    })
  }

  switch (currentStep.value) {
    case FORGET_STEP.STEP_0_EMAIL: {
      const isOK = await useAuthStore().requestValidationCode(form.email)
      if (isOK) nextStep()
      break
    }
    case FORGET_STEP.STEP_1_CODE: {
      nextStep()
      break
    }
    case FORGET_STEP.STEP_2_PASSWORD: {
      useAuthStore().resetPasswordByCode(form.email, form.code, form.password)
      break
    }
  }
}
</script>

<style scoped lang="scss">
.forget-view {
  margin-top: 8px;
  width: 100%;
  height: 100%;
  padding: 16px;

  background: var(--bg-color-overlay, #fff);
  box-shadow: 0px 0px 35px -5px rgba(0, 0, 0, 0.25) inset;

  .title {
    margin-top: 190px;

    color: var(--text-color-primary, var(--Color-Text-text-color-primary, #303133));
    text-align: center;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 85.714% */
    letter-spacing: -0.01px;
  }

  .inputs {
    margin-top: 82px;

    .item {
      height: 48px;
    }
  }

  .buttons {
    margin-top: 73px;

    .item {
      height: 54px;
      width: 155px;

      border-radius: 15px;
      background: var(--Color-Primary-color-primary-light-5, #9fceff);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
