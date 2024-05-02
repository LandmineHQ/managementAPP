import { DAEMON_HOST } from '@/api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ROUTER_NAME as BACK_ROUTER_NAME } from '#/routes/config'

const useMonitorStore = defineStore('monitor', () => {
  const systemInfo = ref({
    cpuUsage: 2,
    memoryUsage: 79.43344142059006,
    nodeVersion: 'v20.11.1',
    platform: 'linux',
    app: {
      usedMemory: '31.81 MB',
      version: '0.0.1'
    }
  })
  const devicesInfo = ref<Array<{ temprature: number }>>([])
  // 异常温度阈值
  const tempratureThreshold = ref(50)
  // 异常设备
  const abnormalDevices = computed(() => {
    return devicesInfo.value.filter((item) => item.temprature > tempratureThreshold.value)
  })
  // 离线设备
  const offlineDevices = computed(() => {
    return devicesInfo.value.filter((item) => Object.keys(item).length === 0)
  })
  const cpuLine = ref<Array<number>>()

  async function getCpuLine() {
    await axios.get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/cpuline`).then((res) => {
      cpuLine.value = res.data
    })
  }

  async function getSystem() {
    await axios.get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/system`).then((res) => {
      systemInfo.value = res.data
    })
  }

  async function getDevices() {
    await axios.get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/devices`).then((res) => {
      devicesInfo.value = res.data
    })
  }

  return {
    systemInfo,
    devicesInfo,
    tempratureThreshold,
    abnormalDevices,
    offlineDevices,
    cpuLine,

    getCpuLine,
    getSystem,
    getDevices
  }
})

export default useMonitorStore
