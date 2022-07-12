// 获取所有的非一级路由数据
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach(item => {
    if (item.children && item.children.length > 0) {
      result.push(...item.children)
    }
  })
  return result
}
// 获取所有一级数据
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}
// 检测空对象以及检测空数据,如果为空返回true
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
// 将所有的一级路由数据处理成菜单数据
export const generateMenus = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (isNull(item.meta) && isNull(item.children)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 获取三条数据的path路径
    const routePath = item.path
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (item.meta.title && item.meta.icon) {
        result.push(route)
      }
    }
    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  console.log(result)
  return result
}
