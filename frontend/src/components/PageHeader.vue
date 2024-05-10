<template>
  <ElSpace fill class="page-header-component">
    <ElPageHeader @back="onBack">
      <template #content>
        <slot name="default">
          <ElText type="info" size="large">{{ props.title || route.path }}</ElText>
        </slot>
      </template>
      <template #extra>
        <div class="extra">
          <ElAvatar v-if="avatar" :src="avatar">
            <ElIcon :size="24">
              <EpUser />
            </ElIcon>
          </ElAvatar>
        </div>
      </template>
    </ElPageHeader>
  </ElSpace>
</template>

<script setup lang="ts">
import { ElAvatar, ElPageHeader, ElSpace, ElText } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter() // Use useRouter to get the router instance
const route = useRoute() // Use useRoute to get the route instance

const props = defineProps({
  avatar: {
    type: String,
    default: ''
  },
  title: {
    type: String
  }
})

const onBack = () => {
  router.back() // Call the back method to navigate to the previous page
}
</script>

<style lang="scss" scoped>
.page-header-component {
  background: var(--bg-color-overlay, #fff);
  width: 100%;
  padding: 12px;

  .extra {
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
