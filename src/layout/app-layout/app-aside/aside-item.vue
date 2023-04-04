<template>
  <el-sub-menu v-if="hasChildren()" :index="route.name">
    <template #title>
      <item-content :route="route" />
    </template>
    <aside-item v-for="child of route.children" :key="child.name" :route="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="route.name" @click="jump2Page(route)">
    <item-content :route="route" />
  </el-menu-item>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import ItemContent from './item-content.vue';

const props = defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
});
const hasChildren = () => {
  const {
    route: { children },
  } = props;
  return children && Array.isArray(children) && children.length > 0;
};

const router = useRouter();
const jump2Page = (route: RouteRecordRaw) => {
  router.push(route);
};
</script>

<style lang="scss" scoped></style>
