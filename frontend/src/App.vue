<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import TabBar, { type TabBarProps } from '@/components/TabBar.vue'
import { reactive } from 'vue'
import router from './router'

const appConfig = reactive({
  notificationBar: {
    height: 62
  },
  tabBar: {
    light: true,
    placeholder: false,
    selected: 'management'
  } as TabBarProps
})

function changeTabBarSelected(selected: TabBarProps['selected']) {
  appConfig.tabBar.selected = selected
  router.push(`/${selected}`)
}
</script>

<template>
  <header>
    <NotificationBar :height="appConfig.notificationBar.height" />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <TabBar
      :selected="appConfig.tabBar.selected"
      @update:selected="changeTabBarSelected($event)"
      v-bind="appConfig.tabBar"
    />
  </footer>
</template>

<style scoped>
header {
  flex: none;
  line-height: 1.5;
  max-height: 100vh;
}

main {
  flex: auto;
  height: 100%;
}

footer {
  flex: none;
}
</style>
