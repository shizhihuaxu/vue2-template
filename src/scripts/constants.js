/**
 *  @author shixhihuaxu 2019/12/11
 *  @desc 定义常量
 */

const STATIC = {
  // api 接口
  API: {
    LOGIN: 'login/', //  登录 [POST]
    LOGOUT: 'logout/', //  退出 [POST]
  },
  // 错误提示代码
  TIP: {
    '0001': '请输入用户名',
  },
  // 正则
  REGEXP: {
    USERNAME: /^[a-zA-Z][a-zA-Z0-9]{1,15}$/,
    PASSWORD: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![`~\!@#\$%\^&\*\(\)\-_\=\+\[\]\{\}\\\|;:\'",./\?\<>]+$)[`~\!@#\$%\^&\*\(\)\-_\=\+\[\]\{\}\\\|;:\'",./\?\<>0-9A-Za-z]{8,16}$/,
  },
};

export default STATIC;
