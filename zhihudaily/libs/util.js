import axios from 'axios'

const util = {
  textpath: 'http://127.0.0.1:8020/',
  imgpath: 'http://127.0.0.1:8021/img/'
}
// 今天
util.getTodayTime = function () {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取昨天
util.prevDay = function (timestamp = (new Date()).getTime()) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1
  const day = date.getDate() < 10
    ? '0' + date.getDate()
    : date.getDate()
  return year + '' + month + '' + day
}
// ajax 通用配置
util.ajax = axios.create({
  baseURL: util.textpath
})

// 添加响应拦截器
util.ajax.interceptors.response.use(res => {
  return res.data
})
export default util
