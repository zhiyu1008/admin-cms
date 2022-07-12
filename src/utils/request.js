import axios from 'axios'
// 导入message消息提示组件
import {
  Message
} from 'element-ui'
import store from '../store'

// 导入自定义消息提示
import exceptionMessage from './exception-message'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 将token发送给后台
    const token = store.getters.token
    if (token) config.headers.token = token
    return config
  },
  (err) => {
    return Promise.reject(err)
  })
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res.data.data
    }
    _showErrorMessage(res.data.code, res.data.msg)
  },
  (err) => {
    return Promise.reject(err)
  })
// 统一为data传参
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}
// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  Message({
    message,
    type: 'error'
  })
}
export default request
