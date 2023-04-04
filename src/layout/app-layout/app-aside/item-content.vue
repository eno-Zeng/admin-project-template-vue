<template>
  <i v-if="route.meta?.icon" class="iconfont" :class="route.meta.icon"></i>
  <span>{{ route.meta?.title }}</span>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 8px;
}
</style>
