import { createRouter, createWebHashHistory } from 'vue-router'

enum ROUTER_NAME {
  ROOT = '',

  MANAGEMENT = 'management',

  DATA = 'data',

  MESSAGES = 'messages',
  MESSAGES_POLICY = 'messages/policy',
  MESSAGES_POLICY_DETAIL = 'messages/policy/detail',

  USER = 'user',
  USER_LOGIN = 'user/login',
  USER_PROFILE = 'user/profile',
  USER_PROFILE_EDIT = 'user/profile/edit',
  USER_HELP = 'user/help',
  USER_REGISTER = 'user/register',
  USER_FORGET = 'user/forget',
  USER_TRAINING = 'user/training',
  USER_TRAINING_DETAIL = 'user/training/details',
  USER_SECURITY = 'user/security',

  DEBUG = 'debug',
  DEBUG_IMAGES = 'debug/images'
}

// 不使用Tab的路由
const ROUTER_TAB_FREE = [
  ROUTER_NAME.MESSAGES_POLICY_DETAIL,
  ROUTER_NAME.USER_HELP,
  ROUTER_NAME.USER_PROFILE,
  ROUTER_NAME.USER_PROFILE_EDIT,
  ROUTER_NAME.USER_LOGIN,
  ROUTER_NAME.USER_REGISTER,
  ROUTER_NAME.USER_FORGET,
  ROUTER_NAME.USER_TRAINING,
  ROUTER_NAME.USER_TRAINING_DETAIL,
  ROUTER_NAME.USER_SECURITY
]

// Tab Dark Theme 的路由
const ROUTER_TAB_DARK = [ROUTER_NAME.MESSAGES_POLICY]

// 仅占位的Tab的路由
const ROUTER_TAB_PLACEHOLDER = [ROUTER_NAME.MESSAGES_POLICY]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: ROUTER_NAME.MANAGEMENT
    },

    /* management */
    {
      path: `/${ROUTER_NAME.MANAGEMENT}`,
      name: ROUTER_NAME.MANAGEMENT,
      component: () => import('@/views/ManagementView.vue')
    },

    /* data */
    {
      path: `/${ROUTER_NAME.DATA}`,
      name: ROUTER_NAME.DATA,
      component: () => import('@/views/DataView.vue')
    },

    /* messages */
    {
      path: `/${ROUTER_NAME.MESSAGES}`,
      name: ROUTER_NAME.MESSAGES,
      component: () => import('@/views/MessagesView.vue')
    },
    {
      path: `/${ROUTER_NAME.MESSAGES_POLICY}`,
      name: ROUTER_NAME.MESSAGES_POLICY,
      component: () => import('@/views/messages/PolicyView.vue')
    },
    {
      path: `/${ROUTER_NAME.MESSAGES_POLICY_DETAIL}`,
      name: ROUTER_NAME.MESSAGES_POLICY_DETAIL,
      component: () => import('@/views/messages/PolicyDetailView.vue')
    },

    /* user */
    {
      path: `/${ROUTER_NAME.USER}`,
      name: ROUTER_NAME.USER,
      component: () => import('@/views/UserView.vue')
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
    },
    {
      path: `/${ROUTER_NAME.USER_TRAINING_DETAIL}`,
      name: ROUTER_NAME.USER_TRAINING_DETAIL,
      component: () => import('@/views/user/TrainingDetailsView.vue')
    },
    {
      path: `/${ROUTER_NAME.USER_SECURITY}`,
      name: ROUTER_NAME.USER_SECURITY,
      component: () => import('@/views/user/SecurityView.vue')
    },

    /* debug */
    {
      path: `/${ROUTER_NAME.DEBUG}`,
      name: ROUTER_NAME.DEBUG,
      component: () => import('@/views/DebugView.vue')
    },
    {
      path: `/${ROUTER_NAME.DEBUG_IMAGES}`,
      name: ROUTER_NAME.DEBUG_IMAGES,
      component: () => import('@/views/debug/ImagesView.vue')
    }
  ]
})

export default router
export { ROUTER_NAME, ROUTER_TAB_FREE, ROUTER_TAB_DARK, ROUTER_TAB_PLACEHOLDER }
