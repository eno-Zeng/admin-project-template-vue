export default [
  {
    path: 'module-1',
    name: 'Module1',
    redirect: 'module-1/page-1',
    meta: {
      title: 'Module 1',
      icon: 'icon-youhui',
    },
    children: [
      {
        path: 'page-1',
        name: 'Module1Page1',
        component: () => import('@/views/module-1/pages/page-1/index.vue'),
        meta: {
          title: 'Page 1',
          icon: 'icon-youhui',
        },
      },
      {
        path: 'page-2',
        name: 'Module1Page2',
        component: () => import('@/views/module-1/pages/page-2/index.vue'),
        meta: {
          title: 'Page 2',
        },
      },
    ],
  },
];
