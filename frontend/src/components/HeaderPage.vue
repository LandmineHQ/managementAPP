<template>
  <div aria-label="A complete example of page header">
    <ElPageHeader @back="onBack">
      <template #content>
        <ElText type="info" size="large">{{ props.title }}</ElText>
      </template>
      <template #extra>
        <div class="extra">
          <ElAvatar v-if="props.showAvatar" />
        </div>
      </template>
    </ElPageHeader>
  </div>
</template>

<script setup lang="ts">
import { ElAvatar, ElPageHeader, ElText } from 'element-plus'
import { useRouter } from 'vue-router'

const props = defineProps({
  showAvatar: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'title~'
  }
})

const router = useRouter() // Use useRouter to get the router instance

const onBack = () => {
  router.back() // Call the back method to navigate to the previous page
}
</script>

<style lang="scss" scoped>
.extra {
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
