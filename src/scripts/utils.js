/**
 *  @author xinhong@bolean 2019/03/25
 *  @desc 工具类函数
 */

/**
 * @method setStore
 * @desc 设置 localStorage
 * @param {String} name 存储的 localStorage 名称
 * @param {String|Array|Object} content 存储的 localStorage 值
 * @returns {undefined}
 */
export const setStore = (name, content) => {
  if (!name) return;

  // 使用 window.btoa 将 content 进行编码，注意：中文使用此方法转码会报错且出现乱码
  // content = window.btoa(JSON.stringify(content));
  window.localStorage.setItem(name, content);
};

/**
 * @method getStore
 * @desc 读取 localStorage
 * @param {String} name 读取的 localStorage 名称
 * @returns {String} 读取的 localStorage 值
 */
export const getStore = (name) => {
  if (!name) return;

  // 使用 atob 将获取到的 localStorage 进行解码，注意：中文使用此方法转码会报错且出现乱码
  if (window.localStorage.getItem(name)) {
    // return JSON.parse(window.atob(window.localStorage.getItem(name)));
    return window.localStorage.getItem(name);
  }
  return null;
};
/**
 * @method removeStore
 * @desc 删除 localStorage
 * @param {String} name 删除的 localStorage 名称
 * @returns {undefined}
 */
export const removeStore = (name) => {
  if (!name) return;

  window.localStorage.removeItem(name);
};

/**
 * @method clearStore
 * @desc 删除 所有的 localStorage
 * @returns {undefined}
 */
export const clearStore = () => {
  window.localStorage.clear();
};

/**
 * @method getFileExtension
 * @desc 获取文件扩展名
 * @param   {str}     filename 文件名
 * @returns {str}     文件的扩展名
 */
export const getFileExtension = filename => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);

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
    start(timerName, func, interval) {
      if (timer.setTimeout[timerName]) {
        timer.setTimeout.stop(timerName);
      }
      timer.setTimeout[timerName] = setTimeout(func, interval || 1000);
    },
    stop(timerName) {
      window.clearTimeout(timer.setTimeout[timerName]);
      timer.setTimeout[timerName] = null;
    },
  },
  setInterval: {
    start(timerName, func, interval) {
      if (timer.setInterval[timerName]) {
        timer.setInterval.stop(timerName);
      }
      timer.setInterval[timerName] = setInterval(func, interval || 1000);
    },
    stop(timerName) {
      window.clearInterval(timer.setInterval[timerName]);
      timer.setInterval[timerName] = null;
    },
  },
};

/**
 * 获取数据类型
 * @param {any}} obj
 * @return {String}  undefined|null|number|string|symbolfunction|object|array|date
 */
export const getDataType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
