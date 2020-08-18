/**
 * @author shizhihuaxu 2020/07/03
 * @description 对 api-methods 文件夹下的所有请求方法进行整合并注册到 Vue
 */

let apis = {}

// 扫描模块
const apiContext = require.context('./api-methods', true, /(.js)$/)

apiContext.keys().forEach(apiPath => {
    const apiModule = apiContext(apiPath)
    // 兼容 import export 和 require module.export 两种规范
    apis = {
        ...apis,
        ...(apiModule.default || apiModule),
    }
})

// 提供注册到全局的方法
const install = Vue => {
    if (install.installed) return
    install.installed = true

    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return apis
            },
        },
    })
}

export default install
