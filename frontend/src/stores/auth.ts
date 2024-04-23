import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const token = ref(localStorage.getItem('token') || '')

  // 初始化方法，从LocalStorage读取token
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token.value = storedToken
    isLogin.value = true
  }

  return { isLogin, token }
})

export default useAuthStore
