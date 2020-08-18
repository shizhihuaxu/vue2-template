import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    getStore,
} from '@/scripts/utils'

// 解决路由已在当前页，重复点击一个路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}

// 路由懒加载
const Home = () => import('@/views/Home')
const About = () => import('@/views/About')

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
}, {
    path: '/about',
    name: 'about',
    // meta: {
    //   // 需要验证 token
    //   requiresAuth: true,
    // },
    component: About,
}]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

// 路由鉴权 监听用户是否登录，未登录跳转至登录页
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!getStore('token')) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
