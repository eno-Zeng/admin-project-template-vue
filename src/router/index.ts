import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/home/router';
import Module1 from '@/views/module-1/router';

export const routes: Array<RouteRecordRaw> = [...Home, ...Module1];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: () => import('@/layout/app-layout/app-layout.vue'),
      children: routes,
    },
  ],
});

export default router;
