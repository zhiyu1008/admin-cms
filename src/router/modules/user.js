export default {
  path: '/sys',
  name: 'sys',
  component: () => import('@/layout'),
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-grid'
  },
  redirect: '/sys/users',
  children: [{
    path: 'users',
    name: 'users',
    component: () => import('@/views/user'),
    meta: {
      title: '用户管理',
      icon: 'el-icon-user'
    }
  }]
}
