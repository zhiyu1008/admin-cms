const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  nav: state => state.user.nav,
  menus: state => state.user.menus,
  haveUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  tagsview: state => state.tagsview.tagsView
}
export default getters
