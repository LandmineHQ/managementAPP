<template>
  <ElDialog
    v-model:model-value="dialogVisible"
    :show-close="false"
    :align-center="true"
    class="camera-dialog"
    @click.prevent.stop
  >
    <div class="camera-container">
      <video ref="video" autoplay muted></video>
    </div>
    <template #footer>
      <div class="footer-container">
        <div class="prefix">
          <ElButton @click="hideCamera" type="danger">关闭</ElButton>
        </div>
        <div class="main">
          <ElButton @click="toggleCamera">
            <ElIcon :size="24" color="black">
              <EpRefresh />
            </ElIcon>
          </ElButton>
          <ElButton @click="takePhoto" type="primary">拍照</ElButton>
        </div>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
const dialogVisible = defineModel('dialogVisible', {
  type: Boolean,
  default: false
})
const emit = defineEmits({
  'update:image': (image: string) => {
    if (typeof image === 'string' && image.length > 0) return true
    return false
  }
})
const videoStream = ref<MediaStream>()
const video = ref<HTMLVideoElement>()

let cameraFacingUser = false
function toggleCamera() {
  cameraFacingUser = !cameraFacingUser
  const facingMode = cameraFacingUser ? 'user' : 'environment'
  closeCamera()
  openCamera(facingMode)
}

function openCamera(facingMode: 'environment' | 'user' = 'environment') {
  if (dialogVisible.value === false) return
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: facingMode } }) // 修改此处
    .then((stream) => {
      videoStream.value = stream
      video.value!.srcObject = stream
    })
    .catch((error) => {
      console.error('Error opening camera: ', error)
    })
}

function closeCamera() {
  if (!videoStream.value) return
  videoStream.value!.getTracks().forEach((track) => {
    track.stop()
  })
}

function hideCamera() {
  dialogVisible.value = false
}

function takePhoto() {
  let canvas = document.createElement('canvas')
  canvas.width = video.value!.videoWidth
  canvas.height = video.value!.videoHeight
  let context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(video.value!, 0, 0, canvas.width, canvas.height)
  const base64 = canvas.toDataURL('image/jpeg')
  // 这里可以处理 base64 编码的照片结果
  emit('update:image', base64)

  dialogVisible.value = false
}

watch(
  () => dialogVisible.value,
  (newValue) => {
    if (newValue) {
      console.log('打开相机')
      openCamera()
    } else {
      console.log('关闭相机')
      closeCamera()
    }
  }
)

onMounted(() => {
  openCamera()
})

onUnmounted(() => {
  closeCamera()
})
</script>

<style lang="scss">
.camera-dialog {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .camera-container {
    width: 100%;

    position: relative;

    video {
      width: 100%;
      height: 100%;
    }
  }

  .footer-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    justify-content: space-between;
  }
}
</style>
