<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 62
  }
})
</script>

<template>
  <div class="notificationBarContainer">NotificationBar</div>
</template>

<style scoped lang="scss">
.notificationBarContainer {
  display: flex;
  width: 100%;
  height: calc(v-bind(height) * 1px);
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  background: var(--bg-color, #fff);
}
</style>
