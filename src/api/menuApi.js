import request from '@/utils/request'
// 获取菜单列表+查询接口
const getMenuList = (data) => {
  return request({
    url: `/menu/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'GET',
    data
  })
}
// 新增菜单接口
const addMenu = (data) => {
  return request({
    url: '/menu/add',
    method: 'POST',
    data
  })
}
// 删除菜单接口   /menu/del?0=8
const delMenu = (data) => {
  return request({
    url: '/menu/del?0=' + data,
    method: 'POST',
    data
  })
}
// 获取编辑信息接口   /menu/info/8
const getMenu = (data) => {
  return request({
    url: '/menu/info/' + data,
    method: 'GET',
    data
  })
}
// 编辑菜单接口
const editMenu = (data) => {
  return request({
    url: '/menu/update',
    method: 'PUT',
    data
  })
}
export default {
  getMenuList,
  addMenu,
  delMenu,
  getMenu,
  editMenu
}
