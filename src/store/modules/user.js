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
    userInfo: '',
    permissionList: '',
    menus: ''
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
    setPermission(state, permission) {
      state.permission = permission
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
      const {
        authoritys,
        menus
      } = await User.getNav()
      if (authoritys.length > 0 && menus.length > 0) {
        commit('setPermission', authoritys)
        commit('setMenus', menus)
        return {
          authoritys,
          menus
        }
      } else {
        return false
      }
    },
    async logout({
      commit
    }) {
      await User.logout()
      commit('setToken', '')
      commit('setUserInfo', '')
      commit('setMenu', '')
      commit('setPermission', '')
      removeItem('token')
      return true
    }
  }
}
