import request from '@/utils/request'
// 获取用户列表+查询接口
const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'GET',
    data
  })
}
// 新增用户接口
const addUser = (data) => {
  return request({
    url: '/user/add',
    method: 'POST',
    data
  })
}
// 获取加密密码
const getPassword = () => {
  return request({
    url: '/sys/setpwd',
    method: 'GET'
  })
}
// 删除用户接口
const delUser = (data) => {
  return request({
    url: '/user/del',
    method: 'POST',
    data
  })
}
// 获取编辑信息接口   /user/info/8
const getUser = (data) => {
  return request({
    url: '/user/userInfo/' + data,
    method: 'GET',
    data
  })
}
// 编辑用户接口
const editUser = (data) => {
  return request({
    url: '/user/update',
    method: 'PUT',
    data
  })
}
// 分配权限接口 /api/user/assign/24
const assignUser = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
export default {
  getUserList,
  addUser,
  getPassword,
  delUser,
  getUser,
  editUser,
  assignUser
}
