/**
 *  @author shixhihuaxu 2019/12/11
 *  @desc 生成 API 接口
 */
import $axios from './axios'
import STATIC from '../scripts/constants'

/**
 * @method login
 * @desc 用户登录
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const login = data => $axios({
  url: STATIC.API.LOGIN,
  method: 'POST',
  data,
})

/**
 * @method logout
 * @desc 退出登录
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const logout = () => $axios({
  url: STATIC.API.LOGOUT,
  method: 'POST',
})

export default {
  login,
  logout,
}
