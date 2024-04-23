import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  const name = ref()
  const nickname = ref()
  const uid = ref()
  const cookie = ref()
  const registrationDate = ref()
  const preference = ref()
  const operationRecord = ref()
  const identityBinding = ref()
  const avatar = ref()
  const permission = ref()
  const email = ref()

  return {
    email,
    permission,
    avatar,
    identityBinding,
    name,
    nickname,
    uid,
    cookie,
    registrationDate,
    preference,
    operationRecord
  }
})

export default useUserStore
