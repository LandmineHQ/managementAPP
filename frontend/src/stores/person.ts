import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const usePersonStore = defineStore('person', () => {
  async function getAllPeole(table: string) {
    const data = await axios
      .get(`${DAEMON_HOST}/${ROUTER_NAME.DATA}`, {
        params: {
          table: table
        }
      })
      .then((res) => res.data)
    return data
  }

  return {
    /* methods */
    getAllPeole
  }
})

export default usePersonStore
