<template>
  <el-menu
    active-text-color="#ffd043"
    background-color="#222d32"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="#fff"
    unique-opened
    router
  >
    <!-- <SideBarMenuItem
      v-for="(item, index) in menuList"
      :key="index"
      :menuList="item"
    ></SideBarMenuItem> -->
    <SideBarMenuItem
      v-for="(item, index) in menuList"
      :key="index"
      :item="item"
    ></SideBarMenuItem>
  </el-menu>
</template>
<script>
import { filterMenuData } from '../../utils/menu'
import SideBarMenuItem from './SideBarMenuItem'
import { filterRouters, generateMenus } from '@/utils/router'
export default {
  name: 'SideBarMenu',
  components: { SideBarMenuItem },
  data() {
    return {}
  },
  computed: {
    menuList() {
      const routes = filterRouters(this.$router.getRoutes())
      return filterMenuData(generateMenus(routes))
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
