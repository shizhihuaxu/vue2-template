import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import './iview'
import './styles/utilities.scss'
import './styles/reset.scss'
import commonMixins from './scripts/mixins/common-mixins'
import * as filters from './scripts/filters'
import globalComponents from './components'

Vue.config.productionTip = false

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.use(api)
// 将组件注册为全局组件
Vue.use(globalComponents)
// 全局混入
Vue.mixin(commonMixins)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
