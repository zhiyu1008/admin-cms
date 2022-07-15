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
    path: 'menus',
    name: 'menus',
    component: () => import('@/views/menu'),
    meta: {
      title: '菜单管理',
      icon: 'el-icon-menu'
    }
  }]
}
