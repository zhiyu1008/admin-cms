export default {
  path: '/sys',
  name: 'sys',
  meta: {
    title: '系统管理',
    icon: 'el-icon-s-grid'
  },
  component: () => import('@/layout'),
  redirect: '/sys/users',
  children: [{
    path: 'roles',
    name: 'roles',
    component: () => import('@/views/role'),
    meta: {
      title: '角色管理',
      icon: 'el-icon-user-solid'
    }
  }]
}
