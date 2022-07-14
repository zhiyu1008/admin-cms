import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import tagsview from './modules/tagsview'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    tagsview,
    menu
  }
})
