<template>
  <PageHeader :title="policy?.content.title"></PageHeader>
  <ElScrollbar fill class="policy-detail-view">
    <ElImage :src="policy?.background.src" fit="cover" class="background" />
    <ElSpace fill :size="72">
      <div class="details">
        <ElRow class="title">
          <ElText>
            {{ `《${policy?.content.title}》` }}
          </ElText>
        </ElRow>
        <ElRow class="content">
          <ElText>
            {{ policy?.content.content }}
          </ElText>
        </ElRow>
      </div>
      <div class="analysis">
        <ElRow class="title">
          <ElText> {{ $t('zheng-ce-jie-du-yu-fen-xi') }} </ElText>
        </ElRow>
        <ElRow class="content">
          <ElText>
            {{ policy?.content.analysis }}
          </ElText>
        </ElRow>
      </div>
    </ElSpace>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ROUTER_NAME } from '@/router'
import usePolicyStore from '@/stores/policy'
import { ElImage, ElSpace } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
type Policy = ReturnType<typeof usePolicyStore>['latestPolicy']

const policy = ref<Policy>()
const id = computed(() => {
  let res: string
  if (!route.query.id) {
    res = '1'
  }
  res = route.query.id as string

  return res
})

async function freshData() {
  if (id.value === usePolicyStore().latestPolicy.id.toString(10)) {
    policy.value = usePolicyStore().latestPolicy
  } else {
    policy.value = await usePolicyStore().getPolicyById(id.value)
  }
}

watch(
  () => route.path,
  () => {
    if (route.path.endsWith(ROUTER_NAME.MESSAGES_POLICY_DETAIL)) {
      freshData()
    }
  }
)

watch(id, () => {
  freshData()
})

onMounted(() => {
  freshData()
})
</script>

<style scoped lang="scss">
.policy-detail-view {
  padding: 32px 24px;
  position: relative;

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(3px) grayscale(50%) opacity(10%);
  }

  .title {
    height: 63px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding-left: 16px;
    padding-bottom: 12px;

    .el-text {
      color: var(--text-color-primary, var(--Color-Text-text-color-primary, #303133));
      text-align: center;
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 111.111% */
      align-self: flex-end;
    }
  }

  .content {
    padding: 12px 8px 32px;

    .el-text {
      white-space: pre-wrap;
      text-indent: 2rem;
    }
  }

  .details,
  .analysis {
    z-index: 0;
    overflow: hidden;

    border-radius: 15px;
    background: var(--Color-Background-bg-color-page, #f2f3f5);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .details {
    & .title {
      background: #f56c6c;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }

  .analysis {
    & .title {
      background: #95d475;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
