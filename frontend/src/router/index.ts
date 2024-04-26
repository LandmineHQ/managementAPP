import { createRouter, createWebHashHistory } from 'vue-router'

enum ROUTER_NAME {
  ROOT = '',
  MANAGEMENT = 'management',
  DATA = 'data',
  MESSAGES = 'messages',
  USER = 'user',
  USER_LOGIN = 'user/login',
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
    },
    {
      path: `/${ROUTER_NAME.USER_LOGIN}`,
      name: ROUTER_NAME.USER_LOGIN,
      component: () => import('@/views/UserLoginView.vue')
    }
  ]
})

export default router
export { ROUTER_NAME }
