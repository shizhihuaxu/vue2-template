import $axios from '@/server/axios'
import API from '@/server/api-constants'

// --------------  用户日志  ------------------------
/**
 * @method getUserLogList
 * @desc 获取用户日志列表
 * @param {Object} data 筛选条件
 * @returns {Promise} 响应结果
 */
const getUserLogList = data => {
    return $axios({
        url: API.LOG,
        method: 'GET',
        data,
    })
}

/**
 * @method getUserLogDetail
 * @desc 获取用户日志详情
 * @param {Object} id 日志 id
 * @returns {Promise} 响应结果
 */
const getUserLogDetail = id => {
    return $axios({
        url: `${API.LOG}${id}/`,
        method: 'GET',
    })
}

export default {
    getUserLogList,
    getUserLogDetail,
}
