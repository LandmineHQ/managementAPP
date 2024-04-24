<script setup lang="ts">
import useAuthStore from '@/stores/auth'
</script>

<template>
  <div class="management-view">
    <NotLogIn v-if="!useAuthStore().isLogin" />
  </div>
</template>

<style lang="scss" scoped>
.management-view {
}
</style>
