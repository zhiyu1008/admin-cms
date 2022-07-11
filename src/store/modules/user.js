import User from '@/api/user'
import {
  setItem,
  getItem
} from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    nav: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
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
      const nav = await User.getNav()
      commit('setNav', nav)
      return nav
    }
  }
}
