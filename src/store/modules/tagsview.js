import {
  setItem,
  getItem
} from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsview') || []
  },
  mutations: {
    setTagsView(state, tagsView) {
      const isSame = state.tagsView.find(item => item.path === tagsView.path)
      if (!isSame) {
        state.tagsView.push(tagsView)
        setItem('tagsview', state.tagsView)
      }
    },
    removeTagsView(state, index) {
      state.tagsView.splice(index, 1)
      setItem('tagsview', state.tagsView)
    }
  },
  actions: {

  }
}
