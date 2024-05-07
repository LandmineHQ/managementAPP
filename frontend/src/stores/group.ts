import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const useGroupStore = defineStore('group', () => {
  const groups = ref<any>()

  async function getGroups() {
    const data = await axios.get(`${DAEMON_HOST}/${ROUTER_NAME.GROUP}`).then((res) => res.data)

    groups.value = data
    return data
  }

  return {
    /* states */
    groups,

    /* methods */
    getGroups
  }
})

export default useGroupStore
