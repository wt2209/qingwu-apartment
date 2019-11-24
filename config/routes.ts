export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            path: '/account',
            name: '个人账户',
            icon: 'smile',
            routes: [
              {
                name: '个人设置',
                icon: 'smile',
                path: '/account/settings',
                component: './account/settings',
              },
              {
                name: '个人中心',
                icon: 'smile',
                path: '/account/center',
                component: './account/center',
              },
            ],
          },
          {
            name: 'table-list',
            icon: 'smile',
            path: '/list/table-list',
            component: './list/table-list',
          },
          {
            name: '居住',
            icon: 'smile',
            path: '/livings',
            component: './livings',
          },
          {
            name: '房间类型',
            icon: 'smile',
            path: '/categories',
            component: './categories',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
