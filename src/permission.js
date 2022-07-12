import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      next()
      // const userInfo = store.getters.userInfo
      // const navData = store.getters.nav
      // if (userInfo && navData) {
      //   next()
      // } else {
      //   console.log('000')
      //   await store.dispatch('user/getUserInfo')
      //   await store.dispatch('user/getNav')
      // const response = await store.dispatch('user/getUserInfo')
      // const { authoritys } = await store.dispatch('user/getNav')

      // if (response && authoritys) {
      //   const routes = await store.dispatch('permission/filterRoutes', authoritys)
      //   if (routes) {
      //     routes.forEach(item => {
      //       router.addRoute(item)
      //     })
      //     return next(to.path)
      //   }
      // } else {
      //   next('/login')
      // }
      // }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
