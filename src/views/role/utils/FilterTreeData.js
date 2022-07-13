export const filterTreeData = (menus) => {
  const result = []
  menus.forEach(item => {
    let obj = {
      id: item.id,
      title: item.label,
      children: [],
      expand: true
    }
    result.push(obj)

    if (item.children && item.children.length > 0) {
      obj.children.push(...filterTreeData(item.children))
    } else {
      delete obj.children
    }
  })

  return result
}
