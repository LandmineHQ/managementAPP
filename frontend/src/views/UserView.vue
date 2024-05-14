<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'
import {
  ElRow,
  ElCol,
  ElIcon,
  ElText,
  ElAvatar,
  ElTag,
  ElSpace,
  ElBadge,
  ElDivider
} from 'element-plus'

import { h } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const locale = useI18n().locale

function toggleLanguage() {
  locale.value = locale.value === 'en_us' ? 'zh_cn' : 'en_us'
}

function clickProfile() {
  if (useAuthStore().isLogin === false) {
    router.push(`/${ROUTER_NAME.USER_LOGIN}`)
    return
  }
}

function clickLogOut() {
  useAuthStore().removeToken()
  window.location.reload()
}

function clickMoreProfile() {
  router.push(`/${ROUTER_NAME.USER}/profile`)
}

function clickTraining() {
  router.push(`/${ROUTER_NAME.USER_TRAINING}`)
}

function clickSecurity() {
  router.push(`/${ROUTER_NAME.USER_SECURITY}`)
}

function clickPolicy() {
  router.push({
    path: `/${ROUTER_NAME.MESSAGES_POLICY}`
  })
}
</script>

<template>
  <ElSpace fill size="small" class="user-view">
    <!-- header -->
    <ElRow justify="space-between" class="user-view--header">
      <div>
        <ElIcon :size="26">
          <EpSunny />
        </ElIcon>
      </div>

      <ElText size="large">{{ $t('wo-de-zi-liao') }}</ElText>

      <div @click="toggleLanguage">
        <ElAvatar :size="26">
          {{ $t('launguage') }}
        </ElAvatar>
      </div>
    </ElRow>

    <!-- profile -->
    <ElRow justify="space-between" class="user-view--profile" @click="clickProfile">
      <ElSpace size="default">
        <ElRow>
          <ElAvatar
            v-if="useAuthStore().isLogin"
            :size="76"
            :src="useUserStore().avatar"
            @click="router.push(`/${ROUTER_NAME.USER_PROFILE_EDIT}?editAttribute=avatar`)"
            >{{ useUserStore().name }}</ElAvatar
          >
          <ElAvatar v-else :size="76">
            <ElIcon :size="32" color="#fff">
              <EpUserFilled />
            </ElIcon>
          </ElAvatar>
        </ElRow>
        <ElSpace alignment="flex-start">
          <ElCol>
            <ElCol>
              <ElText size="large">
                {{ useUserStore().nickname || useUserStore().name || $t('wei-deng-lu') }}
              </ElText>
            </ElCol>
            <ElCol v-if="useAuthStore().isLogin">
              <ElText size="small" type="info">
                {{ `UID: ${useUserStore().uid || 'null'}` }}
              </ElText>
            </ElCol>
          </ElCol>

          <ElCol v-if="useAuthStore().isLogin">
            <ElTag v-if="useUserStore().identityBinding">{{ $t('yi-ren-zheng') }}</ElTag>
            <ElTag v-else type="danger" effect="dark">{{ $t('wei-ren-zheng') }}</ElTag>
          </ElCol>
        </ElSpace>
      </ElSpace>
      <ElSpace>
        <ElIcon class="arrow-right" v-if="useAuthStore().isLogin" @click="clickMoreProfile">
          <EpArrowRight />
        </ElIcon>
      </ElSpace>
    </ElRow>

    <ElRow justify="center">
      <ElSpace size="large" class="user-view--next3">
        <ElRow @click="clickPolicy">
          <ElCol>
            <ElRow justify="center">
              <ElIcon :size="28" color="#409EFF">
                <EpDocumentCopy />
              </ElIcon>
            </ElRow>
          </ElCol>
          <ElCol>
            <ElRow justify="center">
              <ElText size="small">{{ $t('zheng-ce-fa-gui') }}</ElText>
            </ElRow>
          </ElCol>
        </ElRow>
        <ElRow v-if="useAuthStore().isLogin" @click="clickSecurity">
          <ElCol>
            <ElRow justify="center">
              <ElBadge value="1" type="danger">
                <ElBadge value="2" type="warning" :offset="[12, 0]">
                  <ElIcon :size="28" color="#409EFF">
                    <EpDishDot />
                  </ElIcon>
                </ElBadge>
              </ElBadge>
            </ElRow>
          </ElCol>
          <ElCol>
            <ElRow justify="center">
              <ElText size="small">{{ $t('an-quan-sheng-chan') }}</ElText>
            </ElRow>
          </ElCol>
        </ElRow>
        <ElRow
          v-if="useAuthStore().isLogin && useUserStore().identityBinding"
          @click="clickTraining"
        >
          <ElCol>
            <ElRow justify="center">
              <ElIcon :size="28" color="#409EFF">
                <EpNotebook />
              </ElIcon>
            </ElRow>
          </ElCol>
          <ElCol>
            <ElRow justify="center">
              <ElText size="small">{{ $t('pei-xun') }}</ElText>
            </ElRow>
          </ElCol>
        </ElRow>
      </ElSpace>
    </ElRow>

    <ElSpace
      fill
      :size="0"
      :spacer="
        h(ElDivider, {
          style: {
            margin: '0'
          }
        })
      "
      class="user-view--next4"
    >
      <ElRow
        justify="space-between"
        align="middle"
        v-if="useAuthStore().isLogin"
        @click="clickSecurity"
      >
        <ElText size="large">{{ $t('an-quan-zhong-xin') }}</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
      <ElRow
        justify="space-between"
        align="middle"
        @click="router.push(`/${ROUTER_NAME.USER_HELP}`)"
      >
        <ElText size="large">{{ $t('bang-zhu-zhong-xin') }}</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
      <ElRow
        justify="space-between"
        align="middle"
        @click="
          router.push({
            path: `/${ROUTER_NAME.MESSAGES_CHAT}`,
            query: {
              id: 5,
              type: 'private'
            }
          })
        "
      >
        <ElText size="large">{{ $t('zai-xian-lian-xi') }}</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
    </ElSpace>

    <ElRow
      justify="space-between"
      align="middle"
      class="user-view--dangrous"
      v-if="useAuthStore().isLogin"
      @click="clickLogOut"
    >
      <ElText type="danger" size="large">{{ $t('tui-chu-deng-lu') }}</ElText>
      <ElIcon>
        <EpArrowRight />
      </ElIcon>
    </ElRow>
  </ElSpace>
</template>

<style lang="scss" scoped>
.user-view {
  display: flex;
  flex-direction: column;

  > * > * {
    background: var(--bg-color, #fff);
  }
}

.user-view--header {
  padding: 0 24px 16px;
}

.user-view--profile {
  height: 147px;
  padding: var(--Size-common-component-size-default, 32px) 32px;

  .arrow-right {
    width: var(--Size-common-component-size-default, 32px);
    height: var(--Size-common-component-size-default, 32px);
    fill: var(--Color-Fill-fill-color-light, #f5f7fa);
    border-radius: 50%;
    background-color: var(--Color-Fill-fill-color-light, #f5f7fa);
  }
}

.user-view--next3 {
  padding: var(--Size-common-component-size-default, 32px) 0;

  > * > * {
    width: 96px;
  }
}

.user-view--next4 {
  padding: 0px var(--Size-common-component-size-default, 32px);

  > * > .el-row {
    height: 62px;
  }
}

.user-view--dangrous {
  padding: 0px var(--Size-common-component-size-default, 32px);
  height: 62px;
}
</style>
