<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import TabBar, { type TabBarProps } from '@/components/TabBar.vue'
import { reactive, watch } from 'vue'
import router, { ROUTER_NAME } from './router'

const appConfig = reactive({
  notificationBar: {
    height: 40
  },
  tabBar: {
    light: true,
    placeholder: false,
    selected: ROUTER_NAME.MANAGEMENT
  } as TabBarProps
})

function changeTabBarSelected(selected: ROUTER_NAME) {
  console.log('changeTabBarSelected', selected)
  router.push(`/${selected}`)
}

// Watch for route changes and update the tabBar.selected accordingly
watch(
  () => router.currentRoute.value,
  (newRoute) => {
    const newSelected = newRoute.path.substring(1) // Remove the leading '/'
    if (newSelected !== appConfig.tabBar.selected) {
      appConfig.tabBar.selected = newRoute.name as (typeof ROUTER_NAME)[keyof typeof ROUTER_NAME]
    }
  },
  { immediate: true }
)
</script>

<template>
  <header>
    <NotificationBar :height="appConfig.notificationBar.height" />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
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
