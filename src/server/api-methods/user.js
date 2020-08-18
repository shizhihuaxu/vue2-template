import $axios from '@/server/axios'
import API from '@/server/api-constants'

// ----------------------------   登录登出 -------------------------
/**
 * @method login
 * @desc 用户登录 [POST]
 * @param {Object} data 用户名与密码
 * @returns {Promise} 响应结果
 */
const login = data => {
    return $axios({
        url: API.LOGIN,
        method: 'POST',
        data,
    })
}

/**
 * @method logout
 * @desc 登出用户
 * @returns {Promise} 响应结果
 */
const logout = () => {
    return $axios({
        url: API.LOGOUT,
        method: 'GET',
    })
}

export default {
    // 登录登出
    login,
    logout,
}
