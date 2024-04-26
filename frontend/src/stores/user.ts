import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { DAEMON_HOST } from '@/api'
import ROUTER_NAME from '#/routes/config'
import { ElMessage, ElNotification } from 'element-plus'

const useUserStore = defineStore('user', () => {
  const name = ref<string>()
  const nickname = ref<string>()
  const email = ref<string>()
  const uid = ref<number>()
  const avatar = ref<string>()
  const createdAt = ref<Date>()
  const preference = ref<string>()
  const operationRecord = ref<string>()
  const identityBinding = ref<number>()
  const permission = ref<string>()
  const phone = ref<string>()
  const password = ref<string>('***')

  async function updateUser(user?: any) {
    if (!user) {
      user = await axios
        .get(`${DAEMON_HOST}/${ROUTER_NAME.USER}`)
        .then((res) => {
          if (res.data.error) {
            ElNotification.error(res.data.error)
            return ''
          }
          return res.data
        })
        .catch((error) => {
          ElNotification.error(error)
        })
    }

    if (user) {
      name.value = user.name
      nickname.value = user.nickname
      email.value = user.email
      uid.value = user.id
      avatar.value = user.avatar
      createdAt.value = user.createdAt
      preference.value = user.preference
      operationRecord.value = user.operation_record
      identityBinding.value = user.identity_binding
      permission.value = user.permission
      phone.value = user.phone
    }
  }

  type UserStoreAttributes = ReturnType<typeof useUserStore>
  type UserStoreRefValues = {
    [K in keyof UserStoreAttributes]: UserStoreAttributes[K] extends Ref<infer R> ? R : never
  }
  async function updateAttribute<K extends keyof UserStoreRefValues>(
    key: K,
    value: UserStoreRefValues[K]
  ) {
    // 实现更新逻辑
    await axios
      .put(`${DAEMON_HOST}/${ROUTER_NAME.USER}`, { [key]: value })
      .then((res) => {
        if (res.data.error) {
          ElNotification.error(res.data.error)
          return ''
        }
        ElMessage.success({ message: '更新成功！', offset: 300 })
        updateUser(res.data)
      })
      .catch((error) => {
        ElNotification.error(error)
      })
  }

  return {
    email,
    permission,
    avatar,
    identityBinding,
    name,
    nickname,
    uid,
    registrationDate: createdAt,
    preference,
    operationRecord,
    phone,
    password,

    getUserStore: updateUser,
    updateAttribute
  }
})

export default useUserStore
