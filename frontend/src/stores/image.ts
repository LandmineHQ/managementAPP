import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const useImageStore = defineStore('image', () => {
  async function getImageById(id: string | number) {
    if (typeof id === 'number') {
      id = id.toString(10)
    }

    const image = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.IMAGE}`, {
        params: {
          id: id
        }
      })
      .then((res) => res.data as string)
    return image
  }

  return {
    /* methods */
    getImageById
  }
})

export default useImageStore
