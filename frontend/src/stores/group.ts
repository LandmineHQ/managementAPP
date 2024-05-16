import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const useGroupStore = defineStore('group', () => {
  const groups = ref<Array<any>>([])
  const groupMap = ref(new Map<string, any>())
  const profiles = ref(new Map<string, any>())

  async function getAllGroups(showLoading = true) {
    const data = (await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.GROUP}`, {
        // @ts-expect-error
        showLoading: showLoading
      })
      .then((res) => res.data)) as Array<any>

    groups.value = data
    return data
  }

  async function getGroupById(id: string) {
    return groupMap.value.get(id)
  }

  async function getGroupProfileByGroupId(id: string) {
    if (profiles.value.has(id)) return profiles.value.get(id)
    const data = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.GROUP}/profile`, {
        params: {
          id: id
        },
        // @ts-expect-error
        showLoading: false
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
    getAllGroups,
    getGroupProfileByGroupId,

    getGroupById
  }
})

export default useGroupStore
