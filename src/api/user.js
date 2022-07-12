import request from '@/utils/request'
// 登录接口
const login = (data) => {
  return request({
    url: '/login?username=' + data.username + '&password=' + data.password + '&code=' + data.code + '&token=' + data.token,
    method: 'POST',
    data
  })
}
// 获取验证码接口
const getCode = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
// 获取用户信息
const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
// 获取菜单数据
const getNav = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}
// 退出登录接口
const logout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}
export default {
  login,
  getCode,
  getUserInfo,
  getNav,
  logout
}
