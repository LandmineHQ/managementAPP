<script setup lang="ts">
import type { PropType } from 'vue'
import TabBarItem from '@/components/TabBarItem.vue'
import type { ExtractPropTypes } from 'vue'
import { readonly } from 'vue'

const props = defineProps({
  selected: {
    type: String as PropType<'management' | 'data' | 'messages' | 'user'>,
    default: 'management'
  },
  light: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits({
  'update:selected': (value: typeof props.selected) => value
})

const tablist: (typeof props.selected)[] = ['management', 'data', 'messages', 'user']

function handleSelect(selected: typeof props.selected) {
  emit('update:selected', selected)
}

export type TabBarProps = ExtractPropTypes<{
  -readonly [K in keyof typeof props]: (typeof props)[K]
}>
</script>

<template>
  <div
    class="tabBarContainer"
    :class="{
      light: props.light,
      placeholder: props.placeholder
    }"
  >
    <TabBarItem
      v-for="(name, index) in 4"
      :key="name"
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
