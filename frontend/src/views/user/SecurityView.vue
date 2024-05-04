<template>
  <PageHeader title="安全生产"></PageHeader>
  <ElScrollbar fill>
    <ElSpace fill style="width: 100%" :size="32" class="security-view">
      <div v-if="useMonitorStore().offlineDevices.length" class="card offline">
        <ElRow>
          <ElText class="title">设备离线</ElText>
        </ElRow>
        <ElSpace fill>
          <ElRow>
            <ElText type="info" class="info">离线数量</ElText>
          </ElRow>
          <ElRow>
            <ElText class="details">{{ useMonitorStore().offlineDevices.length }}</ElText>
          </ElRow>
        </ElSpace>
        <ElIcon :size="124" class="icon">
          <EpPlatform />
        </ElIcon>
      </div>

      <div v-if="useMonitorStore().abnormalDevices.length" class="card abnormal">
        <ElRow>
          <ElText class="title">设备温度异常</ElText>
        </ElRow>
        <ElSpace fill>
          <ElRow>
            <ElText type="info" class="info">异常数量</ElText>
          </ElRow>
          <ElRow>
            <ElText class="details">{{ useMonitorStore().abnormalDevices.length }}</ElText>
          </ElRow>
        </ElSpace>
        <ElIcon :size="124" class="icon" color="white">
          <EpOdometer />
        </ElIcon>
      </div>

      <div class="card">
        <ElRow>
          <ElText class="title">系统资源信息</ElText>
        </ElRow>
        <ElSpace fill>
          <ElRow>
            <ElText type="info" class="info">{{ '主控CPU，RAM使用率' }}</ElText>
          </ElRow>
          <ElRow>
            <ElText class="details">{{
              `${useMonitorStore().systemInfo.cpuUsage.toFixed(0)}%，${useMonitorStore().systemInfo.memoryUsage.toFixed(0)}%`
            }}</ElText>
          </ElRow>
        </ElSpace>
        <ElIcon :size="124" class="icon">
          <EpCpu />
        </ElIcon>
      </div>

      <div class="card">
        <ElRow>
          <ElText class="title">监控标题</ElText>
        </ElRow>
        <ElSpace fill>
          <ElRow>
            <ElText type="info" class="info">{{ '在线数量 / 总数量' }}</ElText>
          </ElRow>
          <ElRow>
            <ElText class="details">{{
              `${useMonitorStore().onlineDevices.length} / ${useMonitorStore().devicesInfo.length}`
            }}</ElText>
          </ElRow>
        </ElSpace>
        <ElIcon :size="124" class="icon">
          <EpMonitor />
        </ElIcon>
      </div>

      <div class="card">
        <ElRow>
          <ElText class="title">设备温度</ElText>
        </ElRow>
        <ElSpace fill>
          <ElRow>
            <ElText type="info" class="info">{{ '正常数量/在线数量' }}</ElText>
          </ElRow>
          <ElRow>
            <ElText class="details">{{
              `${useMonitorStore().onlineDevices.length - useMonitorStore().abnormalDevices.length} / ${useMonitorStore().onlineDevices.length}`
            }}</ElText>
          </ElRow>
        </ElSpace>
        <ElIcon :size="124" class="icon">
          <EpOdometer />
        </ElIcon>
      </div>

      <div ref="cpuChart" class="chart"></div>
      <div ref="devicesChart" class="chart"></div>
    </ElSpace>
  </ElScrollbar>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ElSpace } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { ROUTER_NAME as FRONT_ROUTER_NAME } from '@/router/index'
import useMonitorStore from '@/stores/monitor'

const router = useRouter()
const route = useRoute()

const cpuChart = ref<HTMLDivElement>()
const devicesChart = ref<HTMLDivElement>()

let cpuChartInstance: echarts.ECharts
let devicesChartInstance: echarts.ECharts
let isActive = true

const dataInterval = setInterval(() => {
  if (isActive) {
    freshData(false)
  }
}, 5000)
const chartsInterval = setInterval(() => {
  if (isActive) {
    freshCharts(false)
  }
}, 5000)

async function freshData(showLoading = true) {
  useMonitorStore().getDevices({ showLoading: showLoading })
  useMonitorStore().getSystem({ showLoading: showLoading })
}

async function freshCharts(showLoading = true) {
  await useMonitorStore().getCpuLine({ showLoading: showLoading })
  await useMonitorStore().getDevicesLine({ showLoading: showLoading })
  updateCpuChart()
  updateDevicesChart()
}

function updateDevicesChart() {
  const data = useMonitorStore().devicesLine.map((devicesInfo) => {
    let onlineCount = 0
    devicesInfo.forEach((device) => {
      if (Object.keys(device).length > 0) {
        onlineCount++
      }
    })
    return onlineCount
  })

  const option: echarts.EChartsOption = {
    title: {
      text: '设备在线趋势',
      top: '16px',
      left: '16px'
    },
    grid: {
      left: '40px', // 增加左边距
      bottom: '40px' // 增加下边距
    },
    xAxis: {
      type: 'category',
      data: data.map((_, index) => index.toString()).reverse()
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true
      }
    ]
  }
  devicesChartInstance && devicesChartInstance.setOption(option)
}

function updateCpuChart() {
  const data = useMonitorStore().cpuLine?.map((item) => [item.date, item.value])

  const option: echarts.EChartsOption = {
    title: {
      text: '主控负载趋势',
      top: '16px',
      left: '16px'
    },
    grid: {
      left: '40px', // 增加左边距
      bottom: '40px' // 增加下边距
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: function (value) {
          // 使用echarts的format工具来格式化时间
          return echarts.time.format(value, '{ss}', false)
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true
      }
    ]
  }
  cpuChartInstance && cpuChartInstance.setOption(option)
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(FRONT_ROUTER_NAME.USER_SECURITY)) {
      isActive = true
      freshData()
      freshCharts()
    } else {
      isActive = false
    }
  }
)

onMounted(async () => {
  cpuChartInstance = echarts.init(cpuChart.value)
  devicesChartInstance = echarts.init(devicesChart.value)

  freshData()
  freshCharts()
})

onUnmounted(() => {
  clearInterval(dataInterval)
  clearInterval(chartsInterval)
})
</script>

<style scoped lang="scss">
.security-view {
  padding: 16px;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;

    padding: 16px 16px 96px;

    border-radius: 15px;
    background: var(--Color-Background-bg-color, #fff);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

    .title {
      color: var(--Color-Text-text-color-primary, #303133);
      text-align: center;

      /* bold/medium */
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 150% */
    }

    .info {
      color: var(--Color-Text-text-color-secondary, #909399);
      text-align: center;

      /* regular/small */
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }
    .details {
      color: var(--Color-Text-text-color-primary, #303133);
      text-align: center;
      font-family: Inter;
      font-size: 40px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px; /* 70% */
    }

    .icon {
      position: absolute;
      bottom: 16px;
      right: 32px;
      opacity: 0.1;
    }
  }

  .offline {
    background: var(--Color-Error-color-error, #f56c6c);
    .title {
      color: var(--Color-Text-text-color-primary, #303133);
    }
    .info {
      color: var(--Color-Error-color-error-dark-2, #c45656);
    }
    .details {
      color: var(--Color-Text-text-color-primary, #303133);
    }
    .icon {
      opacity: 0.5;
    }
  }

  .abnormal {
    background: var(--Color-Warning-color-warning, #e6a23c);
    .title,
    .info,
    .details {
      color: var(--Color-Fill-fill-color, #f0f2f5);
    }
    .icon {
      opacity: 0.7;
    }
  }

  .chart {
    width: 100%;
    height: 250px;
    position: relative;

    border-radius: 15px;
    background: var(--Color-Background-bg-color, #fff);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  }

  margin-bottom: 50vh;
}
</style>
