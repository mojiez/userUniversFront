export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: '登录', path: '/user/login', component: './user/Login' },
          { name: '注册', path: '/user/register', component: './user/Register' },
        ],
      },
      // { name: '登录', path: '/user/login', component: './user/Login' },
      // { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // canAdmin限制了管理员才能访问 access来自access.ts文件
    access: 'canAdmin',

    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      {
        path: '/admin/usermanage',
        name: '用户管理',
        icon: 'smile',
        component: './admin/UserManage',
      },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  // 表示访问根路径时会自动重定向到welcome页面
  { component: './404' },
  // 访问未知路径时会自动重定向到404页面
];
