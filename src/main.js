import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'
// 引入公共样式
import './styles/reset.scss'
// 引入elemen-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入页面鉴权
import './permission'

import Fragment from 'vue-fragment'

Vue.use(Fragment.Plugin)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
