<script setup lang="ts">
import NotificationBar from '@/components/NotificationBar.vue'
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <div class="appViewContainer">
    <header>
      <NotificationBar />
      <NavigationBar />
    </header>
    <main></main>
    <footer></footer>
  </div>
</template>

<style scoped lang="scss">
.appViewContainer {
  width: 100%;
  height: 100%;
}
</style>
