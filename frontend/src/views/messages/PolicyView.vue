<template>
  <PageHeader :title="$t('zheng-fa-xiao-zhu-shou')"></PageHeader>
  <ElScrollbar>
    <ElSpace fill class="policy-view">
      <div class="latest" @click="clickPolicy(usePolicyStore().latestPolicy.id)">
        <ElImage class="image" fit="cover" :src="usePolicyStore().latestPolicy.cover.src" />
        <div class="details">
          <ElRow>
            <ElText class="title" size="large">
              {{ `《${usePolicyStore().latestPolicy.content.title}》` }}
            </ElText>
          </ElRow>

          <ElRow>
            <ElText class="content" truncated size="small">
              {{ usePolicyStore().latestPolicy.content.content }}
            </ElText>
          </ElRow>
        </div>
      </div>
    </ElSpace>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import usePolicyStore from '@/stores/policy'
import { ElImage, ElMessage, ElSpace } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

if (!usePolicyStore().latestPolicy.id) {
  usePolicyStore()
    .getLatestPolicy()
    .then(() => {
      ElMessage.success({
        message: '获取最新政策成功',
        offset: 300,
        showClose: false
      })
    })
}

function clickPolicy(id: string | number) {
  router.push({
    path: `/${ROUTER_NAME.MESSAGES_POLICY_DETAIL}`,
    query: {
      id: id
    }
  })
}
</script>

<style scoped lang="scss">
.policy-view {
  width: 100%;
  padding: 32px 16px;

  .latest {
    height: 277px;
    position: relative;
    overflow: hidden;

    border-radius: 25px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    .image {
      width: 100%;
      height: 100%;
    }

    .details {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 101px;
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 19px;

      background: var(--overlay-color-lighter, rgba(0, 0, 0, 0.5));

      .el-row {
        width: 100%;
        justify-content: flex-end;
      }

      .title,
      .content {
        color: #fff;
      }

      &::after {
        content: '';

        position: absolute;
        bottom: 101px;
        left: 0;
        width: 100%;
        height: 30px;
        flex-shrink: 0;

        background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
      }
    }
  }
}
</style>
