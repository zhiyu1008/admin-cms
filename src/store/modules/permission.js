import {
  publicRoutes,
  privateRoutes
} from '../../router'
export default {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
      console.log('newRoutes==>', state.routes)
    }
  },
  actions: {
    filterRoutes({
      commit
    }, menus) {
      const routes = []
      menus.forEach(name => {
        const data = privateRoutes.filter(item => item.name === name)
        routes.push(...data)
      })
      // 重定向到404页面
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('setRoutes', routes)
      return routes
    }
  }
}
