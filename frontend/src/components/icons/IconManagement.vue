<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path
      d="M14 3V9.75L16.25 7.5L18.5 9.75V3H21.5V21H8V3H14ZM3.5 3H6.5V21H3.5V3Z"
      v-bind="iconStyle"
    />
  </svg>
</template>

<script setup lang="ts">
import { useIconStyle } from './useIconStyle'

const props = defineProps({
  actived: {
    required: false,
    type: Boolean,
    default: false
  }
})

const iconStyle = useIconStyle(props, 'actived')
</script>
