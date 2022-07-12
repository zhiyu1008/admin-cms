<template>
  <el-menu
    active-text-color="#e6a23c"
    background-color="#222d32"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="#fff"
    unique-opened
    router
  >
    <SideBarMenuItem></SideBarMenuItem>
    <!-- <SideBarMenuItem
      v-for="(item, index) in menuList"
      :key="index"
      :menuList="item"
    ></SideBarMenuItem> -->
  </el-menu>
</template>
<script>
import { filterMenuData } from '../../utils/menu'
import SideBarMenuItem from './SideBarMenuItem'
import { filterRouters, generateMenus } from '@/utils/router'
export default {
  components: { SideBarMenuItem },
  data() {
    return {}
  },
  created() {},
  computed: {
    menuList() {
      return filterMenuData(
        generateMenus(filterRouters(this.$router.getRoutes()))
      )
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
