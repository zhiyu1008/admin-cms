const generateMenu = (menu) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children && menu[i].children.length <= 0) {
      delete menu[i].children
    }
    if (menu[i].children && menu[i].children.length > 0) {
      generateMenu(menu[i].children)
    }
  }
  return menu
}
export const filterMenuData = (menu) => {
  const menuList = generateMenu(menu)
  return menuList
}
