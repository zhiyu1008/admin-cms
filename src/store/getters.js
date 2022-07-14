const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  menus: state => state.user.menus,
  haveUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  hasPermission: state => {
    return (state.user.permission && state.user.menus) || ''
  },
  isCollapse: state => state.menu.collapse,
  tagsview: state => state.tagsview.tagsView
}
export default getters
