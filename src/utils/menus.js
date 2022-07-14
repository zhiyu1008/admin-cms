export const filterMenus = (menus) => {
  const newMenus = []

  menus.forEach(item => {
    if (item.children && item.children.length <= 0) {
      return newMenus.push({
        title: item.label,
        path: item.path,
        icon: item.icon
      })
    }

    if (item.children && item.children.length > 0) {
      const data = item.children.filter((child, index) => {
        if (child.children && child.children.length > 0) {
          if (!child.children[index].name) {
            delete child.children[index].children
          }
          return child
        }
      })

      const children = filterMenus(data)
      newMenus.push({
        title: item.label,
        path: item.path,
        icon: item.icon,
        children: children
      })
    }
  })

  return newMenus
}
