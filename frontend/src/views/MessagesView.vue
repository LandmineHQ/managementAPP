<script setup lang="ts">
import useAuthStore from '@/stores/auth'
</script>

<template>
  <div class="messagesView">
    <NotLogIn v-if="!useAuthStore().isLogin" />
  </div>
</template>

<style lang="scss" scoped></style>
