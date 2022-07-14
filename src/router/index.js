import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    redirect: '/index',
    name: 'layout',
    component: () => import('../layout'),
    children: [{
      path: '/index',
      name: 'sys:index',
      meta: {
        title: '控制台',
        icon: 'el-icon-s-home'
      },
      component: () => import('../views/index')
    }]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-page/404')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/error-page/401')
  },
  {
    path: '/sys',
    name: 'sys',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'personnel'
    },
    children: [{
        path: '/sys/users',
        component: () => import('../views/user'),
        name: 'sys:user:list',
        meta: {
          title: '用户管理',
          icon: 'article'
        }
      },
      {
        path: '/sys/roles',
        component: () => import('../views/role'),
        name: 'sys:role:list',
        meta: {
          title: '角色管理',
          icon: 'article'
        }
      },
      {
        path: '/sys/menus',
        component: () => import('../views/menu'),
        name: 'sys:menu:list',
        meta: {
          title: '菜单管理',
          icon: 'article'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
