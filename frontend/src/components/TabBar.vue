<script setup lang="ts">
import type { PropType } from 'vue'
import TabBarItem from '@/components/TabBarItem.vue'
import type { ExtractPropTypes } from 'vue'
import { ROUTER_NAME } from '@/router'

const props = defineProps({
  selected: {
    type: String as PropType<(typeof ROUTER_NAME)[keyof typeof ROUTER_NAME]>,
    default: ROUTER_NAME.MANAGEMENT
  },
  light: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits({
  'update:selected': (value: ROUTER_NAME) => value
})

const tablist: ROUTER_NAME[] = [
  ROUTER_NAME.MANAGEMENT,
  ROUTER_NAME.DATA,
  ROUTER_NAME.MESSAGES,
  ROUTER_NAME.USER
]

function handleSelect(selected: ROUTER_NAME) {
  emit('update:selected', selected)
}

export type TabBarProps = ExtractPropTypes<{
  -readonly [K in keyof typeof props]: (typeof props)[K]
}>
</script>

<template>
  <div
    v-show="props.show"
    class="tabBarContainer"
    :class="{
      light: props.light,
      placeholder: props.placeholder
    }"
  >
    <TabBarItem
      v-for="(item, index) in tablist"
      :key="item"
      :icon-name="tablist[index]"
      :selected
      @click="handleSelect(tablist[index])"
    />
  </div>
</template>

<style scoped lang="scss">
.tabBarContainer {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background: var(--Color-Background-bg-color-page, #f2f3f5);

  &.light {
    background: var(--bg-color, #fff);
  }

  &.placeholder {
    > * {
      pointer-events: none;
      display: none;
    }
  }
}
</style>
