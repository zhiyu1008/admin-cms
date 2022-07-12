import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('../layout'),
    children: [{
      path: '/home',
      name: 'sys:home',
      meta: {
        title: '控制台',
        icon: 'el-icon-s-home'
      },
      component: () => import('../views/home')
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
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'personnel'
    },
    children: [{
        path: '/system/user',
        component: () => import('../views/user'),
        name: 'sys:user:list',
        meta: {
          title: '用户管理',
          icon: 'article'
        }
      },
      {
        path: '/system/role',
        component: () => import('../views/role'),
        name: 'sys:role:list',
        meta: {
          title: '角色管理',
          icon: 'article'
        }
      },
      {
        path: '/system/menu',
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

export default router
