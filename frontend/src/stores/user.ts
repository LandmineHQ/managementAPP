import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { DAEMON_HOST } from '@/api'
import { ROUTER_NAME } from '#/routes/config'
import { ElMessage } from 'element-plus'
import { USER_PERMISSIONS } from '#/permissions/userPermission'

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
  const permission = ref<number>()
  const phone = ref<string>()
  const password = ref<string>('***')

  const profiles = ref(new Map<string, any>())

  const permissionIsOperation = computed(() => {
    if (!permission.value) return false
    if ((permission.value & USER_PERMISSIONS.OPREATION) !== USER_PERMISSIONS.OPREATION) return false
    return true
  })
  const permissionIsLaw = computed(() => {
    if (!permission.value) return false
    if ((permission.value & USER_PERMISSIONS.LAW) === USER_PERMISSIONS.LAW) return true
    return false
  })

  async function updateUser(user?: any) {
    if (!user) {
      user = await axios.get(`${DAEMON_HOST}/${ROUTER_NAME.USER}`).then((res) => {
        return res.data
      })
    }

    if (user) {
      name.value = user.name
      nickname.value = user.nickname
      email.value = user.email
      uid.value = user.id
      avatar.value = user.avatar ? user.avatar.src : null
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
    await axios.put(`${DAEMON_HOST}/${ROUTER_NAME.USER}`, { [key]: value }).then((res) => {
      updateUser(res.data)
    })
  }

  async function registerUserByEmailCode(params: any) {
    const isOK = await axios
      .post(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}/code/register`, { ...params })
      .then(() => {
        ElMessage.success({ message: '注册成功！', offset: 300 })
        return true
      })
      .catch(() => {
        return false
      })
    return isOK
  }

  async function getCode(email: string) {
    const isOk = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.AUTH}/code`, { params: { email } })
      .then(() => {
        ElMessage.success({ message: '请求验证码成功', offset: 300 })
        return true
      })
      .catch(() => {
        return false
      })
    return isOk
  }

  async function getProfileByUserId(id: string) {
    if (profiles.value.has(id)) return profiles.value.get(id)
    const data = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.USER}/profile`, {
        params: {
          id: id
        }
      })
      .then((res) => res.data)
    profiles.value.set(id, data)
    return data
  }

  return {
    /* states */
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

    profiles,

    /* getter */
    permissionIsLaw,
    permissionIsOperation,

    /* methods */
    getUserStore: updateUser,
    updateUser,
    updateAttribute,
    registerUserByEmailCode,
    getCode,
    getProfileByUserId
  }
})

export default useUserStore
