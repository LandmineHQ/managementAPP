import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/management'
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/ManagementView.vue')
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('@/views/DataView.vue')
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessagesView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/debug',
      name: 'debug',
      component: () => import('@/views/DebugView.vue')
    }
  ]
})

export default router
