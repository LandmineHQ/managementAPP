<script setup lang="ts">
import type { ROUTER_NAME } from '@/router'
import { defineAsyncComponent, type PropType } from 'vue'

const props = defineProps({
  iconName: {
    type: String as PropType<(typeof ROUTER_NAME)[keyof typeof ROUTER_NAME]>,
    required: true,
    default: 'management'
  },
  selected: {
    type: String as PropType<(typeof ROUTER_NAME)[keyof typeof ROUTER_NAME]>,
    required: false,
    default: 'management'
  }
})

let iconComponent = null
switch (true) {
  case props.iconName === 'management':
    iconComponent = defineAsyncComponent(() => import('@/components/icons/IconManagement.vue'))
    break
  case props.iconName === 'data':
    iconComponent = defineAsyncComponent(() => import('@/components/icons/IconData.vue'))
    break
  case props.iconName === 'messages':
    iconComponent = defineAsyncComponent(() => import('@/components/icons/IconMessages.vue'))
    break
  case props.iconName === 'user':
    iconComponent = defineAsyncComponent(() => import('@/components/icons/IconUser.vue'))
    break
}
</script>

<template>
  <div class="tabBarItemContainer" :class="{ actived: props.iconName === selected }">
    <iconComponent :actived="props.iconName === selected" />
    <div class="font">
      {{ $t(`tabBar.${props.iconName}`) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabBarItemContainer {
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--Radius-border-radius-base, 4px);
  width: 56px;

  cursor: pointer;
  // 选中该项
  &.actived {
    width: 95px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

    // 文字
    > :nth-child(2) {
      color: var(--text-color-primary, var(--Color-Text-text-color-primary, #303133));
      font-size: 14px;
    }
  }

  // 图标
  > :nth-child(1) {
    width: var(--Size-common-component-size-small, 24px);
    height: var(--Size-common-component-size-small, 24px);
  }

  // 文字
  > :nth-child(2) {
    color: var(--text-color-placeholder, var(--Color-Text-text-color-placeholder, #a8abb2));
    text-align: center;
    font-family: Arial;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.01px;
  }
}
</style>
