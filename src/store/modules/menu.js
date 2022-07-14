export default {
  namespaced: true,
  state: {
    collapse: false
  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.collapse = !state.collapse
    }
  },
  actions: {
    setCollapse: ({
      commit
    }) => {
      commit('SET_COLLAPSE')
    }
  }
}
