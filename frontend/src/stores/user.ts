import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { DAEMON_HOST } from '@/api'
import ROUTER_NAME from '#/routes/config'
import { ElNotification } from 'element-plus'

const useUserStore = defineStore('user', () => {
  const name = ref()
  const nickname = ref()
  const email = ref()
  const uid = ref()
  const avatar = ref()
  const registrationDate = ref()
  const preference = ref()
  const operationRecord = ref()
  const identityBinding = ref()
  const permission = ref()

  async function getUserStore() {
    const user = await axios
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

    if (user) {
      name.value = user.name
      nickname.value = user.nickname
      email.value = user.email
      uid.value = user.id
      avatar.value = user.avatar
      registrationDate.value = user.createdAt
      preference.value = user.preference
      operationRecord.value = user.operation_record
      identityBinding.value = user.identity_binding
      permission.value = user.permission
    }
  }

  return {
    email,
    permission,
    avatar,
    identityBinding,
    name,
    nickname,
    uid,
    registrationDate,
    preference,
    operationRecord,

    getUserStore
  }
})

export default useUserStore
