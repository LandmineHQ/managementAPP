<script setup lang="ts">
import type { PropType } from 'vue'
import TabBarItem from '@/components/TabBarItem.vue'
import type { ExtractPropTypes } from 'vue'
import { ROUTER_NAME } from '@/router'
import useUserStore from '@/stores/user'
import { USER_PERMISSIONS } from '#/permissions/userPermission'

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

const rawTabList: ROUTER_NAME[] = [
  ROUTER_NAME.MANAGEMENT,
  ROUTER_NAME.DATA,
  ROUTER_NAME.MESSAGES,
  ROUTER_NAME.USER
]
const computedTabList = computed(() => {
  const userPermissions = useUserStore().permission
  if (!userPermissions) return rawTabList
  const removeList: ROUTER_NAME[] = []
  if ((userPermissions & USER_PERMISSIONS.OPREATION) !== USER_PERMISSIONS.OPREATION) {
    removeList.push(ROUTER_NAME.DATA)
  }
  if ((userPermissions & USER_PERMISSIONS.LAW) !== USER_PERMISSIONS.LAW) {
    removeList.push(ROUTER_NAME.MANAGEMENT)
  }
  return rawTabList.filter((item) => !removeList.includes(item))
})

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
      v-for="(item, index) in computedTabList"
      :key="item"
      :icon-name="computedTabList[index]"
      :selected
      @click="handleSelect(computedTabList[index])"
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
