/**
 *  @author shizhihuaxu 2019/12/11
 *  @desc 将 api 接口注册为 vue 的插件
 */

import api from './api'

const install = (Vue) => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return api
      },
    },
  })
}

export default install
