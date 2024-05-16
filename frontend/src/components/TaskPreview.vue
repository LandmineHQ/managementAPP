<template>
  <ElDialog align-center v-model:model-value="dialogVisible" class="task-preview">
    <div v-for="(item, index) in task" :key="index">
      <div class="task-card">
        <ElRow align="bottom" class="header">
          <ElAvatar v-if="item.profile" :size="46" :src="item.profile.avatar.src" />
          <ElAvatar v-else :size="46">
            <ElIcon v-if="item.id === -1" :size="32">
              <EpUser />
            </ElIcon>
            <ElText v-else>{{ item.id }}</ElText>
          </ElAvatar>
          <ElText v-if="item.profile" style="align-self: auto">{{ item.profile.nickname }}</ElText>
        </ElRow>
        <ElDivider style="margin: 0" />
        <ElRow class="main">
          <ElText>
            {{ item.content }}
          </ElText>
        </ElRow>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const task = defineModel('task', {
  type: Array as PropType<Array<any>>,
  default: []
})
const dialogVisible = defineModel('dialogVisible', {
  type: Boolean,
  default: false
})
</script>

<style lang="scss">
.task-preview {
  /* height: 100%; */
  width: 100%;
  padding: 16px;

  .el-dialog__body {
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .task-card {
    display: flex;
    height: fit-content;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    border-radius: 12px;
    border: 1px solid var(--Color-Border-border-color-light, #e4e7ed);
    background: var(--bg-color-overlay, #fff);

    /* box-shadow */
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px 0px rgba(0, 0, 0, 0.08);

    .header {
      width: 100%;
      height: 78px;
      padding: 16px;
      gap: 10px;
      justify-content: flex-start;

      .el-avatar {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }

      .append {
        height: 100%;
        width: 0;
        flex: auto;

        display: flex;
        justify-content: flex-end;
      }
    }

    .main {
      width: 100%;

      .el-text {
        padding: 16px;
        white-space: pre-wrap;

        width: 100%;
      }
    }
  }
}
</style>
