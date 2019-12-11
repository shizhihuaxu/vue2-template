/**
 * 时间格式转换
 * @param time: 未转换时间字符串，例如'2018-01-18T15:12:51.234520+08:00'
 * @return str: 已时间字符串，例如'2018-01-18'
 */
const formatTime = (time) => {
  let year = '';
  let month = '';
  let day = '';
  const date = new Date(time);

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

export default {
  formatTime,
};
