export default [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home/pages/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'icon-home-fill',
    },
  },
];
