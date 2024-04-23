<script setup lang="ts">
import NotLogIn from '@/components/NotLogIn.vue'
import useAuthStore from '@/stores/auth'
</script>

<template>
  <div class="dataView">
    <NotLogIn v-if="!useAuthStore().isLogin" />
  </div>
</template>

<style lang="scss" scoped></style>
