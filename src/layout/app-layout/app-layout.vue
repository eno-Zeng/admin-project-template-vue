<template>
  <div class="app-layout">
    <header class="header">
      <app-header></app-header>
    </header>
    <main class="main">
      <app-aside></app-aside>
      <app-body></app-body>
    </main>
  </div>
</template>
<script lang="ts" setup>
import AppHeader from './app-header/app-header.vue';
import AppAside from './app-aside/app-aside.vue';
import AppBody from './app-body/app-body.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/app-layout-var.scss';
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .header {
    height: $app-header-height;
  }
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
</style>
