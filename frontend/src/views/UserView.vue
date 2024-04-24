<script setup lang="ts">
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

      <ElText size="large">我的资料</ElText>

      <div>
        <ElIcon :size="26">
          <EpSetting />
        </ElIcon>
      </div>
    </ElRow>

    <!-- profile -->
    <ElRow justify="space-evenly" class="user-view--profile">
      <ElSpace size="default">
        <ElRow>
          <ElAvatar :size="76">{{ useUserStore().name }}</ElAvatar>
        </ElRow>
        <ElSpace alignment="flex-start">
          <ElCol>
            <ElCol>
              <ElText size="large">
                {{ useUserStore().name }}
              </ElText>
            </ElCol>
            <ElCol>
              <ElText size="small" type="info">
                {{ `UID: ${useUserStore().uid || 'null'}` }}
              </ElText>
            </ElCol>
          </ElCol>

          <ElCol>
            <ElTag>已认证</ElTag>
            <ElTag>其他</ElTag>
          </ElCol>
        </ElSpace>
      </ElSpace>
      <ElSpace>
        <ElIcon class="arrow-right">
          <EpArrowRight />
        </ElIcon>
      </ElSpace>
    </ElRow>

    <ElRow justify="center">
      <ElSpace size="large" class="user-view--next3">
        <ElRow>
          <ElCol>
            <ElRow justify="center">
              <ElIcon :size="28" color="#409EFF">
                <EpDocumentCopy />
              </ElIcon>
            </ElRow>
          </ElCol>
          <ElCol>
            <ElRow justify="center">
              <ElText size="small">政策法规</ElText>
            </ElRow>
          </ElCol>
        </ElRow>
        <ElRow>
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
              <ElText size="small">安全生产</ElText>
            </ElRow>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <ElRow justify="center">
              <ElIcon :size="28" color="#409EFF">
                <EpNotebook />
              </ElIcon>
            </ElRow>
          </ElCol>
          <ElCol>
            <ElRow justify="center">
              <ElText size="small">培训</ElText>
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
      <ElRow justify="space-between" align="middle">
        <ElText size="large">安全中心</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
      <ElRow justify="space-between" align="middle">
        <ElText size="large">安全中心</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
      <ElRow justify="space-between" align="middle">
        <ElText size="large">在线联系</ElText>
        <ElIcon>
          <EpArrowRight />
        </ElIcon>
      </ElRow>
    </ElSpace>

    <ElRow justify="space-between" align="middle" class="user-view--dangrous">
      <ElText type="danger" size="large">退出登录</ElText>
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
