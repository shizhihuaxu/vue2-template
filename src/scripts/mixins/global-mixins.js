import {
    getType,
} from '@/scripts/utils'

const globalMixins = {
    data () {
        return {
            isSpinShow: false, // 是否展示 loading
        }
    },
    methods: {
    /**
     * 去除请求参数对象前后空格
     * @param {object} params 请求参数对象
     */
        $_globalMixins_trimParams (params) {
            if (params && getType(params) === 'object') {
                // 避免直接修改源对象，由于双向数据绑定会使输入框内容显示为去空格后内容
                const obj = JSON.parse(JSON.stringify(params))

                Object.keys(obj).map(key => {
                    // 如果为字符串直接 trim
                    if (getType(obj[key]) === 'string') {
                        obj[key] = obj[key].trim()
                    }
                    // 如果为 number，转换为 string trim 后再转换为 number
                    if (getType(obj[key]) === 'number') {
                        obj[key] = String(obj[key]).trim()
                        obj[key] = Number(obj[key])
                    }
                })

                return obj
            }

            return params
        },
    },
}

export default globalMixins
