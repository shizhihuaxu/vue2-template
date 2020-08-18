import Vue from 'vue'
import App from './App.vue'

// 字体图标
import './assets/iconfonts/iconfont.scss'

// 样式
import './plugins/view-ui'
import './styles/reset.scss'
import './styles/utilities.scss'

// 全局
import './components/global-components'
import router from './router'
import store from './store'
import server from './server'
import globalMixins from './scripts/mixins/global-mixins'
import * as filters from './scripts/filters'

Vue.config.productionTip = false

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

Vue.use(server)
// 全局混入
Vue.mixin(globalMixins)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
