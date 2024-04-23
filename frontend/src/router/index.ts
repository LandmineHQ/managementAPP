import { createRouter, createWebHashHistory } from 'vue-router'

enum ROUTER_NAME {
  MANAGEMENT = 'management',
  DATA = 'data',
  MESSAGES = 'messages',
  USER = 'user',
  DEBUG = 'debug'
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: ROUTER_NAME.MANAGEMENT
    },
    {
      path: `/${ROUTER_NAME.MANAGEMENT}`,
      name: ROUTER_NAME.MANAGEMENT,
      component: () => import('@/views/ManagementView.vue')
    },
    {
      path: `/${ROUTER_NAME.DATA}`,
      name: ROUTER_NAME.DATA,
      component: () => import('@/views/DataView.vue')
    },
    {
      path: `/${ROUTER_NAME.MESSAGES}`,
      name: ROUTER_NAME.MESSAGES,
      component: () => import('@/views/MessagesView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER}`,
      name: ROUTER_NAME.USER,
      component: () => import('@/views/UserView.vue')
    },
    {
      path: `/${ROUTER_NAME.DEBUG}`,
      name: ROUTER_NAME.DEBUG,
      component: () => import('@/views/DebugView.vue')
    }
  ]
})

export default router
export { ROUTER_NAME }
