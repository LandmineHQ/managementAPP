<template>
  <PageHeader title="用户属性"></PageHeader>
  <ElScrollbar>
    <ElSpace
      style="margin-top: 8px"
      :size="0"
      direction="vertical"
      fill
      class="user-profile-view"
      :spacer="
        h(ElDivider, {
          style: {
            margin: '0'
          }
        })
      "
    >
      <NavIn
        describe="头像"
        @click="editProfile(`avatar`)"
        :avatar="useUserStore().avatar"
        showArrow
      ></NavIn>
      <NavIn
        describe="昵称"
        @click="editProfile(`nickname`)"
        :value="useUserStore().nickname"
        showArrow
      ></NavIn>
      <NavIn describe="UID" :value="useUserStore().uid + ''"></NavIn>
      <NavIn describe="身份绑定" :value="useUserStore().identityBinding?.toString()"></NavIn>
      <NavIn
        describe="手机号"
        @click="editProfile(`phone`)"
        :value="formattedPhone"
        showArrow
      ></NavIn>
      <NavIn describe="邮箱" :value="useUserStore().email"></NavIn>
      <NavIn describe="修改密码" @click="editProfile(`password`)" showArrow></NavIn>
      <NavIn describe="注册时间" :show-arrow="false" :value="formattedRegistrationDate"></NavIn>
    </ElSpace>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useUserStore from '@/stores/user'
import { ElScrollbar, ElSpace, ElDivider } from 'element-plus'
import { h, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const formattedRegistrationDate = computed(() => {
  // @ts-ignore
  const date = new Date(useUserStore().registrationDate)
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  )
})

const formattedPhone = computed(() => {
  const phone = useUserStore().phone
  return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''
})

function editProfile(attributeName: string) {
  router.push(`/${ROUTER_NAME.USER_PROFILE_EDIT}?editAttribute=${attributeName}`)
}
</script>

<style lang="scss" scoped>
.user-profile-view {
  width: 100%;

  padding: 0 32px;
  background-color: #fff;
}
</style>
