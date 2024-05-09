import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const useGroupStore = defineStore('group', () => {
  const groups = ref<Array<any>>([])
  const profiles = ref(new Map<string, any>())

  async function getGroups(showLoading = true) {
    const data = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.GROUP}`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => res.data)

    groups.value = data
    return data
  }

  async function getGroupProfileByGroupId(id: string) {
    if (profiles.value.has(id)) return profiles.value.get(id)
    const data = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.GROUP}/profile`, {
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
    groups,
    profiles,

    /* methods */
    getGroups,
    getGroupProfileByGroupId
  }
})

export default useGroupStore
