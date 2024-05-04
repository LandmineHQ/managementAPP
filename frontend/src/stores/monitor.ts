import { DAEMON_HOST } from '@/api'
import axios, { type AxiosRequestConfig } from 'axios'
import { defineStore } from 'pinia'
import { ROUTER_NAME as BACK_ROUTER_NAME } from '#/routes/config'
import type { PropType } from 'vue'

const useMonitorStore = defineStore('monitor', () => {
  /* state */
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
  const devicesInfo = ref<Array<{ temperature: number }>>([])
  // 异常温度阈值
  const temperatureThreshold = ref(50)
  // cpu使用率-线
  const cpuLine = ref<
    Array<{
      date: Date
      value: number
    }>
  >()

  const devicesLine = ref<Array<typeof devicesInfo.value>>([])

  /* getter */
  // 异常设备
  const abnormalDevices = computed(() => {
    return devicesInfo.value.filter((item) => item.temperature > temperatureThreshold.value)
  })
  // 离线设备
  const offlineDevices = computed(() => {
    return devicesInfo.value.filter((item) => Object.keys(item).length === 0)
  })
  const onlineDevices = computed(() => {
    return devicesInfo.value.filter((item) => Object.keys(item).length !== 0)
  })

  /* method */
  async function getCpuLine(params?: { showLoading?: boolean }) {
    await axios
      .get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/cpuline`, {
        ...params
      } as AxiosRequestConfig)
      .then((res) => {
        cpuLine.value = res.data
      })
  }

  async function getSystem(params?: { showLoading?: boolean }) {
    await axios
      .get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/system`, {
        ...params
      } as AxiosRequestConfig)
      .then((res) => {
        systemInfo.value = res.data
      })
  }

  async function getDevices(params?: { showLoading?: boolean }) {
    await axios
      .get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/devices`, {
        ...params
      } as AxiosRequestConfig)
      .then((res) => {
        devicesInfo.value = res.data
      })
  }

  async function getDevicesLine(params?: { showLoading?: boolean }) {
    await axios
      .get(`${DAEMON_HOST}/${BACK_ROUTER_NAME.MONITOR}/devicesline`, {
        ...params
      } as AxiosRequestConfig)
      .then((res) => {
        devicesLine.value = res.data
      })
  }

  return {
    /* state */
    systemInfo,
    devicesInfo,
    temperatureThreshold,
    cpuLine,
    devicesLine,

    /* getter */
    abnormalDevices,
    offlineDevices,
    onlineDevices,

    /* methods */
    getSystem,
    getDevices,
    getCpuLine,
    getDevicesLine
  }
})

export default useMonitorStore
