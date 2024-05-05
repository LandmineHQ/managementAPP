import { ROUTER_NAME } from '#/routes/config'
import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const usePolicyStore = defineStore('policy', () => {
  const latestPolicy = ref({
    id: 0,
    name: '互联网广告发布和运营管理办法',
    type: '政策',
    release_date: '2027-09-05T00:00:00.000Z',
    implementation_date: '2027-10-01T00:00:00.000Z',
    content: {
      title: '互联网广告发布和运营管理办法',
      content: '',
      analysis: ''
    },
    createdAt: '2024-05-04T16:51:39.000Z',
    updatedAt: '2024-05-04T16:51:39.000Z',
    ImageId: null,
    coverId: 1,
    backgroundId: 2,
    cover: {
      id: 1,
      src: '',
      createdAt: '2024-05-04T16:51:37.000Z',
      updatedAt: '2024-05-04T16:51:37.000Z'
    },
    background: {
      id: 2,
      src: '',
      createdAt: '2024-05-04T16:51:37.000Z',
      updatedAt: '2024-05-04T16:51:37.000Z'
    }
  })

  async function getAllPolicies() {
    const policies = await axios(`${DAEMON_HOST}/${ROUTER_NAME.POLICY}`, {
      params: {
        limit: Infinity
      }
    }).then((res) => res.data)

    return policies
  }

  async function getLatestPolicy() {
    const policy = await axios(`${DAEMON_HOST}/${ROUTER_NAME.POLICY}`, {}).then((res) => res.data)
    latestPolicy.value = policy

    return policy
  }

  async function getPolicyById(id: string | number) {
    const policy = await axios(`${DAEMON_HOST}/${ROUTER_NAME.POLICY}`, {
      params: {
        id: id
      }
    }).then((res) => res.data)
    return policy
  }

  return {
    /* state */
    latestPolicy,

    /* methods */
    getAllPolicies,
    getLatestPolicy,
    getPolicyById
  }
})

export default usePolicyStore
