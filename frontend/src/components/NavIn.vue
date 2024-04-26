<template>
  <ElRow justify="space-between" align="middle" class="app--navin">
    <slot name="default">
      <ElText>{{ props.describe }}</ElText>
    </slot>

    <ElRow align="middle">
      <ElSpace size="small">
        <ElText type="info">{{ props.value }}</ElText>
        <ElAvatar v-if="props.avatar" :src="props.avatar" size="default" />
        <ElIcon v-if="props.showArrow">
          <EpArrowRight />
        </ElIcon>
      </ElSpace>
    </ElRow>
  </ElRow>
</template>

<script setup lang="ts">
import { ElText, ElAvatar, ElSpace } from 'element-plus'

const props = defineProps({
  describe: {
    type: String,
    default: '描述'
  },
  value: {
    type: String
  },
  avatar: {
    type: String
  },
  showArrow: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.app--navin {
  height: 62px;
}
</style>
