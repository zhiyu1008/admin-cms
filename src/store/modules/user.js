import User from '@/api/user'
import {
  setItem,
  getItem,
  removeItem
} from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    nav: {},
    menus: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenus(state, menus) {
      state.menus = menus
    },
    setNav(state, nav) {
      state.nav = nav
    }
  },
  actions: {
    // 调用登录接口
    async login({
      commit
    }, loginForm) {
      const token = await User.login(loginForm)
      commit('setToken', token)
      return token
    },
    async getUserInfo({
      commit
    }) {
      const userInfo = await User.getUserInfo()
      commit('setUserInfo', userInfo)
      return userInfo
    },
    async getNav({
      commit
    }) {
      const res = await User.getNav()
      commit('setNav', res)
      commit('setMenus', res.menus)
      return res
    },
    async logout({
      commit
    }) {
      await User.logout()
      commit('setToken', '')
      commit('setUserInfo', {})
      commit('setNav', {})
      removeItem('token')
    }
  }
}
