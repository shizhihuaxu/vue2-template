import STATIC from '@/scripts/constants'

// -------------------------------  其它工具方法  ----------------------------
/**
 * @desc 获取变量数据类型
 * @param {any} val
 * @return {string} type
 */
export const getType = val => {
    const type = Object.prototype.toString
        .call(val)
        .slice(8, -1)
        .toLowerCase()

    return type
}

/**
 * @desc 获取文件扩展名
 * @param {string} filename
 * @reuturn {string} extension name
 */
export const getFileExtension = filename => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

//  ------------------------------------  localStorage  -----------------------------------------
/**
 * @desc localStorage 存储 item
 * @param {string} key
 * @param {string} val
 */
export const setStore = (key, val) => {
    // 判断 key 是否存在
    if (!key) throw new Error('key is undefined')

    // 判断 key 的类型
    if (getType(key) !== 'string') throw new Error('key is not string')

    // 将数值转换为 string 类型存储
    val = JSON.stringify(val)
    // 编码保存
    val = window.btoa(val)

    window.localStorage.setItem(key, val)
}

/**
 * @desc 获取 localStorage item
 * @param {string} key
 * @return {string | null} val
 */
export const getStore = key => {
    if (!key) throw new Error('key is undefined')
    if (getType(key) !== 'string') throw new Error('key is not string')

    let val = window.localStorage.getItem(key)

    if (val) {
        // 解码
        val = window.atob(val)
        // 将 string 类型转化为初始类型
        val = JSON.parse(val)

        return val
    } else {
        return ''
    }
}

/**
 * @desc 移除 localStorage 的某项
 * @param {string} key
 */
export const removeStore = key => {
    if (!key) throw new Error('key is undefined')
    if (getType(key) !== 'string') throw new Error('key is not string')

    window.localStorage.removeItem(key)
}

/**
 * @desc 清除所有 localStorage
 */
export const clearStore = () => {
    window.localStorage.clear()
}

//  -----------------------------------  校验  -----------------------------------
/**
 * @desc 校验用户名
 * 分表单模式和普通模式，表单模式按顺序传入两个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的用户名
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 * @example
 *  checkUsername(value, callback)  // iview
 *  checkUsername(value)
 */
export const checkUsername = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0001']) :
            !STATIC.REGEXP.USERNAME.test(value) ?
            (tip = STATIC.TIPS['0002']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0001']) :
            !STATIC.REGEXP.USERNAME.test(value) ?
            callback(STATIC.TIPS['0002']) :
            callback()
    }
}

/**
 * @desc 校验密码
 * 分表单模式和普通模式，表单模式按顺序传入两个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的密码
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时候返回回调函数，无回调函数的时候返回校验结果
 * @example
 *  checkPassword(value, callback)  // iview
 *  checkPassword(value)
 */
export const checkPassword = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' //  校验结果提示信息
        let [value] = [...args]

        value = value || ''

        value === '' ?
            (tip = STATIC.TIPS['0003']) :
            !STATIC.REGEXP.PASSWORD.test(value) ?
            (tip = STATIC.TIPS['0004']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        value = value || ''

        value === '' ?
            callback(STATIC.TIPS['0003']) :
            !STATIC.REGEXP.PASSWORD.test(value) ?
            callback(STATIC.TIPS['0004']) :
            callback()
    }
}

/**
 * @desc 校验输入框是否存在非法字符
 * 分表单模式和普通模式，表单模式按顺序传入两个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的值
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 * @example
 *  checkInputValue(value, callback)  // iview
 *  checkInputValue(value)
 */
export const checkInputValue = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0026']) :
            !STATIC.REGEXP.INPUT_FILTER.test(value) ?
            (tip = STATIC.TIPS['0027']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0026']) :
            !STATIC.REGEXP.INPUT_FILTER.test(value) ?
            callback(STATIC.TIPS['0027']) :
            callback()
    }
}

/**
 * @desc 允许输入框为空，校验输入框是否存在非法字符串
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的值
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkInputValueWithNull = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.INPUT_FILTER.test(value) ?
            (tip = STATIC.TIPS['0027']) :
            (tip = '')
        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.INPUT_FILTER.test(value) ?
            callback(STATIC.TIPS['0027']) :
            callback()
    }
}

/**
 * @desc 校验 IP 格式
 * 分表单模式和普通模式，表单模式按顺序传入两个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 IP
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 * @example
 *  checkIP(value, callback)  // iview
 *  checkIP(value)
 */
export const checkIP = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0015']) :
            !STATIC.REGEXP.IP.test(value) ?
            (tip = STATIC.TIPS['0016']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0015']) :
            !STATIC.REGEXP.IP.test(value) ?
            callback(STATIC.TIPS['0016']) :
            callback()
    }
}

/**
 * @desc 校验 IP 格式，允许 ip 为空
 * 分表单模式和普通模式，表单模式按顺序传入两个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 IP
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 * @example
 *  checkIPWithNull(value, callback)  // iview
 *  checkIPWithNull(value)
 */
export const checkIPWithNull = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.IP.test(value) ?
            (tip = STATIC.TIPS['0016']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.IP.test(value) ?
            callback(STATIC.TIPS['0016']) :
            callback()
    }
}

/**
 * @desc 不允许 mac 为空, 校验 mac
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 Mac
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkMac = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0022']) :
            !STATIC.REGEXP.MAC.test(value) ?
            (tip = STATIC.TIPS['0023']) :
            (tip = '')
        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0022']) :
            !STATIC.REGEXP.MAC.test(value) ?
            callback(STATIC.TIPS['0023']) :
            callback()
    }
}

/**
 * @desc 允许 mac 为空, 校验 mac
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 Mac
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkMacWithNull = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.MAC.test(value) ?
            (tip = STATIC.TIPS['0023']) :
            (tip = '')
        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !STATIC.REGEXP.MAC.test(value) ?
            callback(STATIC.TIPS['0023']) :
            callback()
    }
}

/**
 * @desc 校验 port 端口格式
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 port
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkPort = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0024']) :
            !Number(value) ?
            tip = STATIC.TIPS['0025'] :
            !STATIC.REGEXP.PORT.test(value) ?
            tip = STATIC.TIPS['0025'] :
            tip = ''

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        // 表单校验
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0024']) :
            !Number(value) ?
            callback(STATIC.TIPS['0025']) :
            !STATIC.REGEXP.PORT.test(value) ?
            callback(STATIC.TIPS['0025']) :
            callback()
    }
}

/**
 * @desc 校验 port 端口格式，端口可为空
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 port
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkPortWithNull = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验结果提示信息
        let [value] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !Number(value) ?
            (tip = STATIC.TIPS['0025']) :
            value !== '' && !STATIC.REGEXP.PORT.test(value) ?
            (tip = STATIC.TIPS['0025']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = value ? String(value).trim() : ''

        value !== '' && !Number(value) ?
            callback(STATIC.TIPS['0025']) :
            value !== '' && !STATIC.REGEXP.PORT.test(value) ?
            callback(STATIC.TIPS['0025']) :
            callback()
    }
}

/**
 * @desc 校验 mask 子网掩码格式
 * 分表单模式和普通模式，表单模式按顺序传入 2 个值 value、callback，普通模式传入一个值 value
 * @param {String} value 需要校验的 mask
 * @param {Function} callback 回调函数
 * @returns {Function|String} 有回调函数的时执行回调函数，无回调函数的时返回校验结果
 */
export const checkMask = (...args) => {
    if (!args.length) throw new Error('Parameter cannot be empty')

    // 普通校验
    if (args.length === 1) {
        let tip = '' // 校验提示信息
        let [value] = [...args]

        // 去除前后空格
        value = !!value ? String(value).trim() : ''

        value === '' ?
            (tip = STATIC.TIPS['0018']) :
            !STATIC.REGEXP.MASK.test(value) ?
            (tip = STATIC.TIPS['0019']) :
            (tip = '')

        return tip
    }

    // 表单校验
    if (args.length === 2) {
        let [value, callback] = [...args]

        // 去除前后空格
        value = !!value ? String(value).trim() : ''

        value === '' ?
            callback(STATIC.TIPS['0018']) :
            !STATIC.REGEXP.MASK.test(value) ?
            callback(STATIC.TIPS['0019']) :
            callback()
    }
}

//  -----------------------------   时间  ------------------------------------------------
/**
 * @desc 格式化 带时区的 ISO
 *      时间格式为 datetime(yyyy-MM-dd HH:mm:ss) , date(yyyy-MM-dd) ,time(HH:mm:ss)形式
 * @param {String} isoTimeStr iso 格式的时间字符串，中国时区
 * @param {String} format 转换类型，datetime、date、time,datetime default
 * @example
 *  isoTime = '2018-08-22T21:16:01.752076+08:00'
 *
 *  formatLocalISOTime(isoTime)  // 2018-08-22 21:16:01
 *  formatLocalISOTime(isoTime, date)  // 2018-08-22
 *  formatLocalISOTime(isoTime, time)  // 21:16:01
 */
export const formatLocalISOTime = (isoTimeStr, format = 'datetime') => {
    // 如果不存在时间参数，默认为当前时间
    const time = isoTimeStr ? new Date(isoTimeStr) : new Date()
    let formattedTime = '' // 格式化后的时间

    // 以下方式获取的时间均为本地时间
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    switch (format) {
        case 'datetime':
            formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
            break
        case 'date':
            formattedTime = `${year}-${month}-${day}`
            break
        case 'time':
            formattedTime = `${hour}:${minute}:${second}`
            break
        default:
            break
    }

    return formattedTime
}

/**
 * @desc 日期格式化为 iso-8601 带中国时区
 * @param {String} time 日期，不可为仅时间类型(例如 HH:mm:ss)，仅(yyyy-MM-dd) 与 utc 相同
 * @return {Date} iso time with timezone
 * @example
 *  datetime = '2020-02-20 14:54:00'  // 2020-02-20T14:54:00.000000+08:00
    date = '2020-02-20'  // 2020-02-20T08:00:00.000000+08:00
    utc = '05 October 2011 14:48 UTC'  // 2011-10-05T22:48:00.000000+08:00
    gmtLocalTime = 'Wed Oct 05 2011 22:48:00 GMT+0800'  // 2011-10-05T22:48:00.000000+08:00
 */
export const toLocalISOString = time => {
    if (!time) throw new Error('time is undefined')

    const tzOffsetMs = new Date().getTimezoneOffset() * 60000 // 时区偏移值分钟转化为毫秒
    const timeToMs = Date.parse(new Date(time)) // 将给定的时间转换为毫秒

    let zone = Math.abs(new Date().getTimezoneOffset() / 60) // 获取时区

    zone = zone < 10 ? `0${zone}` : zone

    const localISOTime = `${
        new Date(timeToMs - tzOffsetMs).toISOString().split('.')[0]
    }.000000+${zone}:00`

    return localISOTime
}

/**
 * 计时器，分别对 setTimeout 和 setInterval 进行封装
 * 调用:
 * ------- 开始 ------
 * timer.setTimeout.start('RecordTimer1', recordStatus1,1000);
 * timer.setInterval.start('RecordTimer2', recordStatus2,1000);
 * ------- 停止 ------
 * timer.setTimeout.stop('RecordTimer1');
 * timer.setInterval.stop('RecordTimer2');
 *
 */
export const timer = {
    setTimeout: {
        start(_timerName, _func, _interval) {
            if (timer.setTimeout[_timerName]) {
                timer.setTimeout.stop(_timerName)
            }
            timer.setTimeout[_timerName] = window.setTimeout(
                _func,
                _interval || 1000,
            )
        },
        stop(_timerName) {
            window.clearTimeout(timer.setTimeout[_timerName])
            timer.setTimeout[_timerName] = null
        },
    },
    setInterval: {
        start(_timerName, _func, _interval) {
            if (timer.setInterval[_timerName]) {
                timer.setInterval.stop(_timerName)
            }
            timer.setInterval[_timerName] = window.setInterval(
                _func,
                _interval || 1000,
            )
        },
        stop(_timerName) {
            window.clearInterval(timer.setInterval[_timerName])
            timer.setInterval[_timerName] = null
        },
    },
}

//  -----------------------------  数组  --------------------------------
/**
 * 数组去重，并将数组中的空格去除
 * @param { Array } arr 原数组，未去重的数组
 * @returns { Array } 去重并去空格后的数组
 */
export const shallowUniqueArr = arr => {
    return arr.reduce(
        (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
        [],
    )
}

/**
 * 导出文件
 * @param res 导出文件请求响应数据，带 headers
 * @param {String} contentType 指定文件类型
 */
export const downloadFile = (res, contentType) => {
    // 设置默认文件类型为 xml
    if (!contentType) {
        contentType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }

    const disposition = res.headers['content-disposition']
    const fileName = decodeURI(disposition.substring(disposition.indexOf(
        'filename*=utf-8\'\'') +
        17, disposition.length))
    const blob = new Blob(
        [res.data], {
            type: contentType,
        }) // IE 10+
    const link = document.createElement('a')

    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href) // 释放内存
    link.remove()
}
