import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    group: 'Admin', // 用户组别
}

export default new Vuex.Store({
    state,
    mutations,
})
