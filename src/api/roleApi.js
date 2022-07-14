import request from '@/utils/request'
// 获取角色列表+查询接口
const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
// 新增角色接口
const addRole = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}
// 删除角色接口   /role/del?0=8
const delRole = (data) => {
  return request({
    url: '/role/del',
    method: 'POST',
    data
  })
}
// 获取编辑信息接口   /role/info/8
const getRole = (data) => {
  return request({
    url: '/role/info/' + data,
    method: 'GET',
    data
  })
}
// 编辑角色接口
const editRole = (data) => {
  return request({
    url: '/role/update',
    method: 'PUT',
    data
  })
}
// 分配权限接口 /role/perm/7
const assignRole = (id, data) => {
  return request({
    url: `/role/perm/${id}`,
    method: 'POST',
    data
  })
}
export default {
  getRoleList,
  addRole,
  delRole,
  getRole,
  editRole,
  assignRole
}
