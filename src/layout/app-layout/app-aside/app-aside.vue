<template>
  <el-scrollbar class="app-aside">
    <el-menu :default-active="route.name">
      <aside-item v-for="route of routes" :key="route.name" :route="route" />
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { routes } from '@/router';
import AsideItem from './aside-item.vue';

const route = useRoute();
</script>

<style lang="scss" scoped>
@import '@/styles/app-layout-var.scss';

.app-aside {
  width: $app-aside-width;
  border-right: 1px solid var(--el-menu-border-color);
  height: 100%;

  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
