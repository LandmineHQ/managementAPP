<template>
  <div class="input-container" @mousedown.prevent>
    <div class="input-value">
      <ElInput type="text" v-model="inputText" placeholder="在这里输入消息"></ElInput>
      <ElButton
        @click="sendText(inputText as string)"
        type="primary"
        size="large"
        style="height: 100%"
      >
        <ElText>{{ $t('fa-song') }}</ElText>
      </ElButton>
    </div>
    <div class="features">
      <ElIcon
        :size="22"
        :class="{
          actived: activedFeature === 'record'
        }"
        @click="showFeatureView('record')"
      >
        <EpMicrophone />
      </ElIcon>
      <ElIcon
        :size="22"
        :class="{
          actived: activedFeature === 'image'
        }"
        @click="showFeatureView('image')"
      >
        <EpPicture />
      </ElIcon>
      <ElIcon v-if="!chatIdIsSelft" :size="22">
        <EpPhone />
      </ElIcon>
      <ElIcon v-if="chatTypeIsGroup" :size="22" @click="featureStates.task = true">
        <EpFinished />
        <AssignmentComponent v-model:dialog-visible="featureStates.task" />
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
          <ElIcon :size="26" color="white" @click="showCamera">
            <EpCameraFilled />
            <CatchCamera v-model:dialog-visible="featureStates.camera" @update:image="sendImage" />
          </ElIcon>
          <ElUpload
            ref="uploadImageRef"
            :on-exceed="imageExceedHandler"
            :on-change="imageChangeHandler"
            :auto-upload="false"
            :show-file-list="false"
            :limit="1"
          >
            <template #trigger>
              <ElIcon :size="26" color="white">
                <EpPictureFilled />
              </ElIcon>
            </template>
          </ElUpload>
        </div>
        <div class="image-legacies">
          <div v-for="image in imageLegacies" :key="image.id" class="image-legacy-item">
            <ElImage :src="image.src" @click="image.showDialog = true" fit="cover">
              <ElText type="info">{{ $t('common.loading') }}</ElText>
            </ElImage>
            <ElDialog v-model:model-value="image.showDialog" :align-center="true">
              <ElText>{{ $t('que-ren-chuan-shu-ci-tu-pian-ma') }}</ElText>
              <template #footer>
                <ElButton @click="image.showDialog = false" type="danger" plain>{{
                  $t('qu-xiao')
                }}</ElButton>
                <ElButton @click="sendLegacyImage(image)" type="primary">{{
                  $t('que-ren')
                }}</ElButton>
              </template>
            </ElDialog>
          </div>
        </div>
      </div>

      <!-- 未选择任何功能 -->
      <div v-else></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import {
  ElImage,
  ElNotification,
  ElUpload,
  genFileId,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile
} from 'element-plus'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const chatTypeIsGroup = computed(() => route.query.type === 'group')
const chatIdIsSelft = computed(() => {
  const id = route.query.id
  if (!id) return false
  if (id === useUserStore().uid?.toString()) {
    return true
  }
  return false
})

const emit = defineEmits({
  submit: (obj: { type: 'record' | 'image' | 'text'; content: string }) => {
    if (Object.keys(obj).length === 0) return false
    return true
  }
})

type Features = 'record' | 'image' | 'task' | 'call'
const activedFeature = defineModel('activedFeature', {
  type: String as PropType<Features>
})
const featureStates = reactive({
  record: false,
  camera: false,
  task: false
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

const uploadImageRef = ref<UploadInstance>()
const imageLegacies = ref<any>([])

const imageExceedHandler: UploadProps['onExceed'] = (files) => {
  uploadImageRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadImageRef.value!.handleStart(file)
}

const imageChangeHandler: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const file = uploadFile.raw
  if (file) {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      const base64 = e.target?.result as string
      sendImage(base64)
    })
    reader.readAsDataURL(file)
  }
}

function showFeatureView(feature: Features) {
  if (activedFeature.value === feature) {
    activedFeature.value = undefined
  } else {
    activedFeature.value = feature
  }
}

function showCamera() {
  featureStates.camera = true
}

function sendLegacyImage(image: any) {
  image.showDialog = false
  sendImage(image.src, false)
}

function sendImage(image: string, addInToLegacy: boolean = true) {
  if (image.includes('data:image')) {
    emit('submit', { type: 'image', content: image })
    if (addInToLegacy) {
      imageLegacies.value.unshift({
        id: imageLegacies.value.length + 1,
        src: image,
        showDialog: false
      })
    }
  } else {
    ElNotification.error({
      message: '图片格式不正确',
      duration: 5000,
      offset: 300,
      showClose: false
    })
  }
}

function sendRecord(record: string) {
  if (record.includes('data:audio')) {
    emit('submit', { type: 'record', content: record })
  } else {
    ElNotification.error({
      message: '语音格式不正确',
      duration: 5000,
      offset: 300,
      showClose: false
    })
  }
}

function sendText(text: string) {
  if (inputText.value!.length > 0) {
    emit('submit', { type: 'text', content: text })
  } else {
    ElNotification.error({
      message: '消息不能为空',
      duration: 5000,
      offset: 300,
      showClose: false
    })
  }
  inputText.value = ''
}

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
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const reader = new FileReader()
    reader.readAsDataURL(audioBlob)
    reader.addEventListener('load', (e) => {
      const base64 = e.target?.result as string
      sendRecord(base64)
    })
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
  featureStates.camera = false
})

onUnmounted(() => {
  eventListenerHandler(false)
})
</script>

<style lang="scss" scoped>
.input-container {
  flex: none;
  overflow: hidden;

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
      height: 252px;
      padding-left: 68px;

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

      .image-legacies {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 4px;
        align-items: center;
        justify-content: stretch;
        overflow-x: auto;

        .image-legacy-item {
          flex: none;
          height: 100%;
          overflow: hidden;

          .el-image {
            width: 128px;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
