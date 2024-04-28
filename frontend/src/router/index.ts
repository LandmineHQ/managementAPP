import { createRouter, createWebHashHistory } from 'vue-router'

enum ROUTER_NAME {
  ROOT = '',
  MANAGEMENT = 'management',
  DATA = 'data',
  MESSAGES = 'messages',
  USER = 'user',
  USER_LOGIN = 'user/login',
  USER_PROFILE = 'user/profile',
  USER_PROFILE_EDIT = 'user/profile/edit',
  USER_HELP = 'user/help',
  USER_REGISTER = 'user/register',
  USER_FORGET = 'user/forget',
  USER_TRAINING = 'user/training',
  DEBUG = 'debug'
}

// 不使用Tab的路由
const ROUTER_TAB_FREE = [
  ROUTER_NAME.USER_HELP,
  ROUTER_NAME.USER_PROFILE,
  ROUTER_NAME.USER_PROFILE_EDIT,
  ROUTER_NAME.USER_LOGIN,
  ROUTER_NAME.USER_REGISTER,
  ROUTER_NAME.USER_FORGET,
  ROUTER_NAME.USER_TRAINING
]

// Tab Dark Theme 的路由
const ROUTER_TAB_DARK = []

// 仅占位的Tab的路由
const ROUTER_TAB_PLACEHOLDER = []

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
      component: () => import('@/views/user/LoginView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_PROFILE}`,
      name: ROUTER_NAME.USER_PROFILE,
      component: () => import('@/views/user/ProfileView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_PROFILE_EDIT}`,
      name: ROUTER_NAME.USER_PROFILE_EDIT,
      component: () => import('@/views/user/ProfileEditView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_HELP}`,
      name: ROUTER_NAME.USER_HELP,
      component: () => import('@/views/user/HelpView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_REGISTER}`,
      name: ROUTER_NAME.USER_REGISTER,
      component: () => import('@/views/user/RegisterView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_FORGET}`,
      name: ROUTER_NAME.USER_FORGET,
      component: () => import('@/views/user/ForgetView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_TRAINING}`,
      name: ROUTER_NAME.USER_TRAINING,
      component: () => import('@/views/user/TrainingView.vue')
    }
  ]
})

export default router
export { ROUTER_NAME, ROUTER_TAB_FREE, ROUTER_TAB_DARK, ROUTER_TAB_PLACEHOLDER }
