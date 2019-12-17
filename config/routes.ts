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
            name: '居住管理',
            icon: 'home',
            path: '/living',
            routes: [
              {
                name: '居住',
                icon: 'info-circle',
                path: '/living/livings',
                component: './living/livings',
              },
              {
                name: '类型',
                icon: 'info-circle',
                path: '/living/categories',
                component: './living/categories',
              },
              {
                name: '房间',
                icon: 'info-circle',
                path: '/living/rooms',
                component: './living/rooms',
              },
              {
                name: '人员',
                icon: 'info-circle',
                path: '/living/people',
                component: './living/people',
              },
              {
                name: '公司',
                icon: 'info-circle',
                path: '/living/companies',
                component: './living/companies',
              },
              {
                name: '入住',
                path: '/living/livings/create/:roomId',
                hideInMenu: true,
                component: './living/livingsCreate',
              },
            ],
          },
          {
            name: '费用管理',
            icon: 'pay-circle',
            path: '/bill',
            routes: [
              {
                name: '明细',
                icon: 'info-circle',
                path: '/bill/bills',
                component: './bill/bills',
              },
            ],
          },
          {
            name: '分步表单',
            icon: 'smile',
            path: '/formstepform',
            component: './FormStepForm',
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
