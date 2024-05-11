<template>
  <div class="input-container">
    <div class="input-value">
      <ElInput type="text" v-model="inputText" placeholder="在这里输入消息"></ElInput>
      <ElIcon :size="32">
        <EpCirclePlus />
      </ElIcon>
    </div>
    <div class="features">
      <ElIcon
        :size="22"
        :class="{
          actived: activedFeature === 'record'
        }"
        @click="activedFeature = 'record'"
      >
        <EpMicrophone />
      </ElIcon>
      <ElIcon
        :size="22"
        :class="{
          actived: activedFeature === 'image'
        }"
        @click="activedFeature = 'image'"
      >
        <EpPicture />
      </ElIcon>
      <ElIcon :size="22">
        <EpPhone />
      </ElIcon>
      <ElIcon :size="22">
        <EpFinished />
      </ElIcon>
    </div>
    <div class="feature-view">
      <div v-if="activedFeature === 'record'" class="record">
        <ElText type="info" size="large">{{ $t('an-zhu-lu-yin') }}</ElText>
        <ElIcon
          @mousedown.capture.prevent.stop="touchstartMic"
          @touchstart.capture.prevent.stop="touchstartMic"
          :size="32"
          :class="{
            recording: featureStates.record
          }"
        >
          <EpMic />
        </ElIcon>
      </div>
      <div v-else-if="activedFeature === 'image'" class="image">
        <div class="image-controller">
          <ElIcon :size="26" color="white">
            <EpCameraFilled />
          </ElIcon>
          <ElIcon :size="26" color="white">
            <EpPictureFilled />
          </ElIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { PropType } from 'vue'

const features = ['record', 'image']
const activedFeature = defineModel('activedFeature', {
  type: String as PropType<(typeof features)[number]>
})
const featureStates = reactive({
  record: false
})

const inputText = ref<string>()
const listenerList = [
  {
    type: 'touchend',
    handler: () => {
      touchendMic()
    }
  },
  {
    type: 'mouseup',
    handler: () => {
      touchendMic()
    }
  }
]

let recorder: MediaRecorder
let audioBlob = new Blob()

function eventListenerHandler(active: boolean) {
  if (active) {
    listenerList.forEach((item) => {
      window.addEventListener(item.type, item.handler)
    })
  } else {
    listenerList.forEach((item) => {
      window.removeEventListener(item.type, item.handler)
    })
  }
}

async function touchstartMic() {
  featureStates.record = true

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  recorder = new MediaRecorder(stream)
  const audioChunks: Blob[] = []
  recorder.start()
  recorder.addEventListener('dataavailable', (event) => {
    audioChunks.push(event.data)
  })
  recorder.addEventListener('stop', () => {
    audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    console.log(audioBlob)
  })
}

function touchendMic() {
  if (featureStates.record === false) return
  if (recorder === undefined) return

  featureStates.record = false
  recorder.stop()
}

onMounted(() => {
  eventListenerHandler(true)
})

onUnmounted(() => {
  eventListenerHandler(false)
})
</script>

<style lang="scss" scoped>
.input-container {
  .input-value {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    background: var(--bg-color, #fff);

    .el-input {
      height: 48px;
    }

    .el-icon {
      transform: rotate(45deg);
    }
  }

  .features {
    padding: 8px 16px;
    display: flex;
    gap: 32px;

    .actived {
      color: #409eff;
    }
  }

  .feature-view {
    .record {
      display: flex;
      padding: 40px 149px 64px 149px;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .el-icon {
        width: 132px;
        height: 132px;
        flex-shrink: 0;

        border-radius: 50%;
        background-color: var(--Color-Primary-color-primary, #409eff);
        color: white;

        &.recording {
          animation: recording 300ms linear 0s infinite alternate;

          @keyframes recording {
            from {
              background-color: var(--Color-Primary-color-primary, #409eff);
              color: white;
            }

            to {
              background-color: var(--Color-Primary-color-primary-light-7, #c6e2ff);
              color: black;
            }
          }
        }
      }
    }

    .image {
      display: flex;
      height: 252px;
      padding-left: 68px;
      align-items: flex-start;
      gap: var(--Radius-border-radius-base, 4px);

      position: relative;

      .image-controller {
        display: flex;
        width: 68px;
        height: 100%;
        padding: 0 19px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 64px;

        position: absolute;
        left: 0;

        background: var(---color-info-dark-2, #73767a);
      }
    }
  }
}
</style>
