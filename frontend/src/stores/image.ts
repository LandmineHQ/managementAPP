import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const useImageStore = defineStore('image', () => {
  const counts = ref<number>()
  const cache = new Map<string, string>()

  async function getImageById(id: string | number) {
    if (typeof id === 'number') id = id.toString()

    if (cache.has(id)) {
      return cache.get(id)
    } else {
      const image = await axios
        .get(`${DAEMON_HOST}/${ROUTER_NAME.IMAGE}`, {
          params: {
            id: id
          }
        })
        .then((res) => res.data as string)
      cache.set(id, image)
      return image
    }
  }

  async function getCounts() {
    await axios.get(`${DAEMON_HOST}/${ROUTER_NAME.IMAGE}/counts`).then((res) => {
      counts.value = res.data.counts as number
    })

    return counts.value
  }

  return {
    /* states */
    counts,

    /* methods */
    getImageById,
    getCounts
  }
})

export default useImageStore
