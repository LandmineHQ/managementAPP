<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotificationBar from '@/components/NotificationBar.vue'
import TabBar, { type TabBarProps } from '@/components/TabBar.vue'
import { reactive, watch } from 'vue'
import router, {
  ROUTER_TAB_DARK,
  ROUTER_NAME,
  ROUTER_TAB_FREE,
  ROUTER_TAB_PLACEHOLDER
} from './router'

const appConfig = reactive({
  notificationBar: {
    height: 40
  },
  tabBar: {
    light: true,
    placeholder: false,
    selected: ROUTER_NAME.MANAGEMENT,
    show: true
  } as TabBarProps
})

function changeTabBarSelected(selected: ROUTER_NAME) {
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

    // Tab处理
    appConfig.tabBar.show = true
    appConfig.tabBar.placeholder = false
    appConfig.tabBar.light = true
    for (let route of ROUTER_TAB_FREE) {
      if (newSelected === route) {
        appConfig.tabBar.show = false
        break
      }
    }
    for (let route of ROUTER_TAB_PLACEHOLDER) {
      if (newSelected === route) {
        appConfig.tabBar.placeholder = true
        break
      }
    }
    for (let route of ROUTER_TAB_DARK) {
      if (newSelected === route) {
        appConfig.tabBar.light = false
        break
      }
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
  display: flex;
  flex-direction: column;

  flex: none;
  line-height: 1.5;
  max-height: 100vh;
}

main {
  display: flex;
  flex-direction: column;

  flex: auto;
  height: 0;
}

footer {
  display: flex;
  flex-direction: column;

  flex: none;
}
</style>
