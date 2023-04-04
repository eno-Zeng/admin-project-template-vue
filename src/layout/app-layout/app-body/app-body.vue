<template>
  <el-scrollbar class="app-body"><router-view></router-view></el-scrollbar>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/styles/app-layout-var.scss';

.app-body {
  width: $app-body-width;
  height: $app-body-height;
}
</style>
